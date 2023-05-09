'use client';
import { useGetIsAppInMaintenanceMode } from '@/utils/react-query-hooks';
import { BsWrenchAdjustable } from 'react-icons/bs';

export function MaintenanceModeBanner({
  initialIsAppInMaintenanceMode,
}: {
  initialIsAppInMaintenanceMode: boolean;
}) {
  const { data: isAppInMaintenanceMode } = useGetIsAppInMaintenanceMode(
    initialIsAppInMaintenanceMode
  );

  if (!isAppInMaintenanceMode) {
    return null;
  }
  return (
    <div className="flex-auto flex-grow-0 select-none bg-purple-500 text-white px-10 p-3 text-lg text-center flex items-center space-x-4 justify-center">
      <BsWrenchAdjustable className="text-white" />
      <span className="font-[600]">
        The App is currently in maintenance mode and is read-only. Please check
        back later.
      </span>
      <BsWrenchAdjustable className="text-white" />
    </div>
  );
}
