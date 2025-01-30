import { ProductTable } from './_components/ProductTable';
import { ProductService } from '@/services/product-service';

export default async function DashboardPage() {
  const initialProducts = await ProductService.getProducts();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Dashboard de Produtos</h1>
      <ProductTable initialProducts={initialProducts.data} />
    </div>
  );
}
