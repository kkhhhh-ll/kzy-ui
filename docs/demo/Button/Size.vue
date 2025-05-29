<template>
  <div class="btn">
    <Button size="medium" type="primary">primary</Button>
    <Button size="small" type="success">success</Button>
    <Button size="large" type="danger">danger</Button>
  </div>
</template>
<script setup>
import Button from "@/components/Button/Button.vue";
</script>
<style lang="scss" scoped>
.btn {
  .k-button {
    margin: 5px;
  }
}
</style>
