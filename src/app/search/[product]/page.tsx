import React from 'react';
import Page from '../../../modules/search/SearchPage';

type PageProps = {
  params: Promise<{ product?: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function SearchPage({ params, searchParams }: PageProps) {
  const searchTerm = decodeURIComponent((await params).product!);

  const currentPage = Number((await searchParams)?.page) || 1;

  return <Page searchTerm={searchTerm} currentPage={currentPage} />;
}
