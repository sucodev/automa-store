'use client';

import { DataTable } from '@/components/table/DataTable';
import { useProductColumns } from '@/hooks/use-product-columns';
import { useProductStore } from '@/store/productStore';
import { useEffect } from 'react';
import { TableToolbar } from '@/components/table/TableToolbar';
import { Product } from '@/interface/Product';
import { TablePagination } from '@/components/table/TablePagination';
import { AddProductDialog } from '@/components/dialog/AddProductDialog';
import { UpdateProductDialog } from '@/components/dialog/UpdateProductDialog';
import { DeleteProductDialog } from '@/components/dialog/DeleteProductDialog';

export function ProductTable({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const {
    products,
    setProducts,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
  } = useProductStore();

  const columns = useProductColumns();

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts, setProducts]);

  return (
    <>
      <div className="space-y-4">
        <TableToolbar />
        <DataTable
          columns={columns}
          data={products}
          state={{
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
          }}
          onSortingChange={setSorting}
          onColumnFiltersChange={setColumnFilters}
          onColumnVisibilityChange={setColumnVisibility}
          onRowSelectionChange={setRowSelection}
        />
        <TablePagination />
      </div>
      <AddProductDialog />
      <UpdateProductDialog />
      <DeleteProductDialog />
    </>
  );
}
