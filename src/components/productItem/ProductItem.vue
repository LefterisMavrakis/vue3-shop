<template>
  <div class="productItem">
    <div class="productTopSection flex column gap-1 justify-center">
      <div class="productImage">
        <img :src="imagePlaceholder" />
      </div>
    </div>

    <div class="productBottomSection flex column gap-3">
      <div class="productTitle textTitle sm">
        {{ props.name }}
      </div>

      <p>
        {{ props.description }}
      </p>

      <div class="textTitle md">
        {{ formattedPrice }}
      </div>

      <div
        class="mainButton addToCart"
        v-ripple
        :disable="cartStore.addToCartLoading"
        @click="handleAddToCart()"
      >
        Add to cart
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ApiProduct } from '@/api/services/products/types'
import useCartStore from '@/stores/cart/cart'
import { convertToEuroPrice } from '@/utils/utils'
import vRipple from '@/directives/v-ripple/ripple'
import imagePlaceholder from '@/assets/png/iphone16.png'

type Props = ApiProduct

const props = defineProps<Props>()
const cartStore = useCartStore()

const handleAddToCart = async () => {
  await cartStore.addProductToCart({
    productId: props.id,
    name: props.name,
    description: props.description,
    image: props.image,
    category: props.category,
    price: props.price,
  })
}

const formattedPrice = computed(() => {
  return convertToEuroPrice(props.price)
})
</script>

<style lang="scss" scoped>
.productItem {
  background-color: #fff;
  border-radius: var(--border-radius-4);
  box-sizing: border-box;

  .productTopSection {
    padding: 20px 10px;
    box-sizing: border-box;
    height: 230px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius-4);
      background-color: var(--muted-bg);
      pointer-events: none;
    }

    .productImage {
      align-self: center;
      height: 100%;

      img {
        height: 100%;
      }
    }
  }

  .productBottomSection {
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
