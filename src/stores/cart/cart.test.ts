import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import useCartStore from './cart'
import cartAPI from '@/api/services/cart/api'
import { mockedCartItems } from '@/api/services/cart/__mocks__/cartItems'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    query: { page: '1' },
  })),
}))

describe('useCartStore', () => {
  let store: ReturnType<typeof useCartStore>

  beforeEach(() => {
    vi.spyOn(cartAPI, 'getCartProducts').mockResolvedValue({
      data: mockedCartItems,
    })

    setActivePinia(createPinia())
    store = useCartStore()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should fetch cart and set state successfully', async () => {
    expect(store.cartLoading).toBe(true)

    await store.fetchCartProducts()

    expect(cartAPI.getCartProducts).toHaveBeenCalledWith()

    expect(store.cartData).toEqual(mockedCartItems)
    expect(store.cartLoading).toBe(false)
  })

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Failed to fetch products'
    vi.spyOn(cartAPI, 'getCartProducts').mockRejectedValue(new Error(errorMessage))

    await store.fetchCartProducts()

    expect(store.cartLoading).toBe(false)
    expect(store.cartData).toEqual([])
  })
})
