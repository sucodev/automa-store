import { Product } from '@/interface/Product';
import { cn } from '@/lib/utils';
import { ShoppingBagIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

interface Props {
  product: Product;
  handleAddToCart: (product: Product) => void;
}

export default function Item({ product, handleAddToCart }: Props) {
  return (
    <li
      key={product.id}
      className={cn(
        'min-h-auto p-4 bg-purple-200 rounded-lg border-2 border-black flex flex-col',
        product.stock === 0 && 'bg-purple-100 opacity-70',
      )}
    >
      <div className="relative w-full h-40 mb-4">
        <Image
          className="border-2 border-black rounded-lg"
          layout="fill"
          objectFit="cover"
          src="/100x80.svg"
          alt={product.name}
        />
      </div>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <span className="text-sm">R$ {product.price.toFixed(2)}</span>
      <span className="text-sm">Estoque: {product.stock}</span>
      <p className="text-sm font-thin">{product.description}</p>

      <div className="mt-4">
        <Button
          className={cn(
            product.stock === 0 && 'pointer-events-none',
            'w-full bg-black font-bold hover:bg-black/80',
          )}
          onClick={() => handleAddToCart(product)}
          disabled={product.stock === 0}
        >
          <ShoppingBagIcon className="mr-2" />
          {product.stock === 0 ? 'Fora de estoque' : 'Adicionar ao carrinho'}
        </Button>
      </div>
    </li>
  );
}
