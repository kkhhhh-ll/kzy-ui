<template>
  <div class="btn">
    <Button>default</Button>
    <Button type="primary">primary</Button>
    <Button type="success">success</Button>
    <Button type="danger">danger</Button>
    <Button type="warning">warning</Button>
    <Button type="info">info</Button>
  </div>
  <div class="btn">
    <Button plain>plain</Button>
    <Button type="primary" plain>primary</Button>
    <Button type="success" plain>success</Button>
    <Button type="danger" plain>danger</Button>
    <Button type="warning" plain>warning</Button>
    <Button type="info" plain>info</Button>
  </div>
  <div class="btn">
    <Button round>round</Button>
    <Button type="primary" round>primary</Button>
    <Button type="success" round>success</Button>
    <Button type="danger" round>danger</Button>
    <Button type="warning" round>warning</Button>
    <Button type="info" round>info</Button>
  </div>
  <div class="btn">
    <Button type="primary" loading></Button>
    <Button type="danger" circle loading></Button>
    <Button type="success" icon="arrow-up">向上箭头</Button>
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
