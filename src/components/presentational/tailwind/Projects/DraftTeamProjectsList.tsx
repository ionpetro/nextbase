import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import { ProjectsTable } from '@/components/presentational/tailwind/Projects/ProjectsTable';
import { ProjectsListContainer } from '../ProjectsListContainer';

export const DraftTeamProjectsList = ({
  projects,
}: {
  projects: Table<'projects'>[];
}) => {
  return (
    <ProjectsListContainer
      title="Active Projects"
      subTitle="A list of all the Active Projects"
    >
      <ProjectsTable projects={projects} />
    </ProjectsListContainer>
  );
};
