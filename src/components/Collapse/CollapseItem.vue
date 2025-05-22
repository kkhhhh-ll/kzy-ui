<template>
  <div
    class="k-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="k-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      @click="clickHandler"
    >
      <slot name="header">{{ title }}</slot>
      <Icon icon="angle-right" class="k-collapse-item__icon"></Icon>
    </div>
    <Transition name="k" v-on="collapseEvents">
      <!-- padding在动画运行时已存在，将动画设置在父节点上 -->
      <div class="k-collapse-item__wrapper" v-show="isActive">
        <div class="k-collapse-item__content" :id="`item-content-${name}`">
          <slot name="content"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { defineOptions, defineProps, inject, computed } from "vue";
import type { CollapseItemProps } from "./types";
import Icon from "../Icon/Icon.vue";
import { CollapseContextKey } from "./types";
defineOptions({
  name: "KCollapseItem",
});
const props = defineProps<CollapseItemProps>();
// 子组件使用provide/inject获取父组件提供的activeNames和handleClick方法
const CollapseContext = inject(CollapseContextKey);
const handleClick = CollapseContext?.handleClick;
const activeNames = CollapseContext?.activeNames;
const isActive = computed(() => {
  return activeNames?.value.includes(props.name);
});
const clickHandler = () => {
  if (props.disabled) return;
  handleClick?.(props.name);
};
const collapseEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter: (el) => {
    el.style.height = "0";
    el.style.overflow = "hidden";
  },
  enter: (el) => {
    // scrollHeight：表示元素的内容高度，包括由于滚动而不可见的部分。即使没有滚动条，scrollHeight 也会包含所有内容的高度
    el.style.height = `${el.scrollHeight}px`;
  },
  afterEnter: (el) => {
    el.style.height = "";
    el.style.overflow = "";
  },
  beforeLeave: (el) => {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = "hidden";
  },
  leave: (el) => {
    el.style.height = `0`;
  },
  afterLeave: (el) => {
    el.style.height = "";
    el.style.overflow = "";
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
