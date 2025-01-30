import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Não encontrado',
};

export default function NotFound() {
  return (
    <main>
      <section className="bg-secondary-default">
        <div className="flex min-h-dvh flex-col items-center px-4 pt-9 text-center font-poppins">
          <Image
            src="404.svg"
            alt="Imagem indicando Erro 404"
            width={0}
            height={0}
            data-testid="404-svg-img"
            className="h-[90vw] max-h-[455px] w-auto"
          />

          <h1 className="mt-9 text-large-headline-6 font-medium text-primary-500">
            Oops! Parece que algo deu errado.
          </h1>
          <p className="mb-9 mt-6 max-w-2xl text-subtitle-3 text-primary-400">
            Certifique-se de que digitou corretamente o endereço da página. Um
            pequeno erro de digitação pode fazer toda a diferença. &nbsp;
            <Link className="text-tertiary-default underline" href="/">
              Voltar para Home
            </Link>
          </p>
          <p className="max-w-2xl text-body-1 text-primary-400">
            Se você acredita que isso é um erro ou se precisar de assistência,
            &nbsp;
            <a
              href="#"
              target="_self"
              className="text-tertiary-default underline"
            >
              entre em contato conosco.
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
