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
      <ProductList searchTerm={searchTerm} currentPage={currentPage} />
    </div>
  );
}
