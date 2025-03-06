import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import ProductItem from './ProductItem.vue';
import { createTestingPinia } from '@pinia/testing';
import type { ApiProduct } from '@/api/services/products/types';
import useCartStore from '@/stores/cart/cart';

const mockProduct: ApiProduct = {
  id: '1',
  name: 'Test Product',
  description: 'This is a test product.',
  category: 'test category',
  price: 200,
  image: null,
};

describe('ProductItem', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(ProductItem, {
      props: mockProduct,
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });
  });

  it('renders product name, description, and formatted price', () => {
    expect(wrapper.text()).toContain(mockProduct.name);
    expect(wrapper.text()).toContain(mockProduct.description);
    expect(wrapper.text()).toContain(
      new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(Number(mockProduct.price)),
    );
  });

  it('renders the add to cart button', () => {
    const button = wrapper.find('.addToCart');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Add to cart');
  });

  it('makes call to add cart item when clicks the add to cart button', async () => {
    const cartStore = useCartStore();

    const button = wrapper.find('.addToCart');

    await button.trigger('click');

    expect(cartStore.addProductToCart).toHaveBeenCalledWith({
      category: 'test category',
      description: 'This is a test product.',
      image: null,
      name: 'Test Product',
      price: 200,
      productId: '1',
    });
  });
});
