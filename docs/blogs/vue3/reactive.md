## 核心

一、reactive<br>
1、reactive 的结果是一个代理对象。<br>
2、采用 proxy+reflect 实现数据响应式。在 getter 中监听对象中的某个属性被访问，track 收集其对应的 effect 函数，在 setter 中 trigger 触发属性值发生变化后的更新函数。<br>优势：<br>
（1）proxy 可对整个对象做拦截，无需像 vue2 采用 Object.defineProperty 遍历循环对象中的每个属性去定义其 getter 和 setter。<br>
（2）reflect 可保证 this 指向 proxy 对象；防止使用 handler 获取 key 时出现死循环；函数化行为使用对象内部属性。<br>
3、涉及性能优化：<br>
（1）map 存储 target 对象，只代理一次；<br>
（2）已经被代理的对象（拥有自己的 getter 和 setter）不会再次代理；<br>
（3）reflect 可获取属性值，若属性值为对象，可进行深度代理；<br>
（4）属性值发生变化时，可与老值做对比，判断是否需要更新。<br>

二、effect<br>
1、当前运行的 effect 是一个全局变量。<br>
2、存储了变量值发生变化时，需要重新执行的更新函数<br>

三、track<br>
记录属性和 effect 两者之间的关系<br>
一个属性对应多个 effect，一个 effect 对应多个属性<br>
1、map 存储 target 对象<br>

```
{
  obj1,
  obj2
}
```

2、obj1 存储触发响应式的属性<br>

```
{
  obj1: {
    key1: {},
    key2: {},
  },
};
```

3、key1,key2 存储对应的 effect 更新函数<br>

```
{
  obj1: {
    key1: {
      effect1,
      effect2,
    },
    key2: {
      effect1,
      effect2,
    },
  },
};
```

四、trackEffect
存储该 effect 对应的属性

## reactive

reactive：使数据变为响应式数据。代表数据。<br>

```
// reactive
// 性能优化--保证每个对象只代理一次
const reactiveMap = new Map();
enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}
// 判断obj是否为对象
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}
function reactive(target) {
  return createReactive(target);
}
const mutableHandles = {
  // 对象，键值，代理对象
  get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }
    // 收集这个对象中这个属性对应的所有的effect函数
    track(target, key);
    // 使用reflect保证this指向代理对象
    let res = Reflect.get(target, key);
    res = isObject(res) ? reactive(res) : res;
    return res;
  },
  set(target, key, value, receiver) {
    let oldValue = target[key];
    let result = Reflect.set(target, key, value);
    if (oldValue !== value) {
      // 性能优化
      trigger(target, key, value, oldValue);
    }
    return result;
  },
};
function createReactive(target) {
  if (!isObject(target)) return target;
  // 对象本身已经被代理，拥有自己的getter和setter
  if (target[ReactiveFlags.IS_REACTIVE]) return target;
  const exsitMap = reactiveMap.get(target);
  if (exsitMap) return exsitMap;
  const proxy = new Proxy(target, mutableHandles);
  reactiveMap.set(target, proxy);
  return proxy;
}
```

## effect

effct：副作用函数，数据更新时，effect 重新执行。代表视图

```
// 当前运行的effect
let activeEffect;
function effect(fn, options) {
  const _effect = new ReactiveEffect(fn, () => {
    _effect.run();
  });
  _effect.run();
  if (options) {
    // 可在effect函数中自定义调度函数
    Object.assign(_effect, options);
  }
  // effect函数执行完成后可获取刚刚建立的_effect对象中的run函数
  // 使用：options中传递sceduler函数，在依赖收集前可以运行自己的逻辑（AOP）
  // const runner = effect(()=>state.age++,()=> {
  //  console.log('自己想做的事儿')
  //  runner()
  // })
  let runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}
function cleanDepEffect(dep, effect) {
  dep.delete(effect);
  if (dep.size === 0) {
    // 属性没有对应的依赖收集函数，从map中删除该属性
    dep.cleanup();
  }
}
const preCleanUpEffect = (effect) => {
  // 做diff算法使用
  effect._depsLength = 0;
  // 同一个effect执行，只收集一个
  effect._trackId++;
};
const postCleanEffect = (effect) => {
  // 以前收集的属性比较多
  if (effect.deps.length > effect._depsLength) {
    for (let i = effect._depsLength; i < effect.deps.length; i++) {
      cleanDepEffect(effect.deps[i], effect);
    }
    effect.deps.length = effect._depsLength;
  }
};
class ReactiveEffect {
  // 默认是响应式的，套路
  public active = true;
  // 记录执行次数
  static _trackId = 0;
  static _depsLength = 0;
  static deps = [];
  // effect中的函数正在执行
  static _runnings = 0;
  // fn为effct中包裹的函数，scheduler是执行effect包裹函数的函数
  constructor(public fn, public scheduler) {}
  run() {
    if (!this.active) {
      return this.fn();
    }
    // 嵌套使用effect时，保证使用的effect是正确的
    let lastEffect = activeEffect;
    // 套路可以一学
    try {
      // 当前触发对象的effect赋值给activeEffect
      activeEffect = this;
      preCleanUpEffect(this);
      this._runnings++;
      return this.fn();
    } finally {
      this._runnings--;
      postCleanEffect(this);
      activeEffect = lastEffect;
    }
  }
}

```

## track

依赖收集函数，收集响应式对象中某个属性对应的所有的 effect 函数

```
{
  obj: {
    key1: {
      effect1, effect2;
    }
  }
}

// 双向记忆
function trackEffect(effect, dep) {
  // 保证属性只被收集一次（state.age, state.age,state.age）
  if (dep.get(effect) !== effect._trackId) {
    dep.set(effect, effect._trackId);
    // 对收集的属性做diff算法
    let oldDep = effect.deps[effect._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanDepEffect(oldDep, effect);
      }
      effect.deps[effect._depsLength++] = dep;
    } else {
      effect._depsLength++;
    }
  }
}
let targetMap = new WeakMap();
const createDep = (cleanup, key) => {
  const dep = new Map();
  // 属性清理函数： () => depsMap.delete(key)
  dep.cleanup = cleanup;
  dep.name = key;
  // 返回创建的dep
  return dep;
};
function track(target, key) {
  if (!activeEffect) {
    return;
  }
  // 先看有无存储此响应式对象
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  // 再看是否有该属性
  // dep：属性对应的effect函数
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = createDep(() => depsMap.delete(key), key)));
  }
  // 将当前的effect存放于dep中，后续可根据值的变化触发dep中的effect函数
  trackEffect(activeEffect, dep);
}
```

## trigger

触发更新函数

```
function triggerEffects(dep) {
  for (const effect of dep.keys()) {
    if (effect.scheduler) {
      // effect没有在执行，重新触发更新函数
      if (effect._runnings === 0) {
        effect.scheduler();
      }
    }
  }
}

function trigger(target, key, value, oldValue) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const dep = depsMap.get(key);
  if (!dep) {
    return;
  }
  triggerEffects(dep);
}
```
