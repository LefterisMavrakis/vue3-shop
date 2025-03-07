<template>
  <div class="checkoutDataWrapper flex column gap-3">
    <h3 class="textTitle xl">Checkout</h3>

    <div class="constraintContainer">
      <div class="checkoutBody">
        <div class="checkouBodyInner">
          <div class="productsSection">
            <template v-if="!cartProductsLoading">
              <template v-if="cartProducts.length">
                <ProductItemMini
                  v-for="product in cartProducts"
                  :key="product.id"
                  v-bind="product"
                />
              </template>
              <template v-else> No product found in cart </template>
            </template>
            <template v-else>Loading cart products...</template>
          </div>

          <div class="totalSection">Total: {{ formattedTotal }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCartStore from '@/stores/cart/cart';
import ProductItemMini from '../productItemMini/ProductItemMini.vue';
import { computed, onMounted } from 'vue';

const cartStore = useCartStore();

const cartProducts = computed(() => cartStore.cartData);
const cartProductsLoading = computed(() => cartStore.cartLoading);
const formattedTotal = computed(() => {
  return cartStore.formattedTotal;
});

onMounted(async () => {
  await cartStore.fetchCartProducts();
});
</script>

<style scoped lang="scss">
.checkoutDataWrapper {
  position: relative;
  width: 100%;

  .checkoutBody {
    background-color: var(--muted-bg);
    border-radius: var(--border-radius-4);
    padding: 20px 0 0;
    box-sizing: border-box;

    .totalSection {
      position: sticky;
      bottom: 0;
      background-color: #f8f8f8;
      padding: 20px 0;
      text-align: center;
      border-top: 1px solid var(--vt-c-divider-light-1);
      z-index: 10;
    }
  }
}

.constraintContainer {
  width: 100%;
  max-width: var(--constraint-container);
  margin: 0 auto;
}
</style>
