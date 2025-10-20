## vue3应用实例组成

vue3应用实例通过createApp()函数创建

```
function createApp(rootComponent:Component,rootProps?: Object):App
```

第一个参数是根组件，第二个参数可选，指要传递给根组件的props

### mount

vue3应用实例挂载的容器元素

```
interface App {
    mount(rootContainer: Element|string):ComponentPublicInstance
}

```

### unmount

卸载一个已挂载的应用实例，会触发该应用组件树内所有组件的卸载生命周期函数

### version

vue的版本信息

### config属性

vue应用配置信息

### component

组件函数，同时传递一个字符串及其组件定义，则会注册一个全局组件，若只有一个字符串，会返回该组件。

### use

安装一个插件。第一个参数应是插件本身，可选的第二个参数是要传递给插件的选项。若 app.use() 对同一个插件多次调用，该插件只会被安装一次。

### directive

指令函数，与组件函数类似。

### mixin

应用一个全局 mixin (适用于该应用的范围)。一个全局的 mixin 会作用于应用中的每个组件实例。 兼容用的，项目不推荐使用。

### provide

传递一个应用实例全局可用的值，inject接收。

### runWithContext

使用当前应用作为注入上下文执行回调函数，不推荐使用。

## vue3组件实例组成

在组合式api中，通过getCurrentInstance获取

```
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
```

### uid

```
uid: number // 组件实例唯一id
console.log(instance.uid)
```

### type

```
type: Component // 组件的定义对象

interface Component {
    // 组件选项，template,props,methods,data,setup
    template?: string;
    props?: PropsOptions;
    setup?: (props, context) => any;
    data?: () => Data;
    methods?: { [key: string]: Function };
}
```

### vnode

```
vnode:VNode //组件自身的虚拟节点

interface VNode {
    type: VNodeTypes;
    props: VNodeProps | null;
    children: VNodeChildren;
  // 其他属性
}

```

### parent

父组件的实例

```
parent: ComponentInternalInstance | null; // 父组件实例
if (instance.parent) {
  console.log('父组件的 uid:', instance.parent.uid);
} else {
  console.log('这是根组件');
}
```

### appContext

应用上下文,通过 appContext 可以在任何组件中访问应用级别的资源

```
appContext: AppContext; // 应用上下文
interface AppContext {
  app: App; // 应用实例
  config: AppConfig; // 应用配置
  mixins: ComponentOptions[]; // 混入
  components: Record<string, Component>; // 全局组件
  directives: Record<string, Directive>; // 全局指令
  provides: Record<string | symbol, any>; // 依赖注入

  // 运行时相关
  effects: [],                 // 副作用
  scope: {},                   // 作用域
  reload: () => {},            // 重载函数
  globalProperties: {}         // 全局属性
}
```

### root

```
root: ComponentInternalInstance; // 根组件实例
```

### proxy

proxy 是组件的公开实例，模板中的 this 和 setup 中的 this 都指向 proxy。

### props

组件接收的所有 props，是响应式的。

### attrs

传递给组件但未在 props 中声明的属性。

### slots

### emit

### setupState

setup 函数返回的对象，包含组件的状态和方法。

### isMounted

### inUnmounted

### render

### data

组件中定义的响应式数据（如果使用了 data 选项）。

### ctx

ctx 包含了模板中可用的属性和方法，包括 props、setupState、data、methods 等，兼容vue2 optionsAPI出现的
