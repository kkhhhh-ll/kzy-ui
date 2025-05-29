---
title: Alert | K-Element
description: Alert 组件的文档
---

# Alert 提示

用于页面中展示重要的提示信息。

## 基础用法

Alert 组件不属于浮层元素，不会自动消失或关闭。

Alert 组件提供 4 种类型，由 `type` 属性指定，默认值为`primary`。

<preview path="../demo/Alert/Basic.vue" title="基础用法" description="Alert 提示的基础用法"></preview>

## 主题

Alert 组件提供了两个不同的主题：`light `和 `dark`。

通过设置 `effect` 属性来改变主题，默认为 `light`。

<preview path="../demo/Alert/Effect.vue" title="主题" description="Alert 提示的主题"></preview>

## 关闭按钮显示

你可以使用 `showIcon` 属性来控制关闭按钮的显示。

<preview path="../demo/Alert/ShowIcon.vue" title="关闭按钮显示" description="Alert 提示的关闭按钮显示"></preview>

## Alert API

# Alert Attributes

| 属性名    | 说明             | 类型                                         | 默认值    |
| :-------- | :--------------- | :------------------------------------------- | :-------- |
| type      | 按钮类型         | enum: 'primary','warning','danger','success' | 'primary' |
| show-icon | 是否显示类型图标 | boolean                                      | false     |
| effect    | 主题样式         | enum: 'light','dark'                         | 'light'   |
| content   | 内容             | string                                       | ''        |

# Alert Slots

| 插槽名  | 说明           |
| :------ | :------------- |
| content | 自定义默认内容 |
| icon    | 自定义图标组件 |

# Alert Events

| 事件名 | 说明                    | 类型     |
| :----- | :---------------------- | :------- |
| close  | 关闭 Alert 时触发的事件 | Function |
