<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
let index: number = 0;
const loadMore = (num: number) => {
  for (let i = 0; i < num; i++) {
    index++;
    const p = document.createElement("p");
    p.innerText = `加载的第${index}条数据`;
    const loadList = document.querySelector(".load-list");
    if (loadList) {
      loadList.appendChild(p);
    }
  }
};

const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadMore(5); // 当元素进入视口时，加载更多数据
      // 重新观察loadMore元素，确保可以继续触发
      setTimeout(() => {
        const loadMoreElement = document.querySelector(".loadMore");
        if (loadMoreElement) {
          obsever.observe(loadMoreElement);
        }
      }, 0);
      obsever.unobserve(entry.target); // 停止观察该元素
    }
  });
};
const obsever = new IntersectionObserver(callback, {
  root: document.querySelector(".container"), // 设置观察的根元素为.container
});

onMounted(() => {
  loadMore(5);
  const loadMoreElement = document.querySelector(".loadMore");
  obsever.observe(loadMoreElement!); // 观察加载更多元素
});

onUnmounted(() => {
  obsever.disconnect(); // 在组件卸载时，断开观察器
  //   const loadList = document.querySelector(".load-list");
  //   loadList!.innerHTML = ""; // 清空加载列表
});
</script>

<template>
  <div class="container">
    <div class="load-list"></div>
    <div class="loadMore"></div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 200px;
  width: 100%;
  overflow-y: scroll;
  text-align: center;
}
</style>
