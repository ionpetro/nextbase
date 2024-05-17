import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div>
      <Skeleton className="w-2/3 h-6" />
      <Skeleton className="w-2/3 h-6" />
    </div>
  );
}
