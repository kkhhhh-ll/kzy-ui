---
title: Tooltip | K-Element
description: Tooltip 组件的文档
---

# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： `placement`属性值为：[方向]-[对齐位置]；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。 如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

<preview path="../demo/Tooltip/Basic.vue" title="基础用法" description="Tooltip 文字提示的基础用法"></preview>

## 触发方式

通过 `trigger` 属性来设置 Tooltip 显示方式。

<preview path="../demo/Tooltip/Trigger.vue" title="触发方式" description="Tooltip 文字提示的触发方式"></preview>

## Tooltip API

# Tooltip Attributes

| 属性名    | 说明               | 类型                  | 默认值   |
| :-------- | :----------------- | :-------------------- | :------- |
| content   | 显示的内容         | string                | ''       |
| placement | 文字提示出现的位置 | enum                  | 'bottom' |
| trigger   | 触发方式           | enum: 'hover','click' | 'hover'  |

# Tooltip Slots

| 插槽名  | 说明                      |
| :------ | :------------------------ |
| content | 自定义内容                |
| default | Tooltip 触发 & 引用的元素 |
