<template>
  <div class="k-tooltip" v-on="outerEvents" ref="containerRef">
    <div class="k-tooltip-trigger" ref="triggerRef" v-on="events">
      <slot></slot>
    </div>
    <transition :name="transition" v-on="tooltipEvents">
      <div class="k-tooltip-content" ref="popperRef" v-if="isOpen">
        <slot name="content">
          {{ props.content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  defineOptions,
  withDefaults,
  defineExpose,
  ref,
  computed,
  defineEmits,
  watch,
  reactive,
  onUnmounted,
} from "vue";
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";
import { createPopper } from "@popperjs/core";
import useClickOutSide from "@/hooks/onClickOutSide";
import { debounce } from "lodash-es";
import type { Instance } from "@popperjs/core";
defineOptions({ name: "KTooltip" });
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "right",
  trigger: "hover",
  manual: false,
  transition: "k",
  openDelay: 0,
  closeDelay: 0,
});
const emits = defineEmits<TooltipEmits>();
const containerRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const popperRef = ref<HTMLElement | null>(null);

let popperInstance: Instance | null = null;
let outerEvents: Record<string, any> = reactive({});
let events: Record<string, any> = reactive({});
const isOpen = ref<boolean>(false);
const open = () => {
  isOpen.value = true;
  emits("visible-change", true);
};
const close = () => {
  isOpen.value = false;
  emits("visible-change", false);
};
const openDebounce = debounce(open, props.openDelay);
const closeDebounce = debounce(close, props.closeDelay);
const openFinal = () => {
  closeDebounce.cancel();
  openDebounce();
};
const closeFinal = () => {
  openDebounce.cancel();
  closeDebounce();
};
const changeOpen = () => {
  if (isOpen.value) {
    closeFinal();
  } else {
    openFinal();
  }
};

const addEvents = () => {
  if (props.trigger === "hover") {
    events.mouseenter = openFinal;
    outerEvents.mouseleave = closeFinal;
  } else if (props.trigger === "click") {
    events.click = changeOpen;
  }
};
if (!props.manual) {
  addEvents();
}
const tooltipEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter: (el) => {
    el.style.display = "block";
  },
  enter: (el) => {
    el.style.display = "block";
  },
  afterEnter: (el) => {
    el.style.display = "block";
  },
  beforeLeave: (el) => {
    el.style.display = "none";
  },
  leave: (el) => {
    el.style.display = "none";
  },
  afterLeave: (el) => {
    el.style.display = "none";
  },
};
useClickOutSide(containerRef, () => {
  if (props.trigger === "click" && isOpen.value && !props.manual) {
    closeFinal();
  }
});
watch(
  () => props.manual,
  (newVal) => {
    if (newVal) {
      events = {};
      outerEvents = {};
    } else {
      addEvents();
    }
  }
);
watch(
  () => props.trigger,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      events = {};
      outerEvents = {};
      addEvents();
    }
  }
);
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    ...props.popperOptions,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  };
});
watch(
  isOpen,
  (newVal) => {
    if (newVal) {
      if (triggerRef.value && popperRef.value) {
        popperInstance = createPopper(
          triggerRef.value,
          popperRef.value,
          popperOptions.value
        );
      }
    } else {
      popperInstance?.destroy();
    }
  },
  {
    flush: "post",
  }
);
onUnmounted(() => {
  popperInstance = null;
});
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
