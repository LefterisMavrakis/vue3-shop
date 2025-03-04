import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {
  GetProductsApiResponse,
  GetProductsRequestParams,
} from '@/api/services/products/types'
import productsAPI from '@/api/services/products/api'

const useProductsStore = defineStore('products', () => {
  const products = ref<GetProductsApiResponse>([])
  const productsLoading = ref(true)

  const fetchProducts = async (params: GetProductsRequestParams) => {
    try {
      const productsResponse = await productsAPI.getProducts(params)
      products.value = productsResponse
    } catch (err) {
      console.log(err)
    } finally {
      productsLoading.value = false
    }
  }

  return {
    products,
    productsLoading,
    fetchProducts,
  }
})

export default useProductsStore
