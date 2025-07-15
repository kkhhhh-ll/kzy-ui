<template>
  <div
    class="k-message"
    role="alert"
    ref="messageRef"
    v-show="visible"
    :class="{
      [`k-message--${type}`]: type,
      'is-close': showClose,
    }"
    :style="cssStyle"
  >
    <div class="k-message__content">
      <slot>
        {{ `${lastOffset}-${topOffset}-${bottomOffset}` }}
        <RenderContent :vNode="message" v-if="message" />
      </slot>
    </div>
    <div class="k-message__close" v-if="showClose">
      <slot name="icon">
        <Icon @click.stop="visible = false" icon="xmark" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  withDefaults,
  ref,
  onMounted,
  nextTick,
  defineExpose,
  computed,
  watch,
} from "vue";
import RenderContent from "@/utils/renderContent";
import Icon from "../Icon";
import { getLastBottomOffset } from "./method";
import type { MessageProps } from "./types";
const props = withDefaults(defineProps<MessageProps>(), {
  type: "primary",
  duration: 3000,
  offset: 20,
});
const messageRef = ref<HTMLDivElement>();
const height = ref(0);
const lastOffset = computed(() => getLastBottomOffset(props.id));
const topOffset = computed(() => props.offset + lastOffset.value);
const bottomOffset = computed(() => topOffset.value + height.value);
const cssStyle = computed(() => {
  return {
    top: topOffset.value + "px",
    zIndex: props.zIndex,
  };
});
const visible = ref(false);
const startTimer = () => {
  if (props.duration === 0) return;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
};
watch(visible, (newVal) => {
  if (!newVal) {
    props.onDestroy();
  }
});
onMounted(async () => {
  visible.value = true;
  startTimer();
  await nextTick();
  height.value = messageRef.value!.getBoundingClientRect().height;
});
defineExpose({
  bottomOffset,
  visible,
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
