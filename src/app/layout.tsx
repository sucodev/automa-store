import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'AutomaTrade',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Header />
        <main className="mt-4">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
