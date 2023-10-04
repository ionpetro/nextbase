import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getAllOrganizationsForUser } from '@/utils/supabase/organizations';
import { z } from 'zod';
import { SidebarClientComponents } from './SidebarClientComponents';
import { AppSupabaseClient } from '@/types';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { getTeamsInOrganization } from '@/utils/supabase/teams';
import { unstable_cache } from 'next/cache';
import { cacheTags } from '@/utils/nextCache';
import { cookies } from 'next/headers';
import setCurrentOrganizationIdAction from '@/app/(dynamic-pages)/(authenticated-pages)/actions';

const paramsSchema = z.object({
    organizationId: z.string(),
});

async function fetchData(supabaseClient: AppSupabaseClient, authUser: User) {
    const [initialOrganizationsList] = await Promise.all([
        getAllOrganizationsForUser(supabaseClient, authUser.id),
    ]);
    return { initialOrganizationsList };
}

export default async function OrganizationSidebar({
    params,
}: {
    params: unknown;
}) {
    const supabaseClient = createSupabaseUserServerComponentClient();
    const { organizationId } = paramsSchema.parse(params);
    const { data, error } = await supabaseClient.auth.getUser();

    const fetchTeams = unstable_cache(
        async () => {
            'use server';
            return await getTeamsInOrganization(
                createSupabaseUserServerComponentClient(),
                organizationId,
            );
        },
        [cacheTags.teamsInOrganization(organizationId)],
        {
            tags: [cacheTags.teamsInOrganization(organizationId)],
        },
    );

    const currentOrganizationId = cookies().get('current_organization_id')?.value;

    const { initialOrganizationsList } = await fetchData(
        supabaseClient,
        data.user as User,
    );

    if (!data.user) {
        // This is unreachable because the user is authenticated
        // But we need to check for it anyway for TypeScript.
        return redirect('/login');
    } else if (error) {
        return <p>Error: An error occurred.</p>;
    }

    const teams = await fetchTeams();
    return (
        <div className="relative transition-all h-screen bg-white dark:bg-slate-900 space-y-5 px-2 border-r flex flex-col">
            <SidebarClientComponents
                organizationId={organizationId}
                organizationList={initialOrganizationsList}
                currentOrganizationId={currentOrganizationId}
                setCurrentOrganizationIdAction={setCurrentOrganizationIdAction}
                teams={teams}
                user={data.user}
            />
        </div>
    );
}
