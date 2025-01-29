/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useCallback, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, Search } from 'lucide-react';
import { Product } from '@prisma/client';
import Link from 'next/link';
import { useSearchStore } from '@/store/searchStore';
import debounce from 'lodash.debounce';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CartSidebar } from './cart/sidebar';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { AddProductDialog } from './dialog/AddProductDialog';
import { API } from '@/constants/api';
import { mutate } from 'swr';

async function fetchSuggestions(query: string) {
  const response = await fetch(`/api/products/search?name=${query}`);
  const { data } = await response.json();
  return data || [];
}

const Header = React.memo(() => {
  const {
    searchTerm,
    suggestions,
    isFocused,
    setSearchTerm,
    setSuggestions,
    setIsLoading,
    setIsFocused,
  } = useSearchStore();

  const router = useRouter();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const debouncedFetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.length > 2) {
        setIsLoading(true);

        try {
          const products = await fetchSuggestions(query);
          setSuggestions(products);
        } catch (error) {
          console.error('Erro ao buscar sugestões', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500),
    [],
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    debouncedFetchSuggestions(query);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search/${searchTerm}`);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleAddProduct = async (product: {
    name: string;
    description: string;
    price: number;
    stock: number;
  }) => {
    try {
      const response = await fetch(API.PRODUCT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar o produto');
      }

      mutate(`${API.PRODUCT}`);

      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Erro ao adicionar o produto:', error);
    }
  };

  return (
    <header className="bg-[#161616] text-white sticky top-0 w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4 md:gap-8">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-sans font-bold">AutomaStore</h1>
            </Link>
          </div>
          <div className="flex-1 w-full md:max-w-4xl">
            <div className="flex">
              <form className="flex-1 relative" onSubmit={handleSearchSubmit}>
                <Input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                  placeholder="O que você procura?"
                  className="w-full rounded-md h-12 text-black border-none bg-white font-sans"
                  aria-label="Campo de busca"
                />
                <Button
                  type="submit"
                  className="absolute right-0 top-0 h-full bg-purple-300 hover:bg-purple-400 text-black rounded-l-none px-6"
                  aria-label="Pesquisar"
                >
                  <Search className="h-5 w-5" />
                </Button>

                {isFocused && searchTerm.length > 2 && (
                  <div className="absolute w-full bg-white border mt-2 rounded-md shadow-lg z-10 text-black">
                    <div className="px-4 p-2 hover:bg-gray-200 cursor-pointer text-black">
                      <Link
                        href={`/search/${searchTerm}`}
                        className={cn(
                          'hover:bg-gray-200 w-full font-sans',
                          suggestions.length == 0 && 'pointer-events-none',
                        )}
                      >
                        Pesquisar por: <b className="font-bold">{searchTerm}</b>
                      </Link>
                    </div>

                    {suggestions.length > 0 ? (
                      suggestions
                        .map((suggestion: Product) => (
                          <div
                            key={suggestion.id}
                            className="px-4 p-2 hover:bg-gray-200 cursor-pointer text-black font-sans"
                            onClick={() => setSearchTerm(suggestion.name)}
                          >
                            <Link href={`/search/${suggestion.name}`}>
                              {suggestion.name}
                            </Link>
                          </div>
                        ))
                        .splice(0, 5)
                    ) : (
                      <div className="p-2 text-gray-500">
                        Nenhuma sugestão encontrada.
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
          <ul className="flex-1 flex justify-end items-center gap-2 flex-shrink-0">
            <li>
              <PlusIcon
                onClick={() => setIsAddDialogOpen(!isAddDialogOpen)}
                className="text-purple-200"
              />
            </li>
            <li>
              <CartSidebar />
            </li>

            <li className="text-sm font-bold bg-purple-200 rounded-full min-h-10 pr-4 cursor-pointer">
              <Link
                href="https://github.com/sucodev"
                className="flex items-center gap-2"
                aria-label="Perfil do GitHub"
              >
                <Avatar className="border-white border-2 rounded-full">
                  <AvatarImage
                    src="https://github.com/sucodev.png"
                    alt="Avatar do usuário"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-black font-sans">@sucodev</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <AddProductDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onConfirm={handleAddProduct}
      />
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
