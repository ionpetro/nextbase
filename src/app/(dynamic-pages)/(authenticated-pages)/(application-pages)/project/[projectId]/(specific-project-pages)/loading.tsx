import { T } from '@/components/ui/Typography';

export default function Loading() {
  return (
    <div className="flex overflow-y-auto flex-col h-full w-full">
      <T.Subtle>Loading...</T.Subtle>
    </div>
  );
}
