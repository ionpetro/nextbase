'use client';
import { Anchor } from '@/components/Anchor';
import { Table } from '@/types';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import { ProjectsListContainer } from '@/components/presentational/tailwind/ProjectsListContainer';

export const OrganizationTeams = ({
  teams,
  organizationId,
}: {
  teams: Table<'teams'>[];
  organizationId: string;
}) => {
  return (
    <ProjectsListContainer title="Teams" subTitle="A list of all teams.">
      <div className="overflow-hidden shadow ring-1 mt-6 ring-black ring-opacity-5 border sm:rounded-lg">
        <ShadcnTable className="bg-white dark:bg-black">
          <TableHeader>
            <TableRow>
              <TableHead>Row</TableHead>
              <TableHead>Team Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team, index) => (
              <TableRow key={team.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Anchor
                    className=" font-medium underline underline-offset-4"
                    href={`/organization/${organizationId}/team/${team.id}`}
                  >
                    {team.name}
                  </Anchor>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ShadcnTable>
      </div>
    </ProjectsListContainer>
  );
};
