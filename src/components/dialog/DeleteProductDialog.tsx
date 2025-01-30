'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/productStore';

export function DeleteProductDialog() {
  const {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    productToDelete,
    deleteProduct,
  } = useProductStore();

  const handleDeleteProduct = (productId: number) => {
    deleteProduct(productId);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Tem certeza que deseja excluir este produto permanentemente?
          </p>
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                productToDelete && handleDeleteProduct(productToDelete)
              }
            >
              Confirmar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
