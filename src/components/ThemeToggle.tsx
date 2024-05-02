'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LucideIcon } from './LucideIcon';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="focus:ring-none hover:bg-transparent focus:ring-0"
      >
        <Button
          variant="ghost"
          size="sm"
          className="px-0 w-5 h-5 text-muted-foreground focus:ring-0"
        >
          <LucideIcon name="Sun" className="hover:text-black transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <LucideIcon name="Moon" className="absolute dark:hover:text-white transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-black">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <LucideIcon name="Sun" className="mr-2 w-4 h-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <LucideIcon name="Moon" className="mr-2 w-4 h-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <LucideIcon name="Laptop" className="mr-2 w-4 h-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
