'use client';
import {
  Button as TailwindButton,
  ButtonProps as TailwindButtonProps,
} from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMaintenanceMode } from '@/contexts/MaintenanceModeContext';

export function Button({
  className: classNameProp,
  disabled: disabledProp,
  ...props
}: TailwindButtonProps) {
  const isInMaintenanceMode = useMaintenanceMode();
  const disabled = isInMaintenanceMode || disabledProp;
  const className = isInMaintenanceMode
    ? `${classNameProp} cursor-not-allowed `
    : classNameProp;

  const buttonElement = (
    <TailwindButton
      disabled={disabled}
      className={className}
      {...props}
    ></TailwindButton>
  );
  if (isInMaintenanceMode) {
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
            <TooltipContent>
              <p>The App is currently in maintenance mode. </p>
              <p>Please check back later.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </>
    );
  }
  return buttonElement;
}
