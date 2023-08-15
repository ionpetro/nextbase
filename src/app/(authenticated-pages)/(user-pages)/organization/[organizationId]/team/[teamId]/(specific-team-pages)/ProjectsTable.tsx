'use client';
import { Anchor } from '@/components/Anchor';
import { T } from '@/components/ui/Typography';
import { Table } from '@/types';
import Check from 'lucide-react/dist/esm/icons/check';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import Pen from 'lucide-react/dist/esm/icons/pen-tool';
import ThumbsUp from 'lucide-react/dist/esm/icons/thumbs-up';
import Timer from 'lucide-react/dist/esm/icons/timer';
import moment from 'moment';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';

export const ProjectsTable = ({
  projects,
}: {
  projects: Table<'projects'>[];
}) => {
  if (projects.length === 0) {
    return (
      <T.P className="my-6 text-sm text-slate-900">
        🔍 No matching projects found.
      </T.P>
    );
  }
  return (
    <div className="mt-6 flow-root">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          {/* <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg"></div> */}
          {/* <div className="flex rounded-lg bg-clip-border border border-gray-200  max-w-[1296px] overflow-hidden"> */}
          <div className="border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
            <ShadcnTable>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Project Status</TableHead>
                  <TableHead>View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-semibold">
                      {project.name}
                    </TableCell>
                    <TableCell>
                      {moment(project.created_at).format('LLL')}
                    </TableCell>
                    <TableCell>
                      {/* Add your project status rendering logic here */}
                      {project.project_status === 'completed' ? (
                        <div className="inline-flex items-center space-x-1 border border-green-300 bg-green-50  rounded-lg font-medium px-2 py-0.5">
                          <Check size={16} />
                          <T.P className="text-sm text-green-500">
                            Completed
                          </T.P>
                        </div>
                      ) : project.project_status === 'pending_approval' ? (
                        <div className="inline-flex items-center space-x-1 border border-yellow-300 bg-yellow-50  rounded-lg font-medium px-2 py-0.5">
                          <Pen size={16} />
                          <T.P className="text-sm text-yellow-500">
                            Pending Approval
                          </T.P>
                        </div>
                      ) : project.project_status === 'approved' ? (
                        <div className="inline-flex items-center space-x-1 border border-green-300 bg-green-50  rounded-lg font-medium px-2 py-0.5">
                          <ThumbsUp size={16} />
                          <T.P className="text-sm text-green-500">Approved</T.P>
                        </div>
                      ) : project.project_status === 'draft' ? (
                        <div className="inline-flex items-center space-x-1 border border-neutral-300 bg-neutral-50  rounded-lg font-medium px-2 py-0.5">
                          <Timer size={16} />
                          <T.P className="text-sm text-neutral-700">Draft</T.P>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-1 border border-blue-300 bg-blue-50  rounded-lg font-medium px-2 py-0.5">
                          <Timer size={16} />
                          <T.P className="text-sm text-blue-500 capitalize">
                            {String(project.project_status).replace('_', ' ')}
                          </T.P>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Anchor href={`/project/${project.id}`}>
                        <ExternalLink
                          size={20}
                          className=" text-blue-600 rounded-lg text-base"
                        />
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
  );
};
