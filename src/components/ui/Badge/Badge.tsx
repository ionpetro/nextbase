import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full px-3 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-slate-100 dark:bg-slate-500/20 hover:bg-slate-200/30 hover:dark:bg-slate-500/30',
        success:
          'bg-green-100 dark:bg-green-600/10 group-hover:bg-green-100 text-green-900 dark:text-green-500',
        information:
          'bg-blue-100 dark:bg-blue-600/10 group-hover:bg-blue-100 text-blue-900 dark:text-blue-500',
        danger:
          'bg-rose-100 dark:bg-rose-600/10 group-hover:bg-rose-100 text-rose-900 dark:text-rose-500',
        warning:
          'bg-amber-100 dark:bg-amber-600/10 group-hover:bg-amber-100 text-amber-900 dark:text-amber-500',
        discussion:
          'bg-purple-100 dark:bg-purple-500/10 hover:dark:bg-purple-500/20 hover:bg-purple-200 text-purple-900 dark:text-purple-500',
        sky: 'bg-sky-100 dark:bg-sky-500/10 hover:dark:bg-sky-500/20 hover:bg-sky-100 text-sky-900 dark:text-sky-500',
        indigo:
          'bg-indigo-100 dark:bg-indigo-600/10 hover:dark:bg-indigo-500/20 hover:bg-indigo-200/20 text-indigo-900 dark:text-indigo-500',
        outline: 'text-foreground',
        soliddefault: 'bg-slate-700 text-white group-hover:bg-slate-500',
        solidSuccess: 'bg-green-700 text-white group-hover:bg-green-500',
        solidInformation: 'bg-blue-700 text-white group-hover:bg-blue-500',
        solidDanger: 'bg-rose-700 text-white group-hover:bg-rose-500',
        solidWarning: 'bg-amber-700 text-white group-hover:bg-amber-500',
        solidDiscussion: 'bg-purple-700 text-white group-hover:bg-purple-500',
        solidSky: 'bg-sky-700 text-white group-hover:bg-sky-500',
        solidIndigo: 'bg-indigo-700 text-white group-hover:bg-indigo-500',
      },
      size: {
        default: 'h-10 py-3 px-4',
        sm: 'h-8 px-3 rounded-lg',
        lg: 'h-11 px-8 rounded-md',
        link: 'p-0',
        xs: 'h-7 px-3 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
