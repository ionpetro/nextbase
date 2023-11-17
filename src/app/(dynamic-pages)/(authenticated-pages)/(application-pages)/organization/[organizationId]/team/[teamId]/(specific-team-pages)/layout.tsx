import { ReactNode, Suspense } from 'react';
import { z } from 'zod';
import { Anchor } from '@/components/Anchor';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import { ApplicationLayoutShell } from '@/components/ApplicationLayoutShell';
import { TeamSidebar } from '@/app/(dynamic-pages)/(authenticated-pages)/_sidebar/TeamSidebar';
import { InternalNavbar } from '@/components/ui/NavigationMenu/InternalNavbar';

const paramsSchema = z.object({
  teamId: z.coerce.number(),
  organizationId: z.string(),
});

export default async function Layout({
  children,
  params,
  navbar,
}: {
  children: ReactNode;

  navbar: ReactNode;
} & {
  params: {
    teamId: string;
  };
}) {
  const parsedParams = paramsSchema.parse(params);
  const { teamId, organizationId } = parsedParams;
  return (
    <ApplicationLayoutShell sidebar={<TeamSidebar teamId={teamId} />}>
      <div>
        <InternalNavbar>
          <div className="flex w-full justify-between items-center">
            <Suspense>{navbar}</Suspense>
            <div className="flex items-center space-x-2">
              <Anchor
                href={`/organization/${organizationId}/team/${teamId}/settings`}
              >
                <span className="space-x-2 flex items-center">
                  <SettingsIcon />
                </span>
              </Anchor>
            </div>
          </div>
        </InternalNavbar>
        <div className="relative flex-1 h-auto mt-8 w-full overflow-auto">
          <div className="px-6  pr-12 space-y-6 pb-10">{children}</div>
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
