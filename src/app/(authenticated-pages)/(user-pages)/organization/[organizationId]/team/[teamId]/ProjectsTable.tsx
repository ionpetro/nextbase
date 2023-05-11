'use client';
import { Anchor } from '@/components/Anchor';
import TableCell from '@/components/ui/Table/TableCell';
import TableHeader from '@/components/ui/Table/TableHeader';
import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import { Check, ExternalLink, Pen, ThumbsUp, Timer } from 'lucide-react';
import moment from 'moment';



export const ProjectsTable = ({ projects }: { projects: Table<'projects'>[] }) => {
  if (projects.length === 0) {
    return (
      <T.P className="my-6 text-sm text-slate-900">
        🔍 No matching projects found.
      </T.P>
    );
  }
  return (
    <div className="mt-8 flow-root">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <div className="flex rounded-lg bg-clip-border border border-gray-200  max-w-[1296px] overflow-hidden">
              <table className="w-full bg-clip-content border-slate-200">
                <thead className="w-full bg-clip-border">
                  <tr className="p-0 ">
                    <th className="p-0">
                      <TableHeader>Name</TableHeader>
                    </th>
                    <th className="p-0">
                      <TableHeader>Date</TableHeader>
                    </th>
                    <th className="p-0">
                      <TableHeader>Project Status</TableHeader>
                    </th>
                    <th className="p-0">
                      <TableHeader>View</TableHeader>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr className="p-0" key={project.id}>
                      <td className="p-0 ">
                        <TableCell classname="px-6 py-4">{project.name}</TableCell>
                      </td>
                      <td className="p-0 ">
                        <TableCell classname="px-6 py-4">
                          {moment(project.created_at).format('LLL')}
                        </TableCell>
                      </td>
                      <td className="p-0 ">
                        <TableCell classname="px-6 py-4">
                          {/* Add your project status rendering logic here */}
                        </TableCell>
                      </td>
                      <td className="p-0 ">
                        <TableCell classname="px-6 py-4">
                          <Anchor
                            className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs"
                            href={`/project/${project.id}`}
                          >
                            <ExternalLink size={12} />
                          </Anchor>
                        </TableCell>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
