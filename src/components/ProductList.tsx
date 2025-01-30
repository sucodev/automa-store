'use client';

import { useCartStore } from '@/store/cartStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/interface/Product';
import Card from './product/Card';
import useSWR from 'swr';
import { API } from '@/constants/api';
import { SkeletonCard } from './product/Skeleton';
import { SearchFound } from '@/assets/svg/SearchFound';

export function ProductList({
  currentPage,
  searchTerm,
}: {
  searchTerm?: string;
  currentPage: number;
}) {
  const { upsertCartItem } = useCartStore(state => state);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
    router.refresh();
  };

  const handleAddToCart = (product: Product) => {
    upsertCartItem(product, 1);
  };

  const fetcher = (url: string) =>
    fetch(url, {
      next: {
        tags: ['products'],
        revalidate: 60,
      },
    }).then(res => res.json());

  const { data, isLoading } = useSWR(
    !searchTerm
      ? `${API.PRODUCT}?page=${currentPage}&pageSize=10`
      : `${API.SEARCH}?name=${searchTerm}&page=${currentPage}&pageSize=10`,
    fetcher,
    {
      tags: ['products', 'cart'],
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (isLoading) return <SkeletonCard />;

  return (
    <div className="mt-4">
      <div>
        {searchTerm && (
          <>
            <h1 className="font-sans font-semibold text-2xl text-black mb-4 flex items-center gap-2">
              <SearchFound className="w-10 h-10" />
              Você buscou por:
              <span className="font-bold">{`"${searchTerm}"`}</span>
            </h1>
          </>
        )}

        {!data?.data.length && (
          <>
            <hr />
            <div className="flex items-center gap-2 mt-4">
              <h1 className="text-2xl font-bold">
                Nenhum resultado encontrado
              </h1>
            </div>
          </>
        )}
      </div>
      <Card
        currentPage={currentPage}
        handleAddToCart={handleAddToCart}
        handlePageChange={handlePageChange}
        products={data}
        totalPages={data?.pagination?.totalPages}
      />
    </div>
  );
}
