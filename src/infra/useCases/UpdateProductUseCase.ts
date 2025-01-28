import { Product } from '@prisma/client';
import { IProductService } from '../services/IProductService';

export class UpdateProductUseCase {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  async execute(id: number, data: Partial<Product>) {
    const product = await this.productService.getProductById(id);

    if (!product) {
      throw new Error('Product not found.');
    }

    return this.productService.updateProduct(id, data);
  }
}
