---
title: Collapse | K-Element
description: Collapse 组件的文档
---

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

<preview path="../demo/Collapse/Basic.vue" title="基础用法" description="Collapse 折叠面板的基础用法"></preview>

## 手风琴效果

每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示。

<preview path="../demo/Collapse/According.vue" title="手风琴效果" description="Collapse 折叠面板的手风琴效果"></preview>

## 禁用状态

你可以使用 `disabled` 属性禁用面板的折叠。

<preview path="../demo/Collapse/Disabled.vue" title="禁用状态" description="Collapse 折叠面板的禁用状态"></preview>

## Collapse API

# Collapse Attributes

| 属性名              | 说明                                                              | 类型    | 默认值 |
| :------------------ | :---------------------------------------------------------------- | :------ | :----- |
| model-value/v-model | 当前活动面板，在手风琴模式下其类型是 string，在其他模式下是 array | string  | []     |
| according           | 是否手风琴模式                                                    | boolean | false  |

# Collapse Events

| 事件名 | 说明                                                                  | 类型     |
| :----- | :-------------------------------------------------------------------- | :------- |
| change | 切换当前活动面板，在手风琴模式下其类型是 string，在其他模式下是 array | Function |

## Collapse Item API

| 属性名   | 说明       | 类型            | 默认值 |
| :------- | :--------- | :-------------- | :----- |
| name     | 唯一标志符 | string / number | -      |
| title    | 标题       | string          | ''     |
| disabled | 是否禁用   | boolean         | false  |
