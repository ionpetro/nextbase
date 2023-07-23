import { ReactNode } from 'react';
import { z } from 'zod';
import { TeamContextProvider } from '@/contexts/TeamContext';
import { getTeamById, getUserTeamRole } from '@/utils/supabase/teams';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';

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
  const supabaseClient = createSupabaseUserServerComponentClient();
  const parsedParams = paramsSchema.parse(params);
  const { teamId, organizationId } = parsedParams;
  const { data } = await supabaseClient.auth.getSession();
  if (!data?.session?.user.id) {
    return <p>Not logged in</p>;
  }

  const [teamByIdData, teamRole] = await Promise.all([
    getTeamById(supabaseClient, teamId),
    getUserTeamRole(
      supabaseClient,
      data.session.user.id,
      teamId
    ),
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
