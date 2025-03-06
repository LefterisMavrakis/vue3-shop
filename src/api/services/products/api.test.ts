import { expect, describe, it, vi } from 'vitest'
import apiClient from '@/api/client/client'
import { mockedProductsList } from './__mocks__/products'
import productsAPI from './api'

vi.spyOn(apiClient, 'get').mockResolvedValue(mockedProductsList)

describe('productsAPI', () => {
  describe('getProducts', () => {
    it('makes the correct api call', async () => {
      await productsAPI.getProducts({
        page: 1,
        per_page: 10,
      })

      expect(apiClient.get).toHaveBeenCalledWith('/products', {
        params: {
          _page: 1,
          _per_page: 8,
          _order: 'asc',
        },
      })
    })
  })
})
