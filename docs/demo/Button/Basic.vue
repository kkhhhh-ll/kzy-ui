<template>
  <div class="btn">
    <Kbutton>default</Kbutton>
    <Kbutton type="primary">primary</Kbutton>
    <Kbutton type="success">success</Kbutton>
    <Kbutton type="danger">danger</Kbutton>
    <Kbutton type="warning">warning</Kbutton>
    <Kbutton type="info">info</Kbutton>
  </div>
  <div class="btn">
    <Kbutton plain>plain</Kbutton>
    <Kbutton type="primary" plain>primary</Kbutton>
    <Kbutton type="success" plain>success</Kbutton>
    <Kbutton type="danger" plain>danger</Kbutton>
    <Kbutton type="warning" plain>warning</Kbutton>
    <Kbutton type="info" plain>info</Kbutton>
  </div>
  <div class="btn">
    <Kbutton round>round</Kbutton>
    <Kbutton type="primary" round>primary</Kbutton>
    <Kbutton type="success" round>success</Kbutton>
    <Kbutton type="danger" round>danger</Kbutton>
    <Kbutton type="warning" round>warning</Kbutton>
    <Kbutton type="info" round>info</Kbutton>
  </div>
  <div class="btn">
    <Kbutton type="primary" loading></Kbutton>
    <Kbutton type="success" icon="arrow-up">向上箭头</Kbutton>
    <Kbutton plain icon="arrow-down">向下箭头</Kbutton>
  </div>
</template>
<script setup>
import Kbutton from "@/components/Button/Button.vue";
</script>
<style lang="scss" scoped>
.btn {
  margin: 10px;
  display: flex;
  gap: 10px;
}
</style>
