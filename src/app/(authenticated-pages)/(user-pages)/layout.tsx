import { cn } from '@/utils/cn';
import Link from 'next/link';
import { ReactNode } from 'react';
import InternalNavbar from '@/components/ui/NavigationMenu/InternalNavbar';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className=" flex-1 h-auto w-full overflow-auto">
      <InternalNavbar />
      <div className="px-12 space-y-10">{children}</div>
    </div>
  );
}
