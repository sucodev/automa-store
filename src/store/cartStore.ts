/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '@prisma/client';
import { create } from 'zustand';

export type Cart = {
  product: Product;
  quantity: number;
};

type States = {
  cart: Cart[];
};

type Actions = {
  upsertCartItem: (
    product: Pick<Product, 'id' | 'name' | 'price' | 'stock'>,
    quantity: number,
  ) => void;
  resetCart: () => void;
};

const initialState: States = {
  cart: [],
};

export const useCartStore = create<States & Actions>()(set => ({
  ...initialState,
  upsertCartItem: (product: any, quantity) =>
    set(state => {
      let newCart = state.cart;

      let productIndex = newCart.findIndex(
        item => item.product.id === product.id,
      );

      if (productIndex < 0) {
        newCart.push({ product, quantity: 0 });
        productIndex = newCart.findIndex(
          item => item.product.id === product.id,
        );
      }

      newCart[productIndex].quantity += quantity;

      if (newCart[productIndex].quantity <= 0) {
        newCart = newCart.filter(item => item.product.id !== product.id);
      }

      return { ...state, cart: newCart };
    }),
  resetCart: () => set({ cart: [] }),
}));
