<template>
    <div class="k-card">
        <div class="k-card__header" :class="headerClass" v-if="$slots.header || props.title">
            <slot name="header">
                {{ props.title }}
            </slot>
        </div>
        <div class="k-card__body" :class="bodyClass" :style="bodyStyle">
            <slot>
                {{ props.content }}
            </slot>
        </div>
        <div class="k-card__footer" :class="footerClass" v-if="$slots.footer || footer">
            <slot name="footer">
                {{ props.footer }}
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CardProps } from "./types";
import { withDefaults, defineProps, defineOptions } from "vue";
defineOptions({
    name: "KCard"
});
const props = withDefaults(defineProps<CardProps>(), {
    title: "",
    content: "卡片内容",
    footer: "",
    bodyStyle: undefined,
    headerClass: "",
    footerClass: "",
    bodyClass: ""
});
</script>

<style>
@import "./style.scss";
</style>