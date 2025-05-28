<template>
  <div
    class="k-input"
    :class="{
      [`k-input-${props.type}`]: props.type,
      'is-disabled': props.disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
    }"
  >
    <template v-if="props.type !== 'textarea'">
      <div class="k-input__inner">
        <slot name="prepend" v-if="$slots.prepend">
          <span class="k-input--prepend"><slot name="prepend"></slot></span>
        </slot>
        <slot name="prefix" v-if="$slots.prefix">
          <span class="k-input--prefix"><slot name="prefix"></slot></span>
        </slot>
        <input
          v-bind="$attrs"
          v-model="innerValue"
          ref="inputRef"
          :type="props.type"
          @input="handleInput"
          :disabled="props.disabled"
          @clear="clear"
          :placeholder="props.placeholder"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <slot name="suffix" v-if="$slots.suffix || showClose || showPassword">
          <span class="k-input--suffix"
            ><slot name="suffix"></slot>
            <Icon
              v-if="showClose"
              class="k-input__close"
              icon="circle-xmark"
              @click="clear"
              @mousedown.prevent="Noop"
            />
            <Icon
              v-if="showPassword && passwordVisible"
              class="k-input__password"
              icon="eye"
              @click="togglePasswordVisible"
            />
            <Icon
              v-if="showPassword && !passwordVisible"
              class="k-input__password"
              icon="eye-slash"
              @click="togglePasswordVisible"
            />
          </span>
        </slot>
        <slot name="append" v-if="$slots.append">
          <span class="k-input--append"><slot name="append"></slot></span>
        </slot>
      </div>
    </template>
    <template v-else>
      <textarea
        v-bind="$attrs"
        v-model="innerValue"
        ref="inputRef"
        @input="handleInput"
        @change="handleChange"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
      ></textarea>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  defineOptions,
  withDefaults,
  defineEmits,
  ref,
  defineExpose,
  watch,
  computed,
} from "vue";
import type { InputProps, InputEmits, InputInstance } from "./types";
import Icon from "../Icon/Icon.vue";
defineOptions({
  name: "KInput",
});
const inputRef = ref<InputInstance | null>();
const isFocused = ref(false);
const passwordVisible = ref(true);
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};
const Noop = () => {};
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  clearable: true,
});

const innerValue = ref<string | undefined>(props.modelValue);
const showClose = computed(() => {
  return (
    props.type === "text" &&
    !props.disabled &&
    innerValue.value &&
    isFocused.value &&
    props.clearable
  );
});
const showPassword = computed(() => {
  return props.showPassword && !props.disabled && innerValue.value;
});
const emits = defineEmits<InputEmits>();
const handleChange = () => {
  emits("change", innerValue.value);
};

const handleInput = () => {
  emits("update:modelValue", innerValue.value);
  emits("input", innerValue.value);
};
const clear = () => {
  innerValue.value = "";
  emits("update:modelValue", "");
  emits("clear");
  emits("change", "");
};
const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emits("focus", event);
};
const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emits("blur", event);
};
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);
defineExpose({
  ref: inputRef.value,
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
