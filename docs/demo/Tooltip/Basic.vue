<template>
  <Tooltip content="top" placement="top" trigger="hover">
    <span>top</span>
  </Tooltip>
  <Tooltip content="right" placement="right" trigger="hover">
    <span>right</span>
  </Tooltip>
  <Tooltip content="bottom" placement="bottom" trigger="hover">
    <span>bottom</span>
  </Tooltip>
  <Tooltip content="left" placement="left" trigger="hover">
    <span>left</span>
  </Tooltip>
</template>
<script setup>
import Tooltip from "./components/Tooltip/Tooltip.vue";
</script>
