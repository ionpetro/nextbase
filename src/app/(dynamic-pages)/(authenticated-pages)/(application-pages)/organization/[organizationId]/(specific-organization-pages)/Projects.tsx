import { ProjectsTable } from '@/components/presentational/tailwind/Projects/ProjectsTable';
import { getProjects } from '@/data/user/projects';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { AppSupabaseClient } from '@/types';

async function fetchDraftProjects(
    supabase: AppSupabaseClient,
    organizationId: string,
) {
    const data = await getProjects({ organizationId, teamId: null });
    return data;
}

export async function Projects({ organizationId }: { organizationId: string }) {
    const projects = await fetchDraftProjects(
        createSupabaseUserServerComponentClient(),
        organizationId,
    );
    return <ProjectsTable projects={projects} />;
}
