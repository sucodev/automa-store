import { Product } from '@prisma/client';

export interface IProductRepository {
  findAll(
    skip: number,
    take: number,
    orderBy: { field: string; direction: 'asc' | 'desc' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: { [key: string]: any },
  ): Promise<{ products: Product[]; total: number }>;
  findById(id: number): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(id: number, product: Partial<Product>): Promise<Product>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<Product | null>;
}
