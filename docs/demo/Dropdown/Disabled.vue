<template>
  <Dropdown :menu-options="menuOptions" trigger="click" placement="bottom">
    <div>下拉显示</div>
  </Dropdown>
</template>

<script setup>
import { h, reactive } from "vue";
import Dropdown from "@/components/Dropdown/Dropdown.vue";
const menuOptions = reactive([
  {
    label: "1",
    key: 1,
  },
  {
    label: "2",
    key: 2,
    disabled: true,
  },
  {
    label: h("b", { style: { color: "red" } }, "render"),
    key: 3,
  },
]);
</script>
