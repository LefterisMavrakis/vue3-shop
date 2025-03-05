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

  beforeEach(async () => {
    vi.spyOn(cartAPI, 'getCartProducts').mockResolvedValue(mockedCartItems)
    vi.spyOn(cartAPI, 'updateProductQuantity')
    vi.spyOn(cartAPI, 'addProduct')
    vi.spyOn(cartAPI, 'deleteProduct')

    setActivePinia(createPinia())
    store = useCartStore()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('fetchCartProducts', () => {
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

  describe('addProductToCart', () => {
    describe('when product already exists in cart', () => {
      it('should call the updateProductQuantity method', async () => {
        await store.fetchCartProducts()

        expect(store.addToCartLoading).toBe(false)

        await store.addProductToCart({
          ...mockedCartItems[0],
        })

        expect(cartAPI.updateProductQuantity).toHaveBeenCalledWith('test1', 2)
      })
    })

    describe('when product does not exist in cart', () => {
      it('should call the addProduct method', async () => {
        await store.fetchCartProducts()

        expect(store.addToCartLoading).toBe(false)

        await store.addProductToCart({
          ...mockedCartItems[0],
          productId: 100,
        })

        expect(cartAPI.updateProductQuantity).not.toHaveBeenCalled()
        expect(cartAPI.addProduct).toHaveBeenCalledWith({ ...mockedCartItems[0], productId: 100 })
      })
    })
  })

  describe('deleteProductFromCart', () => {
    describe('when product already exists in cart', () => {
      describe('and quantity is greater than 1', () => {
        it('should call the updateProductQuantity method', async () => {
          await store.fetchCartProducts()

          expect(store.deleteFromCartLoading).toBe(false)

          await store.deleteProductFromCart(mockedCartItems[1].id)

          expect(cartAPI.updateProductQuantity).toHaveBeenCalledWith('test2', 1)
        })

        describe('when force parameter is set to true', () => {
          it('should call the deleteProduct method', async () => {
            await store.fetchCartProducts()

            await store.deleteProductFromCart(mockedCartItems[1].id, true)

            expect(cartAPI.deleteProduct).toHaveBeenCalledWith('test2')
          })
        })
      })

      describe('and quantity is 1', () => {
        it('should call the deleteProduct method', async () => {
          await store.fetchCartProducts()

          expect(store.deleteFromCartLoading).toBe(false)

          await store.deleteProductFromCart(mockedCartItems[0].id)

          expect(cartAPI.deleteProduct).toHaveBeenCalledWith('test1')
        })
      })
    })
  })
})
