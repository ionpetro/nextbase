'use client';
import { SidebarVisibilityContext } from '@/contexts/SidebarVisibilityContext';
import { setSidebarVisibility } from '@/data/user/ui';
import { cn } from '@/utils/cn';
import { useMutation } from '@tanstack/react-query';
import { PanelLeftClose } from 'lucide-react';
import { useContext } from 'react';
import { toast } from 'sonner';

export function SidebarClose() {
  const { setVisibility: setVisibilityContextValue } = useContext(
    SidebarVisibilityContext,
  );
  const { mutate } = useMutation(setSidebarVisibility, {
    onError: (error) => {
      console.log(error);
      toast.error('An error occurred.');
    },
  });
  function closeSidebar() {
    mutate(false);
    setVisibilityContextValue(false);
  }
  return (
    <div
      className={cn(
        'group border cursor-pointer flex items-center p-3 hover:bg-neutral-50 dark:hover:bg-white/5 rounded-md',
        'hidden lg:block',
      )}
      onClick={closeSidebar}
    >
      <PanelLeftClose className="h-4 w-4 text-neutral-500 group-hover:text-neutral-700 dark:text-slate-400 group-hover:dark:text-slate-300" />
    </div>
  );
}
