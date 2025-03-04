import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import useProductsStore from './products'
import productsAPI from '@/api/services/products/api'
import { mockedProductsList } from '@/api/services/products/__mocks__/products'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    query: { page: '1', type_id: '2', amenities: 'pool' },
  })),
}))

describe('useProductsStore', () => {
  let store: ReturnType<typeof useProductsStore>

  beforeEach(() => {
    vi.spyOn(productsAPI, 'getProducts').mockResolvedValue(mockedProductsList)

    setActivePinia(createPinia())
    store = useProductsStore()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should fetch products and set state successfully', async () => {
    expect(store.productsLoading).toBe(true)

    await store.fetchProducts({ page: 1, per_page: 10 })

    expect(productsAPI.getProducts).toHaveBeenCalledWith({
      page: 1,
      per_page: 10,
    })

    expect(store.products).toEqual(mockedProductsList)
    expect(store.productsLoading).toBe(false)
  })

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Failed to fetch products'
    vi.spyOn(productsAPI, 'getProducts').mockRejectedValue(new Error(errorMessage))

    await store.fetchProducts({ page: 1, per_page: 10 })

    expect(store.productsLoading).toBe(false)
    expect(store.products).toEqual([])
  })
})
