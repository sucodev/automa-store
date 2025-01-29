import { Skeleton } from '../ui/skeleton';

export function SkeletonCard() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
      {Array.from({ length: 7 }).map((_, index) => (
        <li key={index} className="w-full flex flex-col items-center">
          <Skeleton className="h-[125px] w-full sm:w-[250px] rounded-xl bg-gray-200" />
          <div className="space-y-2 mt-4 w-full sm:w-[250px]">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-[80%] bg-gray-200" />
          </div>
        </li>
      ))}
    </ul>
  );
}
