import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GetCartApiResponse } from '@/api/services/cart/types'
import cartAPI from '@/api/services/cart/api'

const useCartStore = defineStore('products', () => {
  const cartData = ref<GetCartApiResponse['data']>([])
  const cartLoading = ref(true)

  const fetchCartProducts = async () => {
    try {
      const cartResponse = await cartAPI.getCartProducts()

      cartData.value = cartResponse.data
    } catch (err) {
      console.log(err)
    } finally {
      cartLoading.value = false
    }
  }

  return {
    cartData,
    cartLoading,
    fetchCartProducts,
  }
})

export default useCartStore
