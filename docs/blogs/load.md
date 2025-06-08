# IntersectionObserver

是一种可以异步监听目标元素与其祖先或视窗(viewport)交叉状态的手段

# 懒加载

懒加载，就是延迟加载，按需加载，需要用到对象时再去加载，是一种比较好的网页性能优化方案。

# Intersection Observer 懒加载实现原理：

## 1. 设置 data 属性:

将图片的实际 URL 存储在元素的 data 属性中(例如: `data-src`)。

## 2. 监听元素进入视口:

创建一个 `IntersectionObserver 实例`，监听元素是否进入视口。

## 3. 触发加载:

当元素进入视口时，从 `data 属性`中获取图片的 `URL`，并将其赋值给元素的 `src` 属性，从而触发图片加载。

# 图片懒加载

<preview path="../demo/Load/img.vue" description="Intersection Observer 懒加载"></preview>

# 列表无限滚动

<preview path="../demo/Load/list.vue" description="Intersection Observer 列表无限滚动"></preview>
