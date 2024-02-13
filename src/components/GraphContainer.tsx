import { T } from '@/components/ui/Typography';
import { cn } from '@/utils/cn';

type GraphContainerProps = {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  classname?: string;
};

export function GraphContainer({
  title,
  subTitle,
  children,
  classname,
}: GraphContainerProps) {
  return (
    <div className={cn('border rounded-xl overflow-hidden', classname)}>
      <div className="px-[18px] py-4 w-full ">
        <T.H4 className="mt-0 text-base">{title}</T.H4>
        <T.Subtle className="text-base">{subTitle}</T.Subtle>
      </div>
      <div className="px-5 py-3 h-full ">
        <div className="h-full ">{children}</div>
      </div>
    </div>
  );
}
