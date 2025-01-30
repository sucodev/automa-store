import { Product, ProductResponseDTO } from '@/interface/Product';
import Pagination from '../Pagination';
import List from './List';

interface Props {
  products: ProductResponseDTO;
  handleAddToCart: (product: Product) => void;
  currentPage: number;
  totalPages: number;
  handlePageChange: (currentPage: number) => void;
}

export default function Card({
  products,
  handleAddToCart,
  currentPage,
  totalPages,
  handlePageChange,
}: Props) {
  return (
    <>
      <List handleAddToCart={handleAddToCart} products={products} />
      {totalPages > 1 && (
        <Pagination
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
