// 手写题目：实现 Function.prototype.myCall 方法
Function.prototype.myCall = function (context = window, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Type Error')
    }
    const fnSymbol = Symbol('fn')
    // this 就是调用 myCall 的函数
    context[fnSymbol] = this
    const result = context[fnSymbol](...args)
    delete context[fnSymbol]
    return result
}
// 手写题目：实现 Function.prototype.myApply 方法
Function.prototype.myApply = function (context = window, args) {
    if (typeof this !== 'function') {
        throw new TypeError('Type Error')
    }
    const fnSymbol = Symbol('fn')
    context[fnSymbol] = this
    const result = context[fnSymbol](...args)
    delete context[fnSymbol]
    return result
}
// 手写题目：实现 Function.prototype.myBind 方法
Function.prototype.myBind = function (context = window, ...args1) {
    if (typeof this !== 'function') {
        throw new TypeError('Type Error')
    }
    const fn = this
    return function F(...args2) {
        // new 调用, this 指向实例
        if (this instanceof F) {
            return new fn(...args1, ...args2)
        }
        return fn.apply(context, [...args1, ...args2])
    }
}
// 手写题目：实现 new 操作符
function myNew(Constructor, ...args) {
    if (typeof Constructor !== 'function') {
        throw new TypeError('Type Error')
    }
    // 创建一个新对象，继承构造函数的原型
    const obj = Object.create(Constructor.prototype)
    // 使用构造函数绑定新对象并传入参数,改变 this 指向
    const result = Constructor.apply(obj, args)
    // 如果构造函数返回一个对象，则返回该对象，否则返回新创建的对象
    return result instanceof Object ? result : obj
}
// 手写题目：实现 instanceof 操作符
function myInstanceof(left, right) {
    if (typeof left !== 'object' || left === null) {
        return false
    }
    while (left !== null) {
        if (left === right.prototype) {
            return true
        }
        left = Object.getPrototypeOf(left)
    }
    return false
}
// 手写题目：实现一个简单的深拷贝函数
function deepClone(source, hash = new WeakMap()) {
    if (source === null || typeof source !== 'object') {
        return source
    }
    if (hash.has(source)) {
        return hash.get(source)
    }
    const cloneObj = Array.isArray(source) ? [] : {}
    hash.set(source, cloneObj)
    // for...in 会遍历对象的可枚举属性，包括继承自原型链的属性
    for (const key in source) {
        // 判断是否为 source 自有属性
        if (source.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(source[key], hash)
        } else {
            // 原型链上的属性直接赋值
            cloneObj[key] = source[key]
        }
    }
    return cloneObj
}
// 手写题目：实现一个简单的节流函数
function throttle(fn, delay) {
    let lastTime = 0
    return function (...args) {
        const now = Date.now()
        if (now - lastTime >= delay) {
            fn.apply(this, args)
            lastTime = now
        }
    }
}
// 手写题目：实现一个简单的防抖函数
function debounce(fn, delay) {
    let timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
// 手写题目：实现一个简单的事件总线
class EventBus {
    constructor() {
        this.events = {}
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(callback)
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(...args))
        }
    }

    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback)
        }
    }
}
// 手写题目：实现一个简单的发布-订阅模式
class PubSub {
    constructor() {
        this.events = {}
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(callback)
    }

    publish(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(...args))
        }
    }

    unsubscribe(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback)
        }
    }
}
// 手写题目：实现一个简单的冒泡排序算法
function bubbleSort(arr) {
    const len = arr.length
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
// 手写题目：实现一个简单的快速排序算法
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }
    const pivot = arr[Math.floor(arr.length / 2)]
    const left = []
    const right = []
    const equal = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else if (arr[i] > pivot) {
            right.push(arr[i])
        } else {
            equal.push(arr[i])
        }
    }
    return [...quickSort(left), ...equal, ...quickSort(right)]
}
// 手写题目：实现一个简单的深度优先遍历算法
function dfs(node, visited = new Set()) {
    if (!node || visited.has(node)) {
        return
    }
    visited.add(node)
    console.log(node.value)
    if (node.left) {
        dfs(node.left, visited)
    }
    if (node.right) {
        dfs(node.right, visited)
    }
}
// 手写题目：实现一个简单的广度优先遍历算法
function bfs(root) {
    if (!root) {
        return
    }
    const queue = [root]
    while (queue.length > 0) {
        const node = queue.shift()
        console.log(node.value)
        if (node.left) {
            queue.push(node.left)
        }
        if (node.right) {
            queue.push(node.right)
        }
    }
}
// 手写题目：实现一个函数柯里化
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return function (...nextArgs) {
                return curried.apply(this, args.concat(nextArgs))
            }
        }
    }
}
// 手写题目：实现一个sleep函数
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
// 手写题目：实现一个简单的Promise.all函数
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve([])
        } else {
            const results = []
            let count = 0
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then(value => {
                    results[i] = value
                    count++
                    if (count === promises.length) {
                        resolve(results)
                    }
                }, reason => {
                    reject(reason)
                })
            }
        }
    })
}