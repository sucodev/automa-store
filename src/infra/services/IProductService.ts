import { Product } from '@prisma/client';

export interface IProductService {
  getProducts(
    page: number,
    pageSize: number,
    orderBy: { field: string; direction: 'asc' | 'desc' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: { [key: string]: any },
  ): Promise<{ products: Product[]; total: number }>;
  getProductById(id: number): Promise<Product | null>;
  createProduct(product: Omit<Product, 'id'>): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  findByName(name: string): Promise<Product | null>;
}
