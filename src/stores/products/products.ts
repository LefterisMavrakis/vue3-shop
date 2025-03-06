import { ref } from 'vue';
import { defineStore } from 'pinia';
import type {
  GetProductsApiResponse,
  GetProductsRequestParams,
} from '@/api/services/products/types';
import productsAPI from '@/api/services/products/api';

const useProductsStore = defineStore('products', () => {
  const productsData = ref<GetProductsApiResponse['data']>([]);
  const productsLoading = ref(true);
  const productsNextPage = ref<number | null>(null);

  const fetchProducts = async (
    params: Omit<GetProductsRequestParams, 'per_page'>,
    appendMode?: boolean,
  ) => {
    try {
      const productsResponse = await productsAPI.getProducts(params);

      productsNextPage.value = productsResponse.next;

      if (!appendMode) {
        productsData.value = productsResponse.data;
        return;
      }

      productsData.value = [...productsData.value, ...productsResponse.data];
    } catch (err) {
      console.log(err);
    } finally {
      productsLoading.value = false;
    }
  };

  return {
    productsData,
    productsLoading,
    fetchProducts,
    productsNextPage,
  };
});

export default useProductsStore;
