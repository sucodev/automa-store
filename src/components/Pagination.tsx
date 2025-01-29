import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface Props {
  currentPage: number;
  totalPages: number;
  handlePageChange: (currentPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
}: Props) {
  return (
    <PaginationShadcn className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={cn(
              currentPage === 1 && 'pointer-events-none text-gray-400',
            )}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index + 1}>
            <PaginationLink
              onClick={() => handlePageChange(index + 1)}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={cn(
              currentPage === totalPages && 'pointer-events-none text-gray-400',
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationShadcn>
  );
}
