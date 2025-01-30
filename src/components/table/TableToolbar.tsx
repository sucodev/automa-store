'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/productStore';
import { Plus } from 'lucide-react';

export function TableToolbar() {
  const { columnFilters, setColumnFilters, setIsAddDialogOpen } =
    useProductStore();

  const filterValue = columnFilters.find(f => f.id === 'name')?.value || '';

  const handleFilterChange = (value: string) => {
    setColumnFilters([
      ...columnFilters.filter(f => f.id !== 'name'),
      { id: 'name', value },
    ]);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <Input
          placeholder="Filtrar produtos..."
          value={filterValue as string}
          onChange={e => handleFilterChange(e.target.value)}
          className="w-full md:max-w-sm"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <Button
          className="w-full md:w-auto bg-black hover:bg-black/80"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>
    </div>
  );
}
