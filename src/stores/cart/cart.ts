import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { ApiCartItem, GetCartApiResponse } from '@/api/services/cart/types';
import cartAPI from '@/api/services/cart/api';
import { convertToEuroPrice } from '@/utils/utils';

const useCartStore = defineStore('cart', () => {
  const cartData = ref<GetCartApiResponse>([]);
  const cartLoading = ref(true);
  const addToCartLoading = ref(false);
  const deleteFromCartLoading = ref(false);

  const cartItemsCount = computed(() =>
    cartData.value.reduce((acc, item) => acc + item.quantity, 0),
  );

  const cartItemsTotal = computed(() =>
    cartData.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  const formattedTotal = computed(() => {
    return convertToEuroPrice(cartItemsTotal.value);
  });

  const fetchCartProducts = async () => {
    try {
      const cartResponse = await cartAPI.getCartProducts();

      cartData.value = cartResponse;
    } catch (err) {
      console.log(err);
    } finally {
      cartLoading.value = false;
    }
  };

  const addProductToCart = async (product: Omit<ApiCartItem, 'id' | 'quantity'>) => {
    addToCartLoading.value = true;

    try {
      const cartItem = cartData.value?.find((item) => item.productId === product.productId);

      if (!cartItem) {
        await cartAPI.addProduct({ ...product, quantity: 1 });
        await fetchCartProducts();
        return;
      }

      await cartAPI.updateProductQuantity(cartItem.id, cartItem.quantity + 1);
      await fetchCartProducts();
    } catch (err) {
      console.log(err);
    } finally {
      addToCartLoading.value = false;
    }
  };

  const deleteProductFromCart = async (cartItemId: string, force?: boolean) => {
    deleteFromCartLoading.value = true;

    try {
      const cartItem = cartData.value?.find((item) => item.id === cartItemId);

      if (cartItem && cartItem.quantity > 1 && !force) {
        await cartAPI.updateProductQuantity(cartItem.id, cartItem.quantity - 1);
        await fetchCartProducts();
        return;
      }

      await cartAPI.deleteProduct(cartItemId);

      await fetchCartProducts();
    } catch (err) {
      console.log(err);
    } finally {
      deleteFromCartLoading.value = false;
    }
  };

  return {
    cartData,
    cartLoading,
    fetchCartProducts,
    addProductToCart,
    addToCartLoading,
    deleteProductFromCart,
    deleteFromCartLoading,
    cartItemsTotal,
    formattedTotal,
    cartItemsCount,
  };
});

export default useCartStore;
