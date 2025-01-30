'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ProductForm } from '@/components/form/ProductForm';
import { useProductStore } from '@/store/productStore';
import { Product } from '@/interface/Product';
import { PlusCircle } from 'lucide-react';

export function AddProductDialog() {
  const { isAddDialogOpen, setIsAddDialogOpen, addProduct } = useProductStore();

  const handleSubmit = (product: Omit<Product, 'id' | 'createdAt'>) => {
    addProduct(product);
    setIsAddDialogOpen(false);
  };

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Adicionar Novo Produto</DialogTitle>
        <ProductForm
          onSubmit={handleSubmit}
          buttonText={
            <span className="flex items-center gap-2">
              <PlusCircle />
              Cadastrar Produto
            </span>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
