import { ReactNode } from 'react';
import { z } from 'zod';
import { TeamContextProvider } from '@/contexts/TeamContext';
import { getTeamById, getUserTeamRole } from '@/utils/supabase/teams';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import moment from 'moment';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { Anchor } from '@/components/Anchor';
import { Button } from '@/components/ui/Button';
import SettingsIcon from 'lucide-react/dist/esm/icons/settings';
import { T } from '@/components/ui/Typography';

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
    getUserTeamRole(supabaseClient, data.session.user.id, teamId),
  ]);

  return (
    <div>
      <div className="space-y-8">
        <PageHeading
          title={teamByIdData.name}
          actions={
            <div className=" text-gray-400 flex items-start text-3xl gap-x-2 space-x-2">
              <div className="flex flex-col space-y-1 ml-4 items-end">
                <Anchor
                  href={`/organization/${organizationId}/team//${teamId}/settings`}
                >
                  <Button variant={'outline'}>
                    <SettingsIcon className="text-gray-600 mr-2" />
                    View Team Settings
                  </Button>
                </Anchor>
                <T.Subtle>
                  Created {moment(teamByIdData.created_at).fromNow()}
                </T.Subtle>
              </div>
            </div>
          }
        />
        {children}
      </div>
    </div>
  );
}
