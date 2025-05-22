<template>
    <i class="k-icon" :class="{ [`k-icon--${props.type}`]: props.type }" v-bind="$attrs" :style="computedStyle">
        <font-awesome-icon v-bind="filterProps"></font-awesome-icon>
    </i>
</template>

<script lang="ts" setup>
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, defineProps } from "vue";
import { omit } from "lodash-es";
defineOptions({
    name: "KIcon",
    inheritAttrs: false,
});
const props = defineProps<IconProps>()
const filterProps = computed(() => {
    return omit(props, ['type', 'color']);
})
const computedStyle = computed(() => {
    return props.color ? {
        color: props.color
    } : {}
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>