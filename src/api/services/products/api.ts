import type { GetProductsRequestParams, GetProductsApiResponse } from './types'
import apiClient from '@/api/client/client'

const productsAPI = {
  getProducts: async (params: GetProductsRequestParams) => {
    return apiClient
      .get(`/products`, {
        params: {
          _page: params.page,
          _per_page: 8,
        },
      })
      .then(({ data }: { data: GetProductsApiResponse }) => {
        return data
      })
  },
}

export default productsAPI
