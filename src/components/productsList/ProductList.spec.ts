import { mount, type VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, vi, beforeEach, expect } from 'vitest'
import ProductsList from './ProductsList.vue'
import useProductsStore from '@/stores/products/products'
import productsAPI from '@/api/services/products/api'
import { mockedProductsList } from '@/api/services/products/__mocks__/products'
import TextField from '../shared/textField/TextField.vue'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    query: { page: '1' },
  })),
}))

vi.spyOn(productsAPI, 'getProducts').mockResolvedValue({
  data: mockedProductsList,
  next: null,
})

describe('ProductsList', () => {
  let wrapper: VueWrapper
  let productsStore: ReturnType<typeof useProductsStore>

  beforeEach(async () => {
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      callback([{ isIntersecting: true }], null)
      return { observe: vi.fn(), disconnect: vi.fn() }
    })

    wrapper = mount(ProductsList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })

    productsStore = useProductsStore()

    await productsStore.$patch({
      productsLoading: false,
      productsNextPage: 2,
      productsData: mockedProductsList,
    })
  })

  describe('when mounted', () => {
    it('calls fetchProducts', async () => {
      expect(productsStore.fetchProducts).toHaveBeenCalledWith({ page: 1 })
    })

    it('renders a list of products', () => {
      const productItems = wrapper.findAll('.productItem')

      expect(productItems.length).toBe(10)
    })
  })

  it('filters products based on search text', async () => {
    await wrapper.findComponent(TextField).setValue('Laptop')

    const productItems = wrapper.findAll('.productItem')
    expect(productItems.length).toBe(1)

    expect(productItems[0].text()).toContain('Laptop')
  })
})
