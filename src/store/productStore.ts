import { create } from 'zustand';
import { Product } from '@/interface/Product';
import { ProductService } from '@/services/product-service';
import { mutate } from 'swr';
import { API } from '@/constants/api';
import {
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
} from '@tanstack/react-table';
import { toast } from '@/hooks/use-toast';

interface ProductStore {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  rowSelection: RowSelectionState;
  setSorting: (
    updater: SortingState | ((prev: SortingState) => SortingState),
  ) => void;
  setColumnFilters: (
    updater:
      | ColumnFiltersState
      | ((prev: ColumnFiltersState) => ColumnFiltersState),
  ) => void;
  setColumnVisibility: (
    updater: VisibilityState | ((prev: VisibilityState) => VisibilityState),
  ) => void;
  setRowSelection: (
    updater:
      | RowSelectionState
      | ((prev: RowSelectionState) => RowSelectionState),
  ) => void;

  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  isUpdateDialogOpen: boolean;
  setIsUpdateDialogOpen: (isOpen: boolean) => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (isOpen: boolean) => void;

  productToDelete: number | null;
  setProductToDelete: (productId: number | null) => void;
  productToUpdate: Product | null;
  setProductToUpdate: (product: Product | null) => void;

  products: Product[];
  setProducts: (products: Product[]) => void;

  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;

  table: Table<Product> | null;
  setTable: (table: Table<Product>) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  isDeleteDialogOpen: false,
  isUpdateDialogOpen: false,
  isAddDialogOpen: false,
  productToDelete: null,
  productToUpdate: null,
  products: [],
  table: null,
  sorting: [],
  columnFilters: [],
  columnVisibility: {},
  rowSelection: {},

  setIsDeleteDialogOpen: isOpen => set({ isDeleteDialogOpen: isOpen }),
  setIsUpdateDialogOpen: isOpen => set({ isUpdateDialogOpen: isOpen }),
  setIsAddDialogOpen: isOpen => set({ isAddDialogOpen: isOpen }),
  setProductToDelete: productId => set({ productToDelete: productId }),
  setProductToUpdate: product => set({ productToUpdate: product }),
  setProducts: products => set({ products }),
  setTable: table => set({ table }),

  setSorting: updater =>
    set(state => ({
      sorting: typeof updater === 'function' ? updater(state.sorting) : updater,
    })),

  setColumnFilters: updater =>
    set(state => ({
      columnFilters:
        typeof updater === 'function' ? updater(state.columnFilters) : updater,
    })),

  setColumnVisibility: updater =>
    set(state => ({
      columnVisibility:
        typeof updater === 'function'
          ? updater(state.columnVisibility)
          : updater,
    })),

  setRowSelection: updater =>
    set(state => ({
      rowSelection:
        typeof updater === 'function' ? updater(state.rowSelection) : updater,
    })),

  addProduct: async productData => {
    try {
      set(state => ({
        products: [
          ...state.products,
          {
            ...productData,
            id: Math.random(),
            createdAt: new Date().toISOString(),
          } as Product,
        ],
      }));

      const newProduct = await ProductService.createProduct(productData);

      set(state => ({
        products: state.products.map(p =>
          p.id === Math.random() ? newProduct : p,
        ),
      }));

      toast({
        title: 'Success!',
        description: 'Product created with success.',
      });

      mutate(API.PRODUCT);
    } catch (error) {
      set(state => ({
        products: state.products.filter(p => p.id !== Math.random()),
      }));
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    const originalProducts = get().products;

    set(state => ({
      products: state.products.map(product =>
        product.id === id ? { ...product, ...productData } : product,
      ),
    }));

    toast({
      title: 'Success!',
      description: 'Product updated with success.',
    });

    try {
      await ProductService.updateProduct(id, productData);
      mutate(API.PRODUCT);
    } catch (error) {
      set({ products: originalProducts });
      throw error;
    }
  },

  deleteProduct: async id => {
    const originalProducts = get().products;

    set(state => ({
      products: state.products.filter(product => product.id !== id),
    }));

    try {
      await ProductService.deleteProduct(id);

      toast({
        title: 'Success!',
        description: 'Product deleted with success.',
      });

      mutate(API.PRODUCT);
    } catch (error) {
      set({ products: originalProducts });
      throw error;
    }
  },
}));
