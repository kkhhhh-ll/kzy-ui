<template>
  <Transition name="k" v-on="alertEvents">
    <div
      class="k-alert"
      v-if="alertShow"
      :class="{
        [`k-alert--${type}`]: type,
        'is-dark': effect === 'dark',
      }"
    >
      <div class="k-alert-content">
        <slot name="content">{{ content }} </slot>
      </div>
      <div class="k-alert-icon" v-if="showIcon" @click="close">
        <slot name="icon">
          <Icon icon="xmark" />
        </slot>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import {
  defineProps,
  defineOptions,
  withDefaults,
  ref,
  defineExpose,
} from "vue";
defineOptions({ name: "KAlert" });
import type { AlertProps } from "./types";
import Icon from "../Icon/index";
withDefaults(defineProps<AlertProps>(), {
  type: "primary",
  showIcon: true,
  effect: "light",
});
const alertShow = ref(true);
const alertEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter: (el) => {
    alertShow.value = true;
  },
  enter: (el) => {
    alertShow.value = true;
  },
  afterEnter: (el) => {
    alertShow.value = true;
  },
  beforeLeave: (el) => {
    alertShow.value = false;
  },
  leave: (el) => {
    alertShow.value = false;
  },
  afterLeave: (el) => {
    alertShow.value = false;
  },
};
const close = () => {
  alertShow.value = false;
};
defineExpose({
  close,
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
