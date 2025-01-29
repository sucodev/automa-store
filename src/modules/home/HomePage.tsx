import { ProductList } from '@/components/ProductList';

interface IPage {
  currentPage: number;
}

export default function HomePage({ currentPage }: IPage) {
  return (
    <div className="container mx-auto">
      <ProductList currentPage={currentPage} />
    </div>
  );
}
