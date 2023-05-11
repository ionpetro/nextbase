
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
import PageHeadingWithActions from '@/components/ui/Headings/PageHeadingWithActions';
import { BsPlusLg } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { Button } from '@/components/ui/Button';
import { TeamGraphs } from '../TeamGraphs';
import HelpCard from '@/components/ui/Card/HelpCard';
import organisationshelp from "public/assets/help-assets/organisations-teams.png";
import teamsprojects from "public/assets/help-assets/teams-projects.png";

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
        <div className="space-y-10">
          <div className="space-x-6">
            <span className="text-base py-2 font-[600] text-slate-500">
              <Anchor href="/dashboard">Dashboard</Anchor>
            </span>
            <span className="text-base  py-2 font-[600] text-slate-500">/</span>
            <span className="text-base py-2 font-[600] text-slate-500">
              <Anchor href={`/organization/${organizationByIdData.id}`}>{
                organizationByIdData.title}</Anchor>
            </span>
            <span className="text-base  py-2 font-[600] text-slate-500">/</span>
            <span className="text-base py-2 bg-blue-50 rounded-lg px-4 font-[700] text-blue-600">
              {teamByIdData.name}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <PageHeadingWithActions
            heading={teamByIdData.name}
            subheading="Manage your team and projects here."
          >
            <div className="mt-3 text-gray-400 text-3xl space-x-2">
              <Button>
                <BsPlusLg className="text-white mr-2" />
                Create Project
              </Button>
              <Button variant={"outline"}>
                <IoMdSettings className="text-slate-600 mr-2" />
                View Team Settings
              </Button>
            </div>
          </PageHeadingWithActions>
          <TeamClientLayout>
            <div>{children}</div>
          </TeamClientLayout>
        </div>
        <TeamGraphs />
        {/* Help Cards */}
        <div className="grid grid-cols-2 space-x-6 w-full">
          <HelpCard
            heading="Teams within Organisations"
            subheading="Without Organisations you can't make Teams"
            image={organisationshelp}
          />

          <HelpCard
            heading="Projects within Teams"
            subheading="Build Projects within Teams and Organisations"
            image={teamsprojects}
          />
        </div>
      </div>
    </TeamContextProvider>
  );
}
