'use client';
import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import { useTeamContext } from '@/contexts/TeamContext';
import { useGetDraftProjectsByTeam } from '@/utils/react-queries/projects';
import { ProjectsTable } from './ProjectsTable';

function TableContainer({ projects }: { projects: Table<'projects'>[] }) {
  return (
    <div className="bg-gray-100 py-10">
      <div className="px-4  sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <T.H2>Active Projects</T.H2>
            <p className="mt-2 text-sm text-gray-700">
              A list of all active projects for this team.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
        </div>
        <ProjectsTable projects={projects} />
      </div>
    </div>
  );
}

export const DraftTeamProjectsList = ({
  initialRuns,
}: {
  initialRuns: Table<'projects'>[];
}) => {
  const { teamId } = useTeamContext();
  const {
    data: projects,
    isLoading,
    error,
  } = useGetDraftProjectsByTeam(teamId, initialRuns);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {String(error)}</div>;
  }

  if (!projects) {
    return <div>Error: No data</div>;
  }

  return <TableContainer projects={projects} />;
};
