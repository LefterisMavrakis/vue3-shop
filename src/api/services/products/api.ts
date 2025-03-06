import type { GetProductsRequestParams, GetProductsApiResponse } from './types';
import apiClient from '@/api/client/client';

const productsAPI = {
  getProducts: async (params: GetProductsRequestParams) => {
    return apiClient
      .get(`/products`, {
        params: {
          _page: params.page,
          _per_page: 8,
          _sort: params.sort,
          _order:
            params.sort?.split(',')?.length && params.sort.split(',').length > 1
              ? 'asc,asc'
              : 'asc',
        },
      })
      .then(({ data }: { data: GetProductsApiResponse }) => {
        return data;
      });
  },
};

export default productsAPI;
