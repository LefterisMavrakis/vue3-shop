import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFiltersStore } from './filters'

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    query: { page: '4' },
  })),
}))

describe('useFiltersStore', () => {
  let store: ReturnType<typeof useFiltersStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useFiltersStore()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('initialises current page based on route query', () => {
    expect(store.currentPage).toBe(4)
  })

  describe('when calls the setCurrentPage method', () => {
    it('mutates the currentPage state', () => {
      store.setCurrentPage(2)

      expect(store.currentPage).toBe(2)
    })
  })

  describe('when calls the resetFilters method', () => {
    it('resets all filters state', () => {
      store.setCurrentPage(2)

      expect(store.currentPage).toBe(2)

      store.resetFilters()

      expect(store.currentPage).toBe(1)
    })
  })
})
