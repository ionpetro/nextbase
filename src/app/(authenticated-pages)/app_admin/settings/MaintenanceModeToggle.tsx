'use client';
import H3 from '@/components/presentational/tailwind/Text/H3';
import { useMaintenanceMode } from '@/contexts/MaintenanceModeContext';
import { classNames } from '@/utils/classNames';
import { Switch } from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';

export function MaintenanceModeToggle({
  enableMaintenanceModeAction,
  disableMaintenanceModeAction,
  isAppInMaintenanceMode,
}: {
  isAppInMaintenanceMode: boolean;
  enableMaintenanceModeAction: () => Promise<void>;
  disableMaintenanceModeAction: () => Promise<void>;
}) {
  const enableToastRef = useRef<string | null>(null);
  const disableToastRef = useRef<string | null>(null);
  const router = useRouter();
  const { mutate: enableMaintenanceModeMutation, isLoading: isEnabling } =
    useMutation(
      async () => {
        enableMaintenanceModeAction();
      },
      {
        onMutate: () => {
          const toastId = toast.loading('Enabling maintenance mode...');
          enableToastRef.current = toastId;
        },
        onSuccess: () => {
          toast.success('App is now in maintenance mode', {
            id: enableToastRef.current ?? undefined,
          });
          enableToastRef.current = null;
          router.refresh();
        },
        onError: (error) => {
          toast.error('Failed to set app maintenance mode', {
            id: enableToastRef.current ?? undefined,
          });
          enableToastRef.current = null;
        },
        cacheTime: 0,
      }
    );
  const { mutate: disableMaintenanceModeMutation, isLoading: isDisabling } =
    useMutation(
      async () => {
        disableMaintenanceModeAction();
      },
      {
        onMutate: () => {
          const toastId = toast.loading('Disabling maintenance mode...');
          disableToastRef.current = toastId;
        },
        onSuccess: () => {
          toast.success('App is no longer in maintenance mode', {
            id: disableToastRef.current ?? undefined,
          });
          disableToastRef.current = null;
          router.refresh();
        },
        onError: (error) => {
          toast.error('Failed to set app maintenance mode', {
            id: disableToastRef.current ?? undefined,
          });
          disableToastRef.current = null;
        },
        cacheTime: 0,
      }
    );

  const toggleMaintenanceMode = async (checked: boolean) => {
    if (checked) {
      return enableMaintenanceModeMutation();
    }
    return disableMaintenanceModeMutation();
  };

  return (
    <div className="flex space-x-4">
      <div className="space-y-4">
        <div className="space-y-2 max-w-xl">
          <H3>Maintenance mode</H3>
          <p className="text-gray-500 text-sm">
            You can put your site into maintenance mode here. This will show a
            maintenance page to all logged in users. You can modify the message
            shown in the{' '}
            <span className="bg-gray-200 text-gray-700 p-0.5 rounded">
              MaintenanceModeBanner
            </span>{' '}
            component.
          </p>
        </div>
      </div>
      <Switch.Group as="div" className="flex items-center">
        <Switch
          disabled={isEnabling || isDisabling}
          checked={isAppInMaintenanceMode}
          onChange={toggleMaintenanceMode}
          className={classNames(
            isAppInMaintenanceMode ? 'bg-green-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              isAppInMaintenanceMode ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
      </Switch.Group>
    </div>
  );
}
