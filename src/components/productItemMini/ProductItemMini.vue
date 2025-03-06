<template>
  <div class="productItemMini">
    <div class="productImage">
      <img width="auto" height="80px" :src="props.image ?? imagePlaceholder" />
    </div>

    <div class="flex column">
      <div class="productName">{{ props.name }}</div>

      <div class="productPrice textTitle">
        {{ formattedPrice }}
      </div>
    </div>

    <div class="productQuantityActions flex justify-center gap-1">
      <div
        v-ripple
        class="minusAction mainButton outlined quantityAction"
        @click="handleMinusClick"
      >
        <IconMinus />
      </div>

      <div class="quantity">{{ props.quantity }}</div>

      <div v-ripple class="plusAction mainButton outlined quantityAction" @click="handlePlusClick">
        <IconPlus />
      </div>

      <div
        v-ripple
        class="deleteAction mainButton outlined quantityAction"
        @click="handleDeleteClick"
      >
        <IconTrash />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ApiCartItem } from '@/api/services/cart/types'
import useCartStore from '@/stores/cart/cart'
import IconMinus from '../icons/IconMinus.vue'
import IconPlus from '../icons/IconPlus.vue'
import IconTrash from '../icons/IconTrash.vue'
import { convertToEuroPrice } from '@/utils/utils'
import vRipple from '@/directives/v-ripple/ripple'
import imagePlaceholder from '@/assets/png/iphone16.png'

type Props = ApiCartItem

const props = defineProps<Props>()

const cartStore = useCartStore()

const formattedPrice = computed(() => convertToEuroPrice(props.price))

const handlePlusClick = async () => {
  await cartStore.addProductToCart({
    productId: props.productId,
    name: props.name,
    description: props.description,
    image: props.image,
    category: props.category,
    price: props.price,
  })
}

const handleDeleteClick = async () => {
  await cartStore.deleteProductFromCart(props.id, true)
}

const handleMinusClick = async () => {
  await cartStore.deleteProductFromCart(props.id)
}
</script>

<style scoped lang="scss">
.productItemMini {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding: 5px 10px;
}

.productQuantityActions {
  margin: 0 0 0 auto;
  flex-shrink: 0;
}

.quantity {
  min-width: 30px;
  text-align: center;
}

.quantityAction {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: var(--border-1);
  padding: 0;

  svg {
    width: 20px;
    height: 20px;
    stroke: var(--dark-blue);
  }
}
</style>
