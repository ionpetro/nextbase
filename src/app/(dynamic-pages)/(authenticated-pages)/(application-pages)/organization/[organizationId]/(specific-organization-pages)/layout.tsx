import { ReactNode, Suspense } from 'react';
import { z } from 'zod';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell/ApplicationLayoutShell';
import { OrganizationSidebar } from '../../../_sidebar/OrganizationSidebar';
import { getOrganizationTitle } from '@/data/user/organizations';
import { InternalNavbar } from '@/components/ui/NavigationMenu/InternalNavbar';
import { Anchor } from '@/components/Anchor';

import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import TeamsIcon from 'lucide-react/dist/esm/icons/users';
import { SimpleDialog } from '@/components/SimpleDialog';
import { OrganizationTeams } from './OrganizationTeams';
import { Button } from '@/components/ui/Button';

const paramsSchema = z.object({
  organizationId: z.string(),
});

export default async function Layout({
  children,
  params,
  navbar,
}: {
  children: ReactNode;
  params: unknown;
  navbar: ReactNode;
}) {
  const { organizationId } = paramsSchema.parse(params);
  return (
    <ApplicationLayoutShell
      sidebar={<OrganizationSidebar currentOrganizationId={organizationId} />}
    >
      <div>
        <InternalNavbar>
          <div className="flex w-full justify-between items-center">
            {navbar}

            <div className="flex items-center space-x-2">
              <Suspense>
                <SimpleDialog
                  trigger={
                    <Button
                      size="xs"
                      variant="infoLink"
                      className="space-x-2 flex items-center"
                    >
                      <TeamsIcon />
                    </Button>
                  }
                >
                  <OrganizationTeams organizationId={organizationId} />
                </SimpleDialog>
              </Suspense>
              <Anchor href={`/organization/${organizationId}/settings`}>
                <span className="space-x-2 flex items-center">
                  <SettingsIcon />
                </span>
              </Anchor>
            </div>
          </div>
        </InternalNavbar>
        <div className="relative flex-1 h-auto mt-8 w-full overflow-auto">
          <div className="px-12 space-y-6 pb-10">{children}</div>
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
