import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';

import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'AutomaTrade',
  description:
    'O AutomaStore é uma exemplificação de um e-commerce, desenvolvida para o Code Challange da AutomaTrade. Com arquitetura escalável e foco em performance, o projeto combina tecnologias de ponta para oferecer uma experiência robusta e intuitiva.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className="font-sans antialiased">
          <Header />

          <main className="mt-4 mb-4 px-4">{children}</main>

          <Toaster />
          <Analytics />
        </body>
      </html>
    </SessionProvider>
  );
}
