import { IProductService } from '../services/IProductService';

export class DeleteProductUseCase {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  async execute(id: number) {
    const product = await this.productService.getProductById(id);

    if (!product) {
      throw new Error('Product not found.');
    }

    this.productService.deleteProduct(id);
  }
}
