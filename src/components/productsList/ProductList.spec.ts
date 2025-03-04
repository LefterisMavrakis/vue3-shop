import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { describe, it, vi, beforeEach, expect } from 'vitest'
import ProductsList from './ProductsList.vue'
import useProductsStore from '@/stores/products/products'
import useFiltersStore from '@/stores/filters/filters'
import productsAPI from '@/api/services/products/api'
import { mockedProductsList } from '@/api/services/products/__mocks__/products'

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
  let wrapper: any
  let productsStore: any

  beforeEach(() => {
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      // This mock simulates that the first entry is intersecting
      callback([{ isIntersecting: false }], null)
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
  })

  it('calls fetchProducts when mounted', async () => {
    // Ensure fetchProducts is called during mounting
    expect(productsStore.fetchProducts).toHaveBeenCalledWith({ page: 1 })
  })
})
