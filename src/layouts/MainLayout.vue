<template>
  <div class="mainLayoutWrapper">
    <header>
      <AppHeader />
    </header>

    <div class="mainWrapper">
      <main>
        <div class="mainInner">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/header/AppHeader.vue'
</script>

<style scoped lang="scss">
header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-max);
}

.mainLayoutWrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.mainWrapper {
  background: var(--vt-c-white);
  flex: 1;
  height: 100%;
}

.mainInner {
  padding: 20px 20px 100px;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 20px 10px;
  }
}
</style>
