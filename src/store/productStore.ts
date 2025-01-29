import { Product } from '@/interface/Product';
import { create } from 'zustand';

interface ProductStore {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  productToDelete: number | null;
  setProductToDelete: (productId: number | null) => void;
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: (isOpen: boolean) => void;
  productToUpdate: Product | null;
  setProductToUpdate: (product: Product | null) => void;
}

export const useProductStore = create<ProductStore>(set => ({
  isDeleteDialogOpen: false,
  setIsDeleteDialogOpen: isOpen => set({ isDeleteDialogOpen: isOpen }),
  productToDelete: null,
  setProductToDelete: productId => set({ productToDelete: productId }),
  isUpdateDialogOpen: false,
  setIsUpdateDialogOpen: isOpen => set({ isUpdateDialogOpen: isOpen }),
  productToUpdate: null,
  setProductToUpdate: product => set({ productToUpdate: product }),
}));
