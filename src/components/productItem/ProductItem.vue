<template>
  <div class="productItem">
    <div class="productTopSection flex column gap-1 justify-center">
      <div class="productImage">
        <img
          src="data:image/png;base64,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"
        />
      </div>
      <div class="productTitle textTitle sm">
        {{ props.name }}
      </div>
    </div>

    <div class="productBottomSection flex column gap-3">
      <p>
        {{ props.description }}
      </p>

      <div class="textTitle md">
        {{ formattedPrice }}
      </div>

      <button class="mainButton">Add to cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ApiProduct } from '@/api/services/products/types'

type Props = ApiProduct

const props = defineProps<Props>()

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(props.price))
})
</script>

<style lang="scss" scoped>
.productItem {
  min-width: 200px;
  flex: 1 1 calc(25% - 12px);
  background-color: #fcfbff;
  border-radius: 16px;
  box-sizing: border-box;

  .productTopSection {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #e2e2e2;
    margin: 0 0 10px;

    .productImage {
      align-self: center;
    }
  }

  .productBottomSection {
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
