import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';

export default function UserNavbarHome() {
  return (
    <div className={cn('hidden lg:block', 'relative ')}>
      <T.P>User settings</T.P>
    </div>
  );
}
