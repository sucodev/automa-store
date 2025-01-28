import { IProductService } from '../services/IProductService';
import { Product } from '@prisma/client';

export class ListProductsUseCase {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  async execute(
    page: number = 1,
    pageSize: number = 10,
    orderBy: { field: string; direction: 'asc' | 'desc' } = {
      field: 'createdAt',
      direction: 'desc',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: { [key: string]: any } = {},
  ): Promise<{ products: Product[]; total: number }> {
    if (page < 1) {
      throw new Error('Page must be greater than or equal to 1.');
    }
    if (pageSize < 1) {
      throw new Error('Page size must be greater than or equal to 1.');
    }

    const MAX_PAGE_SIZE = 100;
    pageSize = Math.min(pageSize, MAX_PAGE_SIZE);

    return this.productService.getProducts(page, pageSize, orderBy, filters);
  }
}
