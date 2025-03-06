<template>
  <div class="appHeader flex justify-between gap-3">
    <div class="logoContainer textTitle xl">Marketplace</div>
    <div class="cartContainer">
      <MiniCart />
    </div>
  </div>
</template>

<script setup lang="ts">
import MiniCart from '../miniCart/MiniCart.vue';
</script>

<style scoped>
.appHeader {
  padding: 10px 20px;
  box-sizing: border-box;
  width: 100%;
  background-color: var(--dark-blue, '#0e0063');
  position: relative;
  z-index: 1000;
}

.logoContainer {
  color: var(--vt-c-white-soft);
}
</style>
