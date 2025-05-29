<template>
  <div class="btn">
    <Button disabled>default</Button>
    <Button type="primary" disabled>primary</Button>
    <Button type="success" disabled>success</Button>
    <Button type="danger" disabled>danger</Button>
    <Button type="warning" disabled>warning</Button>
    <Button type="info" disabled>info</Button>
  </div>
  <div class="btn">
    <Button disabled plain>default</Button>
    <Button type="primary" disabled plain>primary</Button>
    <Button type="success" disabled plain>success</Button>
    <Button type="danger" disabled plain>danger</Button>
    <Button type="warning" disabled plain>warning</Button>
    <Button type="info" disabled plain>info</Button>
  </div>
</template>
<script setup>
import Button from "@/components/Button/Button.vue";
</script>
<style lang="scss" scoped>
.btn {
  .k-button {
    margin: 0 5px;
  }
}
</style>
