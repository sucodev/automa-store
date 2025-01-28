import { Product } from '@prisma/client';
import { IProductService } from '../services/IProductService';

export class CreateProductUseCase {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  async execute(productData: Omit<Product, 'id'>): Promise<Product> {
    if (productData.stock === undefined || productData.stock === null) {
      throw new Error('Stock is required');
    }

    if (typeof productData.stock !== 'number' || productData.stock < 0) {
      throw new Error('Stock must be a non-negative number');
    }

    const existingProduct = await this.productService.findByName(
      productData.name,
    );

    if (existingProduct) {
      throw new Error('Product with this name already exists');
    }

    if (typeof productData.price !== 'number' || productData.price < 0) {
      throw new Error('Price must be a non-negative number');
    }

    return this.productService.createProduct(productData);
  }
}
