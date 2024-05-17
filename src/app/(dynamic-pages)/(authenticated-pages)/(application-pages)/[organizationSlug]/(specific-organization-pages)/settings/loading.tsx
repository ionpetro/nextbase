import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  new Promise(() => setTimeout(() => { }, 20000));
  return (
    <Skeleton className="w-16 h-6" />
  );
}
