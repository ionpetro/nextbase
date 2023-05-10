'use client';
import { Anchor } from '@/components/Anchor';
import { LoadingSpinner } from '@/components/presentational/tailwind/LoadingSpinner';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading/PageHeading';
import Overline from '@/components/presentational/tailwind/Text/Overline';
import { classNames } from '@/utils/classNames';
import {
  OrganizationByIdData,
  useCreateTeamMutation,
  useGetOrganizationById,
} from '@/utils/react-query-hooks';
import moment from 'moment';
import { notFound, usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { ReactNode } from 'react';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';
import { VscSettings } from 'react-icons/vsc';
import { Button } from '@/components/ui/Button'
import { CreateTeamDialog } from '@/components/presentational/tailwind/CreateTeamDialog';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useOrganizationContext } from '@/contexts/OrganizationContext';
const matchSettingsPath = match('/organization/:organizationId/settings/(.*)?');

export function SpecificOrganizationClientLayout({
  children,
  initialOrganizationByIdData,
}: {
  children: ReactNode;
  initialOrganizationByIdData: OrganizationByIdData;
}) {
  const pathname = usePathname();
  const isSettingsPath = pathname ? matchSettingsPath(pathname) : false;
  const { organizationId } = useOrganizationContext();
  const { data: _data, isLoading, error } = useGetOrganizationById(
    organizationId,
    initialOrganizationByIdData
  );
  // This is a hack to bypass typescript error
  // as _data will never be undefined since we are passing initial data
  const data = _data ?? initialOrganizationByIdData;


  const router = useRouter();
  const { mutate, isLoading: isCreatingTeam } = useCreateTeamMutation({
    onSuccess: (team) => {
      router.push(`/organization/${organizationId}/team/${team.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    organizationId: organizationId,
  });

  const onConfirm = (teamName: string) => {
    mutate({
      name: teamName,
      organizationId
    });
  };

  if (error) return notFound();

  if (isLoading)
    return (
      <div>
        <LoadingSpinner className="text-blue-500" />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="space-y-0">
        <div>
          {isSettingsPath ? (
            <Anchor
              href={`/organization/${organizationId}`}
              className="text-blue-800 space-x-2 flex items-center"
            >
              <FiArrowLeft className="relative -top-0.5" />
              <Overline className="text-blue-800">
                Back to Organization
              </Overline>
            </Anchor>
          ) : (
            <Overline className="text-blue-800">Organization</Overline>
          )}
        </div>
        <PageHeading
          title={data.title}
          titleHref={`/organization/${organizationId}`}
          actions={
            <div className="flex items-end space-y-1 space-x-2">
              <div className="mb-5">
                <CreateTeamDialog isLoading={isCreatingTeam} onConfirm={onConfirm} />
              </div>
              <div className='flex flex-col space-y-1 items-end'>
                <Anchor
                  href={`/organization/${organizationId}/settings`}
                >
                  <Button variant='outline'>
                    <VscSettings />
                    <span className="text-sm">View Organization Settings</span>
                  </Button>
                </Anchor>
                <span className="text-xs text-gray-500">
                  Created {moment(data.created_at).fromNow()}
                </span>
              </div>
            </div>
          }
        />
      </div>
      <div>{children}</div>
    </div>
  );
}
