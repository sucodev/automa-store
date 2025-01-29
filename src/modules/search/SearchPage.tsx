import React from 'react';

import { ProductList } from '@/components/ProductList';

export default function SearchPage({
  searchTerm,
  currentPage,
}: {
  searchTerm: string;

  currentPage: number;
}) {
  return (
    <div className="container mx-auto ">
      <h2 className="font-sans font-semibold text-4xl text-black mb-4">
        Você buscou por:{' '}
        <span className="font-bold">
          {searchTerm ? `"${searchTerm}"` : '"Nada encontrado"'}
        </span>
      </h2>
      <ProductList searchTerm={searchTerm} currentPage={currentPage} />
    </div>
  );
}
