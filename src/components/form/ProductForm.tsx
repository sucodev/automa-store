'use client';

import { useForm } from 'react-hook-form';
import { Product } from '@/interface/Product';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ReactNode, useEffect } from 'react';

interface ProductFormProps {
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  initialData?: Product;
  buttonText: ReactNode;
}

export function ProductForm({
  onSubmit,
  initialData,
  buttonText,
}: ProductFormProps) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {
      name: '',
      description: '',
      price: 0,
      stock: 0,
    },
  });

  const handleFormSubmit = (data: Product) => {
    const formattedData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    };
    onSubmit(formattedData);
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        name: '',
        description: '',
        price: 0,
        stock: 0,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 p-4">
      <div>
        <Label>Nome</Label>
        <Input {...register('name')} required />
      </div>
      <div>
        <Label>Descrição</Label>
        <Input {...register('description')} required />
      </div>
      <div>
        <Label>Preço</Label>
        <Input
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          required
        />
      </div>
      <div>
        <Label>Estoque</Label>
        <Input
          type="number"
          {...register('stock', { valueAsNumber: true })}
          required
        />
      </div>
      <Button className="w-full bg-black h-12 hover:bg-black/80" type="submit">
        {buttonText}
      </Button>
    </form>
  );
}
