import { ReactNode } from 'react';
import createClient from '@/utils/supabase-server';
import { z } from 'zod';
import { TeamContextProvider } from '@/contexts/TeamContext';
import { getTeamById, getUserTeamRole } from '@/utils/supabase/teams';

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

  const [teamByIdData, teamRole] = await Promise.all([
    getTeamById(supabase, teamId),
    getUserTeamRole(supabase, data.session.user.id, teamId),
  ]);

  return (
    <TeamContextProvider
      teamByIdData={teamByIdData}
      teamId={teamId}
      teamRole={teamRole}
    >
      {children}
    </TeamContextProvider>
  );
}
