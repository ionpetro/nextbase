'use client';
import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import { useTeamContext } from '@/contexts/TeamContext';
import { useGetDraftProjectsByTeam } from '@/utils/react-queries/projects';
import { ProjectsTable } from './ProjectsTable';

function TableContainer({ projects }: { projects: Table<'projects'>[] }) {
  return (
    <div className="border border-neutral-200 bg-white rounded-xl ">
      <div className="py-8 pb-6 sm:px-8 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="font-semibold border-0 leading-1 tracking-tight text-2xl text-gray-700">
              Active Projects
            </h3>
            <p className="text-base text-gray-700">
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
