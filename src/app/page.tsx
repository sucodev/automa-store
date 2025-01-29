import Page from '@/modules/home/HomePage';

export const metadata = {
  title: `${process.env.BRAND} | Home`,
};

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  return <Page currentPage={currentPage} />;
}
