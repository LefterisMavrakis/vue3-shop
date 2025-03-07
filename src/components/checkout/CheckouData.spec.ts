import { describe, it, vi, beforeEach, expect } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { mockedCartItems } from '@/api/services/cart/__mocks__/cartItems';
import useCartStore from '@/stores/cart/cart';
import { convertToEuroPrice } from '@/utils/utils';
import CheckoutData from './CheckoutData.vue';

describe('CheckoutData', () => {
  let wrapper: VueWrapper;
  let cartStore: ReturnType<typeof useCartStore>;

  beforeEach(async () => {
    wrapper = mount(CheckoutData, {
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

  it('renders the correct items total and count', async () => {
    const itemsTotal = convertToEuroPrice(cartStore.cartItemsTotal);
    expect(wrapper.find('.totalSection').text()).toBe(`Items: 3Total: ${itemsTotal}`);
  });
});
