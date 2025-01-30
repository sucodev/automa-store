import { API } from '@/constants/api';
import { Product, ProductResponse } from '@/interface/Product';

export class ProductService {
  private static readonly API_URL = API.PRODUCT || 'http://localhost:3000/api';

  static async getProducts(): Promise<ProductResponse> {
    try {
      const response = await fetch(`${this.API_URL}`, {
        next: {
          tags: ['products'],
          revalidate: 60,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

  static async createProduct(
    productData: Omit<Product, 'id' | 'createdAt'>,
  ): Promise<Product> {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return response.json();
  }

  static async updateProduct(
    id: number,
    productData: Partial<Product>,
  ): Promise<Product> {
    const response = await fetch(`${this.API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return response.json();
  }

  static async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${this.API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  }
}
