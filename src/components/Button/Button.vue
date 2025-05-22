<template>
    <button ref="_ref" class="k-button" :class="{
        [`k-button--${type}`]: type,
        [`k-button--${size}`]: size,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-loading': loading,
        'is-disabled': disabled,
    }" :disabled="disabled || loading" :type="ButtonHTMLType" :autofocus="autofocus">
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
    <span v-if="!loading">
        <slot></slot>
    </span>
    </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from './types.ts'
import Icon from '../Icon/Icon.vue'
import { ref, withDefaults, defineProps, defineExpose, defineOptions } from 'vue'
defineOptions({
    name: 'KButton',
});
withDefaults(defineProps<ButtonProps>(), {
    type: 'default',
    size: 'medium',
    plain: false,
    round: false,
    circle: false,
    disabled: false,
    autofocus: false,
    ButtonHTMLType: 'button',
    loading: false,
})
const _ref = ref<HTMLButtonElement | null>(null)
defineExpose({
    ref: _ref,
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>