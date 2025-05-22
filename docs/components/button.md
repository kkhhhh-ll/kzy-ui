---
title: Kbutton | K-Element
description: Kbutton 组件的文档
---

# Button 按钮

常用的按钮操作。

## 基础用法

使用 `type`、`plain`和`round` 来定义按钮的样式。

<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 Boolean 类型的值。

<preview path="../demo/Button/Disabled.vue" title="禁用状态" description="Button 组件的禁用状态"></preview>

## Button API

# Button Attributes

| 属性名   | 说明           | 类型                                                          | 默认值    |
| :------- | :------------- | :------------------------------------------------------------ | :-------- |
| type     | 按钮类型       | enum: 'default','primary','warning','info','danger','success' | 'default' |
| plain    | 是否为朴素按钮 | boolean                                                       | false     |
| round    | 是否为圆角按钮 | boolean                                                       | false     |
| disabled | 按钮禁用状态   | boolean                                                       | false     |
| loading  | 是否为加载状态 | boolean                                                       | false     |

# Button Slots

| 插槽名  | 说明           |
| :------ | :------------- |
| default | 自定义默认内容 |
| icon    | 自定义图标组件 |
