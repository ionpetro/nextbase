import { T } from "@/components/ui/Typography";
import { cn } from "@/utils/cn";
import { BadgeDelta } from "@tremor/react";

type GraphContainerProps = {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  classname?: string;
  badgeValue?: string;
};

const getDeltaType = (percentage: string): string => {
  const percentageValue = Number.parseFloat(percentage.replace("%", ""));
  if (percentageValue <= -50) {
    return "decrease";
  } if (-50 < percentageValue && percentageValue < 0) {
    return "moderateDecrease";
  } if (percentageValue === 0) {
    return "unchanged";
  } if (0 < percentageValue && percentageValue <= 50) {
    return "moderateIncrease";
  }
  return "increase";
};

export function GraphContainer({
  title,
  subTitle,
  children,
  classname,
  badgeValue,
}: GraphContainerProps) {
  return (
    <div className={cn("overflow-hidden", classname)}>
      <div className="px-[18px] flex justify-between py-4 w-full ">
        <div className="">
          <T.H4 >{title}</T.H4>
          <T.P >{subTitle}</T.P>
        </div>
        {badgeValue && (
          <BadgeDelta
            deltaType={getDeltaType(badgeValue)}
            size="xs"
            className="h-fit"
          >
            {badgeValue}
          </BadgeDelta>
        )}
      </div>
      <div className="px-5 pb-6 h-full ">
        <div className="h-full ">{children}</div>
      </div>
    </div>
  );
}
