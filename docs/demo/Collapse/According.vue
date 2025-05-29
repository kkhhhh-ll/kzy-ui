<template>
  <div>
    <Collapse v-model="activeNames" according>
      <CollapseItem name="a">
        <template #header>
          <div>标题1</div>
        </template>
        <template #content>
          <div>内容1</div>
        </template>
      </CollapseItem>
      <CollapseItem name="b">
        <template #header>
          <div>标题2</div>
        </template>
        <template #content>
          <div>内容2</div>
        </template>
      </CollapseItem>
      <CollapseItem name="c">
        <template #header>
          <div>标题3</div>
        </template>
        <template #content>
          <div>内容3</div>
        </template>
      </CollapseItem>
    </Collapse>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Collapse from "@/components/Collapse/Collapse.vue";
import CollapseItem from "@/components/Collapse/CollapseItem.vue";
const activeNames = ref(["a"]);
</script>
