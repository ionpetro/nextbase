import { useGetIsAppInMaintenanceMode } from '@/utils/react-query-hooks';
import { createContext, useContext } from 'react';

export const MaintenanceModeContext = createContext<boolean>(false);

export function useMaintenanceMode() {
  return useContext(MaintenanceModeContext);
}

export function MaintenanceModeContextProvider({
  children,
  initialIsAppInMaintenanceMode,
}: {
  children: React.ReactNode;
  initialIsAppInMaintenanceMode: boolean;
}) {
  const { data: _isInMaintenanceMode } = useGetIsAppInMaintenanceMode(
    initialIsAppInMaintenanceMode
  );
  // THIS is a hack to bypass the ts error as
  // the _isInMaintenanceMode is never null since there is an initial value
  const isInMaintenanceMode =
    _isInMaintenanceMode ?? initialIsAppInMaintenanceMode;
  return (
    <MaintenanceModeContext.Provider value={isInMaintenanceMode}>
      {children}
    </MaintenanceModeContext.Provider>
  );
}
