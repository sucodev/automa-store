import { IProductRepository } from '@/infra/repositories/IProductRepository';
import prisma from '@/lib/prisma';
import { Product } from '@prisma/client';

export class ProductRepositoryImpl implements IProductRepository {
  findByName(name: string): Promise<Product | null> {
    return prisma.product.findFirst({ where: { name } });
  }

  async findAll(
    skip: number = 0,
    take: number = 10,
    orderBy: { field: string; direction: 'asc' | 'desc' } = {
      field: 'createdAt',
      direction: 'desc',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: { [key: string]: any },
  ): Promise<{ products: Product[]; total: number }> {
    const supportedFilters = ['name', 'price', 'createdAt'];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validFilters: { [key: string]: any } = {};
    for (const key in filters) {
      if (supportedFilters.includes(key)) {
        validFilters[key] = filters[key];
      }
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take,
        orderBy: {
          [orderBy.field]: orderBy.direction,
        },
        where: validFilters,
      }),
      prisma.product.count({ where: validFilters }),
    ]);

    return { products, total };
  }

  findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  async create(product: Product): Promise<Product> {
    return prisma.product.create({ data: product });
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    return prisma.product.update({ where: { id }, data: product });
  }

  async delete(id: number): Promise<void> {
    await prisma.product.delete({ where: { id } });
  }
}
