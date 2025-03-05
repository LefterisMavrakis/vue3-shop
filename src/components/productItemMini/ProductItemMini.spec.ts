import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import useCartStore from '@/stores/cart/cart'
import ProductItemMini from './ProductItemMini.vue'
import type { ApiCartItem } from '@/api/services/cart/types'

const mockProduct: ApiCartItem = {
  id: '1',
  productId: 1,
  name: 'Test Product',
  description: 'This is a test product.',
  category: 'test category',
  price: 200,
  image: null,
  quantity: 3,
}

describe('ProductItemMini', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(ProductItemMini, {
      props: mockProduct,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })
  })

  it('renders product name and formatted price', () => {
    expect(wrapper.text()).toContain(mockProduct.name)
    expect(wrapper.text()).toContain(
      new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(Number(mockProduct.price)),
    )
  })

  it('renders cart item quantity actions', () => {
    const actions = wrapper.find('.productQuantityActions')
    expect(wrapper.find('.quantity').text()).toBe('3')
    expect(actions.exists()).toBe(true)
  })

  it('triggers store method to add cart item when clicks the plus button', async () => {
    const cartStore = useCartStore()

    const button = wrapper.find('.plusAction')

    await button.trigger('click')

    expect(cartStore.addProductToCart).toHaveBeenCalledWith({
      category: 'test category',
      description: 'This is a test product.',
      image: null,
      name: 'Test Product',
      price: 200,
      productId: 1,
    })
  })

  it('triggers store method to remove cart item when clicks the plus button', async () => {
    const cartStore = useCartStore()

    const button = wrapper.find('.minusAction')

    await button.trigger('click')

    expect(cartStore.deleteProductFromCart).toHaveBeenCalledWith(mockProduct.id)
  })

  it('triggers store method to remove cart item when clicks the delete button', async () => {
    const cartStore = useCartStore()

    const button = wrapper.find('.deleteAction')

    await button.trigger('click')

    expect(cartStore.deleteProductFromCart).toHaveBeenCalledWith(mockProduct.id, true)
  })
})
