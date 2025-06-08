<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
/* IntersectionObserverEntry提供属性：
    boundingClientRect目标元素的矩形信息
    intersectionRatio相交区域和目标元素的比例值   intersectionRect/boundingClientRect 不可见时小于等于0
    intersectionRect目标元素和视窗（根）相交的矩形信息 可以称为相交区域
    isIntersecting目标元素当前是否可见 Boolean值 可见为true
    rootBounds根元素的矩形信息，没有指定根元素就是当前视窗的矩形信息
    target观察的目标元素
    time返回一个记录从IntersectionObserver的时间到交叉被触发的时间的时间戳 
*/
const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    // 当元素进入视口时，加载图片
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;
      img.src = img.dataset.src || "";
      // 停止观察该图片元素
      observer.unobserve(img);
    }
  });
};
// 创建一个 IntersectionObserver 实例
// 该实例会在元素进入或离开视口时触发回调函数callback
const observer = new IntersectionObserver(callback);
onMounted(() => {
  const imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    // 观察每个图片元素
    observer.observe(img);
  });
});
onUnmounted(() => {
  // 在组件卸载时，断开观察器
  observer.disconnect();
});
</script>

<template>
  <!-- 因设置base，引用图片时，此处需要作处理 -->
  <img data-src="/kzy-ui/fenweigan.jpg" />
</template>
