import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

type TableCellProps = {
  children: React.ReactNode;
  className: string;
};

export default function TableCell({ children, className }: TableCellProps) {
  return (
    <div
      className={cn(
        `flex hover:bg-slate-50 border border-r-1 border-b-1 group h-[59px] border-slate-200 text-black`,
        className
      )}
    >
      {children}
    </div>
  );
}
