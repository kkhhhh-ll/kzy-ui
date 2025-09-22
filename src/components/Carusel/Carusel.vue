<template>
    <div class="k-carusel" :style="{ width: props.width + 'px', height: props.height + 'px' }">
        <div class="k-carusel__img-wrapper">
            <div class="k-carusel__img-item" v-for="(item, index) in props.imgList" :key="item.key"
                v-show="currentIndex === index">
                <img :src="item.src" :alt="`Image ${index + 1}`" />
            </div>
        </div>
        <button v-if="showBtn" class="k-carusel__btn k-carusel__btn--prev" @click="prev">‹</button>
        <button v-if="showBtn" class="k-carusel__btn k-carusel__btn--next" @click="next">›</button>
        <div v-if="showSpot" class="k-carusel__spots">
            <span v-for="(item, index) in props.imgList" :key="item.key" class="k-carusel__spot"
                :class="{ 'is-active': currentIndex === index }" @click="goTo(index)"></span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CaruselProps } from "./types";
import {
    ref,
    withDefaults,
    defineProps,
    onMounted,
    onBeforeUnmount,
    defineOptions,
} from "vue";
defineOptions({
    name: "KCarusel"
});
const props = withDefaults(defineProps<CaruselProps>(), {
    showBtn: false,
    showSpot: false,
    width: 300,
    height: 150,
    autoPlay: true,
    interval: 3000,
});
const currentIndex = ref(0);
let timer: ReturnType<typeof setInterval> | null = null
function prev() {
    if (currentIndex.value === 0) {
        currentIndex.value = props.imgList.length - 1;
        return;
    }
    currentIndex.value = currentIndex.value - 1
}
function next() {
    if (currentIndex.value === props.imgList.length - 1) {
        currentIndex.value = 0;
        return;
    }
    currentIndex.value = currentIndex.value + 1
}
function goTo(index: number) {
    currentIndex.value = index;
}
onMounted(() => {
    if (props.autoPlay) {
        timer = setInterval(() => {
            next();
        }, props.interval)
    }
})
// 组件卸载前清除定时器
onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
})
</script>

<style>
@import "./style.scss";
</style>