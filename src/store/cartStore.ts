/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '@prisma/client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

export const useCartStore = create<States & Actions>()(
  persist(
    set => ({
      ...initialState,
      upsertCartItem: (product: any, quantity) =>
        set(state => {
          let newCart = [...state.cart];

          const productIndex = newCart.findIndex(
            item => item.product.id === product.id,
          );

          if (productIndex < 0) {
            newCart.push({ product, quantity: 0 });
          }

          const updatedIndex =
            productIndex < 0 ? newCart.length - 1 : productIndex;

          newCart[updatedIndex].quantity += quantity;

          if (newCart[updatedIndex].quantity <= 0) {
            newCart = newCart.filter(item => item.product.id !== product.id);
          }

          return { cart: newCart };
        }),
      resetCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ cart: state.cart }),
    },
  ),
);
