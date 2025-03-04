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

<style scoped>
.mainLayoutWrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.mainWrapper {
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  background: var(--main-gradient-bg);
  flex: 1;
  height: 100%;
}

.mainInner {
  padding: 20px;
  box-sizing: border-box;
}
</style>
