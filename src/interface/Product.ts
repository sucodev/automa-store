export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}
export interface ProductResponseDTO {
  data: Product[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
interface Pagination {
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
export interface ProductResponse {
  data: Product[];
  pagination: Pagination;
}
