import { mount, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import ProductsList from './ProductsList.vue';
import useProductsStore from '@/stores/products/products';
import productsAPI from '@/api/services/products/api';
import { mockedProductsList } from '@/api/services/products/__mocks__/products';
import TextField from '../shared/textField/TextField.vue';
import useFiltersStore from '@/stores/filters/filters';

let mockRouteQuery = { page: '1' };

const mockedReplaceRouter = vi.fn((newQuery) => {
  mockRouteQuery = { ...mockRouteQuery, ...newQuery.query };
});

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    query: mockRouteQuery,
  })),
  useRouter: vi.fn(() => ({
    replace: mockedReplaceRouter,
  })),
}));

vi.spyOn(productsAPI, 'getProducts').mockResolvedValue({
  data: mockedProductsList,
  next: null,
});

describe('ProductsList', () => {
  let wrapper: VueWrapper;
  let productsStore: ReturnType<typeof useProductsStore>;
  let filtersStore: ReturnType<typeof useFiltersStore>;

  beforeEach(async () => {
    vi.clearAllMocks();
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      callback([{ isIntersecting: true }], null);
      return { observe: vi.fn(), disconnect: vi.fn() };
    });

    wrapper = mount(ProductsList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    productsStore = useProductsStore();
    filtersStore = useFiltersStore();

    await productsStore.$patch({
      productsLoading: false,
      productsNextPage: 2,
      productsData: mockedProductsList,
    });

    await filtersStore.$patch({
      sortBy: [
        { label: 'Name', value: 'name' },
        { label: 'Price', value: 'price' },
      ],
    });
  });

  describe('when mounted', () => {
    it('calls fetchProducts with the correct params', async () => {
      expect(productsStore.fetchProducts).toHaveBeenCalledWith({ page: 1, sort: 'name' });
    });

    it('renders a list of products', () => {
      const productItems = wrapper.findAll('.productItem');

      expect(productItems.length).toBe(10);
    });
  });

  it('filters products based on search text', async () => {
    await wrapper.findComponent(TextField).setValue('Laptop');

    const productItems = wrapper.findAll('.productItem');
    expect(productItems.length).toBe(1);

    expect(productItems[0].text()).toContain('Laptop');
  });

  describe('when filters change', () => {
    it('replaces query with filtering params', async () => {
      await filtersStore.$patch({
        sortBy: [
          { label: 'Name', value: 'name' },
          { label: 'Price', value: 'price' },
        ],
      });

      expect(mockedReplaceRouter).toHaveBeenNthCalledWith(2, {
        query: {
          page: 1,
          sort: 'name,price',
        },
      });
    });
  });
});
