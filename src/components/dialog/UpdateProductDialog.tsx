'use client';

import { useProductStore } from '@/store/productStore';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ProductForm } from '@/components/form/ProductForm';
import { EditIcon } from 'lucide-react';

export function UpdateProductDialog() {
  const {
    isUpdateDialogOpen,
    setIsUpdateDialogOpen,
    productToUpdate,
    updateProduct,
    setProductToUpdate,
  } = useProductStore();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setProductToUpdate(null);
    }
    setIsUpdateDialogOpen(open);
  };

  return (
    <Dialog open={isUpdateDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Editar Produto</DialogTitle>
        {productToUpdate && (
          <ProductForm
            key={productToUpdate.id}
            onSubmit={data => {
              updateProduct(productToUpdate.id, data);
              setIsUpdateDialogOpen(false);
            }}
            initialData={productToUpdate}
            buttonText={
              <span className="flex items-center gap-2">
                <EditIcon />
                Editar Produto
              </span>
            }
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
