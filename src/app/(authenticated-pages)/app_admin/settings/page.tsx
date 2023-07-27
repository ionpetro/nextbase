import { disableMaintenanceModeAction, enableMaintenanceModeAction, getIsAppInMaintenanceModeAction } from './actions';
import { MaintenanceModeToggle } from './MaintenanceModeToggle';

export default async function AdminPanel() {
  const isAppInMaintenanceMode = await getIsAppInMaintenanceModeAction();
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 max-w-xl italic">
        Create your own SAAS specific administrator components here if you like.
        You can build components similar to Retool and make them available to
        your administrators to quickly act and solve issues for your users.
      </p>
      <div>
        <MaintenanceModeToggle
          isAppInMaintenanceMode={isAppInMaintenanceMode}
          enableMaintenanceModeAction={enableMaintenanceModeAction}
          disableMaintenanceModeAction={disableMaintenanceModeAction}
        />
      </div>
    </div>
  );
}
