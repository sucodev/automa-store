'use client';

import { useCartStore } from '@/store/cartStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, ProductResponse } from '@/interface/Product';
import Card from './product/Card';
import useSWR, { mutate } from 'swr';
import { API } from '@/constants/api';
import { Dialog } from './dialog/Dialog';
import { UpdateProductDialog } from './dialog/UpdateProduct';
import { useProductStore } from '@/store/productStore';

export function ProductList({
  currentPage,
  searchTerm,
}: {
  searchTerm?: string;
  currentPage: number;
}) {
  const { upsertCartItem } = useCartStore(state => state);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    productToDelete,
    setProductToDelete,
    isUpdateDialogOpen,
    setIsUpdateDialogOpen,
    productToUpdate,
    setProductToUpdate,
  } = useProductStore();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
    router.refresh();
  };

  const handleAddToCart = (product: Product) => {
    upsertCartItem(product, 1);
  };

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  const { data, error } = useSWR(
    !searchTerm
      ? `${API.PRODUCT}?page=${currentPage}&pageSize=10&orderBy=createdAt&direction=desc`
      : `${API.SEARCH}?name=${searchTerm}&page=${currentPage}&pageSize=10&orderBy=createdAt&direction=desc`,
    fetcher,
  );

  const handleDeleteProduct = async (productId: number) => {
    try {
      mutate(
        `${API.PRODUCT}?page=1&pageSize=10&orderBy=createdAt&direction=desc`,
        (currentData: ProductResponse | undefined) => {
          if (!currentData) return currentData;

          return {
            ...currentData,
            data: currentData.data.filter(product => product.id !== productId),
          };
        },
        false,
      );

      await fetch(`${API.PRODUCT}/${productId}`, {
        method: 'DELETE',
      });

      mutate(
        `${API.PRODUCT}?page=1&pageSize=10&orderBy=createdAt&direction=desc`,
      );

      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      mutate(
        `${API.PRODUCT}?page=${currentPage}&pageSize=10&orderBy=createdAt&direction=desc`,
        (currentData: ProductResponse | undefined) => {
          if (!currentData) return currentData;

          return {
            ...currentData,
            data: currentData.data.map(p =>
              p.id === product.id ? { ...p, ...product } : p,
            ),
          };
        },
        false,
      );

      const response = await fetch(`${API.PRODUCT}/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          stock: product.stock,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar o produto');
      }

      mutate(
        `${API.PRODUCT}?page=${currentPage}&pageSize=10&orderBy=createdAt&direction=desc`,
      );

      setIsUpdateDialogOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
    }
  };

  const openUpdateDialog = (product: Product) => {
    setProductToUpdate(product);
    setIsUpdateDialogOpen(true);
  };

  const closeUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
    setProductToUpdate(null);
  };

  const openDeleteDialog = (productId: number) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = () => {
    if (productToDelete !== null) {
      handleDeleteProduct(productToDelete);
    }
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="mt-4">
      <Card
        currentPage={currentPage}
        handleAddToCart={handleAddToCart}
        handleDeleteProduct={openDeleteDialog}
        handlePageChange={handlePageChange}
        handleUpdateProduct={openUpdateDialog}
        products={data}
        totalPages={data.pagination.totalPages}
      />

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este produto?"
      />

      <UpdateProductDialog
        isOpen={isUpdateDialogOpen}
        onClose={closeUpdateDialog}
        onConfirm={handleUpdateProduct}
        product={productToUpdate}
      />
    </div>
  );
}
