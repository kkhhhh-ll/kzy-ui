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
export let activeEffect;
export function effect(fn, options) {
  const _effect = new ReactiveEffect(fn, () => {
    _effect.run();
  });
  _effect.run();
  return _effect;
}
class ReactiveEffect {
  public active = true;
  constructor(public fn, public sce) {}
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
      return this.fn();
    } finally {
      activeEffect = lastEffect;
    }
  }
}


```
