<template>
    <div class="k-collapse">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import {
    defineOptions,
    defineProps,
    ref,
    provide,
    defineEmits,
    watch,
} from "vue";
import type { CollapseProps, NameTypes, CollapseEmits } from "./types";
import { CollapseContextKey } from "./types";
defineOptions({
    name: "KCollapse",
});
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref<NameTypes[]>(props.modelValue);
// props传递给本地ref时，要使用watch监听，进行异步更新！！！
watch(
    () => props.modelValue,
    (newVal) => {
        activeNames.value = newVal;
    }
);
if (props?.according && activeNames.value.length > 1) {
    console.warn("Collapse组件的according属性为true时，activeNames只能有一个值");
}
const handleClick = (name: NameTypes) => {
    if (props?.according) {
        activeNames.value = [activeNames.value[0] === name ? "" : name];
    } else {
        const index = activeNames.value.indexOf(name);
        if (index === -1) {
            activeNames.value.push(name);
        } else {
            activeNames.value.splice(index, 1);
        }
    }
    emits("change", activeNames.value);
    emits("update:modelValue", activeNames.value);
};
// 提供给子组件使用
provide(CollapseContextKey, {
    activeNames,
    handleClick,
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
