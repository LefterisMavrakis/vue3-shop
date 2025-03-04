import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductItem from './ProductItem.vue'
import type { ApiProduct } from '@/api/services/products/types'

const mockProduct: ApiProduct = {
  id: 1,
  name: 'Test Product',
  description: 'This is a test product.',
  category: 'test category',
  price: 200,
  image: null,
}

describe('ProductItem.vue', () => {
  it('renders product name, description, and formatted price', () => {
    const wrapper = mount(ProductItem, {
      props: mockProduct,
    })

    expect(wrapper.text()).toContain(mockProduct.name)
    expect(wrapper.text()).toContain(mockProduct.description)
    expect(wrapper.text()).toContain(
      new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(Number(mockProduct.price)),
    )
  })

  it('renders the add to cart button', () => {
    const wrapper = mount(ProductItem, {
      props: mockProduct,
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Add to cart')
  })
})
