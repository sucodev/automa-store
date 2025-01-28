import { IProductService } from '../services/IProductService';

interface CartItem {
  productId: number;
  quantity: number;
}

export class CheckoutUseCase {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  async execute(cartItems: CartItem[]): Promise<void> {
    for (const item of cartItems) {
      const product = await this.productService.getProductById(item.productId);

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }

      if (product) {
        const updatedStock = product.stock - item.quantity;
        await this.productService.updateProduct(item.productId, {
          stock: updatedStock,
        });
      }
    }
  }
}
