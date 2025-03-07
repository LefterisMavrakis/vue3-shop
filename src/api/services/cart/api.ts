import type { GetCartApiResponse, ApiCartItem } from './types';
import apiClient from '@/api/client/client';

const cartAPI = {
  getCartProducts: async () => {
    return apiClient.get(`/cart`).then(({ data }: { data: GetCartApiResponse }) => {
      return data;
    });
  },
  addProduct: async (productToAdd: Omit<ApiCartItem, 'id'>) => {
    return apiClient.post(`/cart`, productToAdd).then(({ data }: { data: ApiCartItem }) => {
      return data;
    });
  },
  updateProductQuantity: async (cartItemId: string, newQuantity: number) => {
    try {
      const response = await apiClient.patch(`/cart/${cartItemId}`, {
        quantity: newQuantity,
      });

      return response;
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  },
  deleteProduct: async (cartItemId: string) => {
    try {
      const response = await apiClient.delete(`/cart/${cartItemId}`);
      return response;
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  },
};

export default cartAPI;
