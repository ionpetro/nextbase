import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return <div className="flex items-start space-y-4 p-4 w-1/4">
    <div className='flex flex-col space-y-4 p-4'>
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
    </div>
    <div className='flex flex-col space-y-4 p-4 w-3/4'>
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
    </div>
  </div>
}
