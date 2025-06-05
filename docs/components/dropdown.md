---
title: Dropdown | K-Element
description: Dropdown 组件的文档
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

悬停在下拉菜单上以展开更多操作。

<preview path="../demo/Dropdown/Basic.vue" title="基础用法" description="Dropdown 下拉菜单的基础用法"></preview>

## 禁用状态

你可以使用 `disabled` 属性禁用下拉菜单的操作。

<preview path="../demo/Dropdown/Disabled.vue" title="禁用状态" description="Dropdown 下拉菜单的禁用状态"></preview>

## Dropdown API

# Dropdown Attributes

| 属性名      | 说明               | 类型    | 默认值   |
| :---------- | :----------------- | :------ | :------- |
| menuOptions | 下拉菜单列表       | array   | []       |
| placement   | 文字提示出现的位置 | enum    | 'bottom' |
| disabled    | 禁用状态           | boolean | false    |

# Dropdown Events

| 事件名 | 说明                 | 类型     |
| :----- | :------------------- | :------- |
| select | 获取下拉列表选中信息 | Function |
