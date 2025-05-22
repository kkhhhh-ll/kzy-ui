<template>
  <div class="k-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot></slot>
      <template #content>
        <ul class="k-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            ></li>
            <li
              class="k-dropdown__item"
              @click="itemClick(item)"
              :class="{
                'is-disabled': item.disabled,
                'is-divided': item.divided,
              }"
              :id="`dropdown-item-${item.key}`"
            >
              <renderContent :v-node="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script lang="ts" setup>
import type {
  DropdownEmits,
  DropdownInstance,
  DropdownOptions,
  MenuOption,
} from "./types";
import type { Ref } from "vue";
import {
  defineEmits,
  defineExpose,
  ref,
  defineOptions,
  defineProps,
} from "vue";
import Tooltip from "@/components/Tooltip/Tooltip.vue";
import type { TooltipInstance } from "../Tooltip/types";
import renderContent from "@/utils/renderContent";
defineOptions({
  name: "KDropdown",
});
const tooltipRef = ref<TooltipInstance | null>();
const props = withDefaults(defineProps<DropdownOptions>(), {
  hideAfterClick: true,
});
const emits = defineEmits<DropdownEmits>();
const visibleChange = (e: boolean) => {
  emits("visible-change", e);
};
const itemClick = (e: MenuOption) => {
  if (e.disabled) return;
  emits("select", e);
  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
};

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide(),
});
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
