
import { ReactNode } from 'react';
import createClient from '@/utils/supabase-server';
import { z } from 'zod';
import { T } from '@/components/ui/Typography';
import Overline from '@/components/presentational/tailwind/Text/Overline';
import { TeamClientLayout } from './TeamClientLayout';
import { Anchor } from '@/components/Anchor';
import { ArrowLeft } from 'lucide-react';
import { TeamContextProvider } from '@/contexts/TeamContext';
import { getOrganizationById } from '@/utils/supabase/organizations';
import { getProjectTeamById, getUserTeamRole } from '@/utils/supabase/teams';

const paramsSchema = z.object({
  teamId: z.coerce.number(),
  organizationId: z.string(),
});

export default async function Layout({
  children,
  params,
}: { children: ReactNode } & {
  params: {
    teamId: string;
  };
}) {
  const parsedParams = paramsSchema.parse(params);
  const { teamId, organizationId } = parsedParams;
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  if (!data?.session?.user.id) {
    return <p>Not logged in</p>;
  }

  const [organizationByIdData, teamByIdData, teamRole] = await Promise.all([
    getOrganizationById(supabase, organizationId),
    getProjectTeamById(supabase, teamId),
    getUserTeamRole(supabase, data.session.user.id, teamId),
  ]);

  return (
    <TeamContextProvider teamId={teamId} teamRole={teamRole}>
      <div className="space-y-8 pt-4 max-w-7xl px-8">
        <div className="flex gap-1 items-center">
          <ArrowLeft size="12" />
          <T.Subtle>
            <Anchor
              className="underline"
              href={`/organization/${organizationByIdData.id}`}
            >
              Back to {organizationByIdData.title}
            </Anchor>
          </T.Subtle>
        </div>
        <div className="space-y-2">
          <Overline>Team</Overline>
          <T.H1>{teamByIdData.name}</T.H1>
          <TeamClientLayout>
            <div>{children}</div>
          </TeamClientLayout>
        </div>
      </div>
    </TeamContextProvider>
  );
}
