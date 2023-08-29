import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import { ProjectsTable } from '@/components/presentational/tailwind/Projects/ProjectsTable';
import { ProjectsListContainer } from '../ProjectsListContainer';

export const ApprovedTeamProjectsList = ({
  projects,
}: {
  projects: Table<'projects'>[];
}) => {
  return (
    <ProjectsListContainer
      title="Approved Projects"
      subTitle="A list of all approved projects for this team. Approved projects which will be moved to completed automatically in 1 week and will be scheduled to archive to save storage. (Work in Progress)"
    >
      <ProjectsTable projects={projects} />
    </ProjectsListContainer>
  );
};
