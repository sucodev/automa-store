import { create } from 'zustand';
import { Product } from '@prisma/client';

interface SearchState {
  searchTerm: string;
  suggestions: Product[];
  isLoading: boolean;
  isFocused: boolean;
  setSearchTerm: (term: string) => void;
  setSuggestions: (suggestions: Product[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsFocused: (isFocused: boolean) => void;
}

export const useSearchStore = create<SearchState>(set => ({
  searchTerm: '',
  suggestions: [],
  isLoading: false,
  isFocused: false,
  setSearchTerm: term => set(() => ({ searchTerm: term })),
  setSuggestions: suggestions => set(() => ({ suggestions })),
  setIsLoading: isLoading => set(() => ({ isLoading })),
  setIsFocused: isFocused => set(() => ({ isFocused })),
}));
