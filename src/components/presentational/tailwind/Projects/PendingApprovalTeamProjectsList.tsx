import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import { ProjectsTable } from '@/components/presentational/tailwind/Projects/ProjectsTable';
import { ProjectsListContainer } from '../ProjectsListContainer';

export const PendingApprovalTeamProjectsList = ({
  projects,
}: {
  projects: Table<'projects'>[];
}) => {
  return (
    <ProjectsListContainer
      title="Projects Pending Approval"
      subTitle="A list of all projects that are pending for approval"
    >
      <ProjectsTable projects={projects} />
    </ProjectsListContainer>
  );
};
