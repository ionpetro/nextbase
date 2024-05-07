import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <div className="flex items-start space-y-4 p-4 w-full">
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-full h-12" />
    <Skeleton className="w-full h-12" />
  </div>
}
