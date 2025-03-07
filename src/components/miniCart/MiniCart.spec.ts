import { describe, it, vi, beforeEach, expect } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { mockedCartItems } from '@/api/services/cart/__mocks__/cartItems';
import useCartStore from '@/stores/cart/cart';
import MiniCart from './MiniCart.vue';
import { convertToEuroPrice } from '@/utils/utils';

describe('MiniCart', () => {
  let wrapper: VueWrapper;
  let cartStore: ReturnType<typeof useCartStore>;

  beforeEach(async () => {
    wrapper = mount(MiniCart, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    cartStore = useCartStore();

    await cartStore.$patch({ cartData: mockedCartItems });
  });

  it('calls fetchCartProducts when mounts', async () => {
    expect(cartStore.fetchCartProducts).toHaveBeenCalled();
  });

  it('renders the correct items count and total', async () => {
    const itemsTotal = convertToEuroPrice(cartStore.cartItemsTotal);

    expect(wrapper.find('.cartItemsCount').exists()).toBe(true);
    expect(wrapper.find('.cartItemsCount').text()).toBe('3');
    expect(wrapper.find('.totalSection').text()).toContain(itemsTotal);
  });

  it('renders checkout button', () => {
    expect(wrapper.find('.checkoutButton').exists()).toBe(true);
  });

  describe('when clicks the mini cart icon', () => {
    it('renders the minicart content with the correct data', async () => {
      const cartIcon = wrapper.find('.miniCartIcon');

      expect((wrapper.find('.miniCartContent').element as HTMLElement).style.display).toBe('none');

      await cartIcon.trigger('click');

      expect((wrapper.find('.miniCartContent').element as HTMLElement).style.display).toBe('');

      expect(wrapper.find('.cartTitle').text()).toBe('You have 3 items to your cart');

      expect(wrapper.findAll('.productItemMini')).toHaveLength(2);

      mockedCartItems.forEach((item) => {
        expect(wrapper.text()).toContain(item.name);
      });
    });
  });
});
