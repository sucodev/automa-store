'use client';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useProductStore } from '@/store/productStore';

export function TableViewOptions() {
  const { columnVisibility, setColumnVisibility } = useProductStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Colunas <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(columnVisibility).map(([columnId, isVisible]) => (
          <DropdownMenuCheckboxItem
            key={columnId}
            checked={isVisible}
            onCheckedChange={value =>
              setColumnVisibility({
                ...columnVisibility,
                [columnId]: value,
              })
            }
          >
            {columnId}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
