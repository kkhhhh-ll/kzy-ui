## 什么是插槽？

slot是接受父组件传来的插槽内容，生成VNode并返回的函数。<br>
`<slot>`编译后就是_renderSlot函数，接受slots、name、props、插槽默认渲染函数

## 组件渲染的原理

组件的核心就是其渲染函数，组件挂载的本质就是调用渲染函数，获取VNode。

## 插槽初始化原理

Vue3在渲染VNode时，若VNode类型是组件，就会去走组件渲染的流程，组件渲染的流程就是创建组件实例，初始化组件实例时，会进行插槽的初始化。

## 如何确定组件存在插槽

组件VNode的children属性类型是对象

```
// renderSlots的简化
export function renderSlots(slots, name, props) {
  const slot = slots[name]
  if (slot) {
    if (typeof slot === 'function') {
      return createVNode(Fragment, {}, slot(props))
    }
  }
}
```

可见，具名插槽是通过renderSlots渲染函数的第二参数去定位要渲染的父组件提供的插槽内容。父组件的插槽内容编译之后变成了一个Object的数据类型。<br>
插槽编译大致长这样：

```
{
    header: _withCtx(() => [
      _createElementVNode("h1", null, "header")
    ]),
    default: _withCtx(() => [
      _createElementVNode("p", null, "default")
    ]),
    footer: _withCtx(() => [
      _createElementVNode("p", null, "footer")
    ]),
    _: 1 /* STABLE */
}
```
