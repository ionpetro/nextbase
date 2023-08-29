import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import { ProjectsTable } from '@/components/presentational/tailwind/Projects/ProjectsTable';
import { ProjectsListContainer } from '../ProjectsListContainer';

export const CompletedTeamProjectsList = ({
  projects,
}: {
  projects: Table<'projects'>[];
}) => {
  return (
    <ProjectsListContainer
      title="Completed Projects"
      subTitle="A list of all completed projects for this team. Projects completed over a month ago will be archived to save storage space. (Work in Progress)"
    >
      <ProjectsTable projects={projects} />
    </ProjectsListContainer>
  );
};
