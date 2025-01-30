'use client';

import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/productStore';

export function TablePagination() {
  const { table, rowSelection } = useProductStore();

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {Object.keys(rowSelection).length} de{' '}
        {table?.getFilteredRowModel().rows.length} produto(s) selecionados
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table?.previousPage()}
          disabled={!table?.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table?.nextPage()}
          disabled={!table?.getCanNextPage()}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
