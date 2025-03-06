import { expect, describe, it, vi } from 'vitest';
import apiClient from '@/api/client/client';
import { mockedCartItems } from './__mocks__/cartItems';
import cartAPI from './api';

vi.spyOn(apiClient, 'get').mockResolvedValue(mockedCartItems);
vi.spyOn(apiClient, 'post').mockResolvedValue(mockedCartItems[0]);
vi.spyOn(apiClient, 'patch').mockResolvedValue(mockedCartItems[0]);
vi.spyOn(apiClient, 'delete').mockResolvedValue(mockedCartItems[0]);

describe('cartAPI', () => {
  describe('getCartProducts', () => {
    it('makes the correct api call', async () => {
      await cartAPI.getCartProducts();

      expect(apiClient.get).toHaveBeenCalledWith('/cart');
    });
  });

  describe('addProduct', () => {
    it('makes the correct api call', async () => {
      const mockedPayload = mockedCartItems[0];

      await cartAPI.addProduct({
        ...mockedPayload,
      });

      expect(apiClient.post).toHaveBeenCalledWith('/cart', mockedPayload);
    });
  });

  describe('updateProductQuantity', () => {
    it('makes the correct api call', async () => {
      await cartAPI.updateProductQuantity('1', 2);

      expect(apiClient.patch).toHaveBeenCalledWith('/cart/1', {
        quantity: 2,
      });
    });
  });

  describe('deleteProduct', () => {
    it('makes the correct api call', async () => {
      await cartAPI.deleteProduct('1');

      expect(apiClient.delete).toHaveBeenCalledWith('/cart/1');
    });
  });
});
