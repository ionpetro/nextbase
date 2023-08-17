import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import { ProjectsTable } from '@/components/presentational/tailwind/Projects/ProjectsTable';

export const ApprovedTeamProjectsList = ({
  projects,
}: {
  projects: Table<'projects'>[];
}) => {
  return (
    <div className="border border-neutral-200 bg-white rounded-xl ">
      <div className="py-8 pb-6 sm:px-8 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="font-semibold border-0 leading-1 tracking-tight text-2xl">
              Approved Projects
            </h3>
            <p className="text-base text-gray-700">
              A list of all approved projects for this team. Approved projects
              which will be moved to completed automatically in 1 week and will
              be scheduled to archive to save storage. (Work in Progress)
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
        </div>
        <ProjectsTable projects={projects} />
      </div>
    </div>
  );
};