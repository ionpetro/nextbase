import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';

export default function NavbarLoading() {
  return (
    <div className={cn('hidden lg:block', 'relative ')}>
      <T.Subtle>Loading...</T.Subtle>
    </div>
  );
}
