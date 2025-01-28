import { ProductRepositoryImpl } from '@/infra/repositories/impl/ProductRepositoryImpl';
import { IProductService } from '@/infra/services/IProductService';
import { Product } from '@prisma/client';

export class ProductServiceImpl implements IProductService {
  private productRepositoryImpl: ProductRepositoryImpl;

  constructor() {
    this.productRepositoryImpl = new ProductRepositoryImpl();
  }

  findByName(name: string): Promise<Product | null> {
    return this.productRepositoryImpl.findByName(name);
  }

  getProducts(
    page: number = 1,
    pageSize: number = 10,
    orderBy: { field: string; direction: 'asc' | 'desc' } = {
      field: 'createdAt',
      direction: 'desc',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: { [key: string]: any } = {},
  ): Promise<{ products: Product[]; total: number }> {
    const skip = (page - 1) * pageSize;
    return this.productRepositoryImpl.findAll(skip, pageSize, orderBy, filters);
  }
  getProductById(id: number): Promise<Product | null> {
    return this.productRepositoryImpl.findById(id);
  }
  createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    return this.productRepositoryImpl.create(product as Product);
  }
  updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    return this.productRepositoryImpl.update(id, product);
  }
  deleteProduct(id: number): Promise<void> {
    return this.productRepositoryImpl.delete(id);
  }
}
