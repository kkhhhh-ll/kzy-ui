<template>
  <div>
    <KCollapse v-model="activeNames">
      <KCollapseItem name="a">
        <template #header>
          <div>标题1</div>
        </template>
        <template #content>
          <div>内容1</div>
        </template>
      </KCollapseItem>
      <KCollapseItem name="b">
        <template #header>
          <div>标题2</div>
        </template>
        <template #content>
          <div>内容2</div>
        </template>
      </KCollapseItem>
      <KCollapseItem name="c">
        <template #header>
          <div>标题3</div>
        </template>
        <template #content>
          <div>内容3</div>
        </template>
      </KCollapseItem>
    </KCollapse>
  </div>
</template>
<script setup>
import { ref } from "vue";
import KCollapse from "@/components/Collapse/Collapse.vue";
import KCollapseItem from "@/components/Collapse/CollapseItem.vue";
const activeNames = ref(["a"]);
</script>
