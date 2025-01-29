import { create } from 'zustand';

interface PaginationState {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
}

export const usePaginationStore = create<PaginationState>(set => ({
  currentPage: 1,
  totalPages: 1,
  setCurrentPage: page => set({ currentPage: page }),
  setTotalPages: totalPages => set({ totalPages }),
}));
