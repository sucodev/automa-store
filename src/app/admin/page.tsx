import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { ProductResponse } from '@/interface/Product';
import { FileWarningIcon } from 'lucide-react';
import { ProductTable } from '@/modules/admin/dashboard/_components/ProductTable';
import { ProductService } from '@/services/product-service';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  try {
    const products: ProductResponse = await ProductService.getProducts();

    return (
      <div className="p-4 md:p-8">
        <ProductTable initialProducts={products.data} />
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <FileWarningIcon className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold">Erro ao carregar produtos</h1>
          <p className="mt-2 text-muted-foreground">
            Por favor, tente recarregar a página
          </p>
        </div>
      </div>
    );
  }
}
