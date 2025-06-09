<template>
  <div
    class="k-color"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <input
      type="color"
      v-model="innerValue"
      @change="onInputChange"
      role="color"
      :id="id"
      :disabled="disabled"
      :name="name"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, defineEmits, defineOptions, watch } from "vue";
import type { ColorProps, ColorEmits } from "./types";
defineOptions({
  name: "KColor",
});
const props = withDefaults(defineProps<ColorProps>(), {});
const emits = defineEmits<ColorEmits>();
const innerValue = ref(props.modelValue);
const changeColor = (val: string) => {
  if (props.disabled) return;
  innerValue.value = val;
  emits("update:modelValue", val);
  emits("change", val);
};

const onInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  changeColor(target.value);
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
