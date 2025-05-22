<template>
  <div class="btn">
    <Kbutton disabled>default</Kbutton>
    <Kbutton type="primary" disabled>primary</Kbutton>
    <Kbutton type="success" disabled>success</Kbutton>
    <Kbutton type="danger" disabled>danger</Kbutton>
    <Kbutton type="warning" disabled>warning</Kbutton>
    <Kbutton type="info" disabled>info</Kbutton>
  </div>
  <div class="btn">
    <Kbutton disabled plain>default</Kbutton>
    <Kbutton type="primary" disabled plain>primary</Kbutton>
    <Kbutton type="success" disabled plain>success</Kbutton>
    <Kbutton type="danger" disabled plain>danger</Kbutton>
    <Kbutton type="warning" disabled plain>warning</Kbutton>
    <Kbutton type="info" disabled plain>info</Kbutton>
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
