<template>
  <div class="miniCart">
    <div v-ripple class="miniCartIcon" @click="toggleCart">
      <IconBasket />

      <div class="cartItemsCount">
        {{ cartItemsCount }}
      </div>
    </div>
    <transition name="fade">
      <div v-show="isCartVisible" class="miniCartContent">
        <div class="topSection flex noWrap justify-between">
          <h4 class="textTitle cartTitle">You have {{ cartItemsCount }} items to your cart</h4>

          <div class="closeMiniCart" @click="toggleCart">
            <IconClose />
          </div>
        </div>

        <div class="productsSection">
          <template v-if="cartItems.length">
            <div class="cartProductWrapper flex column gap-2">
              <ProductItemMini v-for="cartItem in cartItems" :key="cartItem.id" v-bind="cartItem" />
            </div>
          </template>
          <template v-else> Let's buy something</template>
        </div>

        <div class="totalSection flex column gap-2">
          <div class="totalSection textTitle">Total: {{ formattedTotal }}</div>
          <RouterLink to="/checkout">
            <div v-ripple class="checkoutButton mainButton" @click="toggleCart">Checkout</div>
          </RouterLink>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import useCartStore from '@/stores/cart/cart';
import IconClose from '@/components/icons/IconClose.vue';
import IconBasket from '@/components/icons/IconBasket.vue';
import ProductItemMini from '../productItemMini/ProductItemMini.vue';
import vRipple from '@/directives/v-ripple/ripple';

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.cartData);
const cartItemsCount = computed(() => cartStore.cartItemsCount);

const formattedTotal = computed(() => {
  return cartStore.formattedTotal;
});

const isCartVisible = ref(false);

const toggleCart = () => {
  isCartVisible.value = !isCartVisible.value;
};

onMounted(async () => {
  await cartStore.fetchCartProducts();
});
</script>

<style scoped lang="scss">
.miniCart {
  position: relative;

  .miniCartIcon {
    position: relative;
    height: 50px;
    width: auto;
    text-align: center;
    display: flex;
    align-items: center;
    font-size: 13px;
    padding: 10px;
    cursor: pointer;
    border-radius: var(--border-radius-3);
    transition: all 0.3s ease;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    gap: 6px;

    &:hover {
      background-color: rgba($color: #fff, $alpha: 0.2);
    }

    svg {
      width: 30px;
      height: 30px;
    }

    .cartItemsCount {
      color: var(--vt-c-black-soft);
      font-weight: 600;
      border-radius: var(--border-radius-4);
      position: relative;
      background-color: rgb(241, 193, 102);
      padding: 5px 10px;
    }
  }

  .miniCartContent {
    position: absolute;
    right: 0;
    width: 400px;
    background-color: #fff;
    border-radius: var(--border-radius-4);
    box-shadow: -1px 8px 20px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 70vh;
    overflow: auto;

    @media (max-width: 500px) {
      width: 320px;
    }

    @media (max-height: 800px) {
      height: 85vh;
    }

    .closeMiniCart {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }

    .topSection {
      position: sticky;
      top: 0;
      padding: 20px;
      background-color: #fff;
      border-bottom: 1px solid #e9e7e7;
      z-index: 10;
    }

    .productsSection {
      padding: 10px;
      flex: 1;
    }

    .totalSection {
      position: sticky;
      bottom: 0;
      padding: 20px;
      text-align: center;
      background-color: #fff;
      border-top: 1px solid #e9e7e7;
    }
  }
}
</style>
