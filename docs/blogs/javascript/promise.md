## promise

```
class myPromise {
    constructor(executor) {
        // 初始化值
        this.initValue();
        // 初始化this指向
        this.initBind();
        // Promise中的throw，相当于执行了reject。需要使用try catch
        try {
            executor(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    initValue() {
        this.result = null;
        this.state = 'pending';
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
    }

    initBind() {
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
    }

    resolve(value) {
        // 状态不可变
        if (this.state !== 'pending') return;
        this.state = 'fulfilled';
        this.result = value;
        while (this.onFulfilledCallbacks.length) {
            this.onFulfilledCallbacks.shift()(this.result);
        }
    }

    reject(reason) {
        // 状态不可变
        if (this.state !== 'pending') return;
        this.state = 'rejected';
        this.result = reason;
        while (this.onRejectedCallbacks.length) {
            this.onRejectedCallbacks.shift()(this.result);
        }
    }

    // 链式调用，下次then调用受上一次then的返回结果影响
    // then 方法的参数为两个函数，分别为 Promise 对象的状态被扭转为 fulfilled 和 rejected 对应的回调函数
    then(onFulfilled, onRejected) {
        // 参数标准化
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
        // 兼容性处理
        const queueMicrotask = typeof queueMicrotask === 'function'  ? queueMicrotask  : callback => Promise.resolve().then(callback);
        // 创建新的 Promise
        const thenPromise = new myPromise((resolve, reject) => {
            // 统一的回调处理函数
            // 执行onFulfilled和onRejected
            const handleCallback = (cb) => {
                // 使用微任务
                queueMicrotask(() => {
                    try {
                        const x = cb(this.result);
                        // 解析返回值
                        // resolve, reject更新thenPromise的状态以及返回值
                        this.resolvePromise(thenPromise, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            };

            // 根据当前状态执行不同的逻辑
            if (this.state === 'fulfilled') {
                handleCallback(onFulfilled);
            } else if (this.state === 'rejected') {
                handleCallback(onRejected);
            } else if (this.state === 'pending') {
                // 如果状态为待定状态，暂时保存两个回调
                this.onFulfilledCallbacks.push(() => handleCallback(onFulfilled));
                this.onRejectedCallbacks.push(() => handleCallback(onRejected));
            }
        });

        return thenPromise;
    }

    // 解析 Promise 的返回值
    resolvePromise(promise, x, resolve, reject) {
        // 1. 防止循环引用
        if (x === promise) {
            return reject(new TypeError('循环引用'));
        }

        // 2. 如果 x 是 Promise 实例
        if (x instanceof myPromise) {
            x.then(
                y => this.resolvePromise(promise, y, resolve, reject),
                reject
            );
            return;
        }
        // thenable对象，任何定义了 then 方法的对象或函数
        // 3. 如果 x 是对象或函数（可能是 thenable）
        if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            // 确保只调用一次
            // thenable 对象的 then 方法可能不遵守 Promise 规范，多次调用回调
            let called = false;
            try {
                const then = x.then;
                if (typeof then === 'function') {
                    // 处理 thenable 对象
                    then.call(
                        x,
                        y => {
                            if (called) return;
                            called = true;
                            this.resolvePromise(promise, y, resolve, reject);
                        },
                        r => {
                            if (called) return;
                            called = true;
                            reject(r);
                        }
                    );
                } else {
                    // 普通对象
                    resolve(x);
                }
            } catch (error) {
                if (called) return;
                called = true;
                reject(error);
            }
            return;
        }

        // 4. 普通值
        resolve(x);
    }
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    finally(callback) {
        return this.then(
            value => myPromise.resolve(callback()).then(() => value),
            reason => myPromise.resolve(callback()).then(() => { throw reason; })
        );
    }
}
myPromise.resolve = function(value) {
    // 1. 如果已经是 myPromise 实例，直接返回（幂等性）
    if (value instanceof myPromise) {
        return value;
    }
    
    // 2. 创建新 Promise
    return new myPromise((resolve, reject) => {
        // 3. 检查是否是 thenable
        if (value && typeof value.then === 'function') {
            // 跟随 thenable
            value.then(resolve, reject);
        } else {
            // 普通值，直接解决
            resolve(value);
        }
    });
}
```
