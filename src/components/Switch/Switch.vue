<template>
  <div
    class="k-switch"
    :class="{
      'is-checked': checked,
      'is-disabled': disabled,
    }"
    @click="changeCheckBox"
  >
    <input
      type="checkbox"
      v-model="innerValue"
      role="switch"
      :disabled="disabled"
      :name="name"
    />
    <div class="k-switch__core">
      <div class="k-switch__core-inner" v-if="activeText || inactiveText">
        <span class="k-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="k-switch__action"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  ref,
  computed,
  defineEmits,
  defineOptions,
  watch,
} from "vue";
import type { SwitchProps, SwitchEmits } from "./types";
defineOptions({
  name: "KSwitch",
});
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();
const innerValue = ref(props.modelValue);
const checked = computed(() => innerValue.value === props.activeValue);
const changeCheckBox = () => {
  if (props.disabled) return;
  const newVal = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newVal;
  emits("update:modelValue", newVal);
  emits("change", newVal);
};
watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue;
  }
);
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
