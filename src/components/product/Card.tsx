import { Product, ProductResponseDTO } from '@/interface/Product';
import Pagination from '../Pagination';
import List from './List';

interface Props {
  products: ProductResponseDTO;
  handleAddToCart: (product: Product) => void;
  currentPage: number;
  totalPages: number;
  handlePageChange: (currentPage: number) => void;
  handleDeleteProduct: (productId: number) => void;
  handleUpdateProduct: (product: Product) => void;
}

export default function Card({
  products,
  handleAddToCart,
  handleDeleteProduct,
  handleUpdateProduct,
  currentPage,
  totalPages,
  handlePageChange,
}: Props) {
  return (
    <>
      <List
        handleAddToCart={handleAddToCart}
        handleDeleteProduct={handleDeleteProduct}
        handleUpdateProduct={handleUpdateProduct}
        products={products}
      />
      {totalPages > 0 && (
        <Pagination
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
