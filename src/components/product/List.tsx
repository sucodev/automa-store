import { Product, ProductResponseDTO } from '@/interface/Product';
import React from 'react';
import Item from './Item';

interface Props {
  products: ProductResponseDTO;
  handleAddToCart: (product: Product) => void;
  handleDeleteProduct: (productId: number) => void;
  handleUpdateProduct: (product: Product) => void;
}

export default function List({
  products,
  handleAddToCart,
  handleDeleteProduct,
  handleUpdateProduct,
}: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.data.map(product => (
        <Item
          key={product.id}
          product={product}
          handleAddToCart={handleAddToCart}
          handleDeleteProduct={handleDeleteProduct}
          handleUpdateProduct={handleUpdateProduct}
        />
      ))}
    </ul>
  );
}
