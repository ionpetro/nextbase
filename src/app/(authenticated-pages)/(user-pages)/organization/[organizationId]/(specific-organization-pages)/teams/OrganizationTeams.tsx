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

export const OrganizationTeams = ({
  teams,
  organizationId,
}: {
  teams: Table<'teams'>[];
  organizationId: string;
}) => {
  return (
    <div className="border border-neutral-200 bg-white rounded-xl ">
      <div className="py-8 pb-6 sm:px-8 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h3 className="font-semibold border-0 leading-0 tracking-tight text-2xl text-gray-700">
              Teams
            </h3>
            <p className="mt-2 text-sm text-gray-700">A list of all teams.</p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <ShadcnTable>
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
                            className=" text-blue-600 font-medium underline underline-offset-2"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
