'use client';
import {
  Button as TailwindButton,
  ButtonProps as TailwindButtonProps,
} from '@/components/ui/button';
import { useMaintenanceMode } from '@/contexts/MaintenanceModeContext';
import { Tooltip } from 'react-tooltip';

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
    const wrapperId = `${props.id}-wrapper`;
    return (
      <>
        <div id={wrapperId}>{buttonElement}</div>
        <Tooltip anchorId={wrapperId}>
          <p>The App is currently in maintenance mode. </p>
          <p>Please check back later.</p>
        </Tooltip>
      </>
    );
  }
  return buttonElement;
}
