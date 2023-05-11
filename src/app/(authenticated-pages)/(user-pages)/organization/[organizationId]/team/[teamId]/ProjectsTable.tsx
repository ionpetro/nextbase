'use client';
import { Anchor } from '@/components/Anchor';
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
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Project Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    View
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {projects.map((project) => {

                  return (
                    <tr key={project.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 truncate w-32 max-w-[400px]">
                        {project.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {moment(project.created_at).format('LLL')}
                      </td>
                      <td className="whitespace-nowrap capitalize px-3 py-4 text-sm text-gray-500">
                        {project.project_status === 'draft' ? (
                          <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
                            <Pen size={12} />{' '}
                            <span className="text-xs">Draft</span>
                          </div>
                        ) : project.project_status === 'pending_approval' ? (
                          <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg bg-yellow-200 text-slate-700">
                            <Timer size={12} />{' '}
                            <span className="text-xs">Pending Approval</span>
                          </div>
                        ) : project.project_status === 'approved' ? (
                          <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg bg-blue-300 text-slate-700">
                            <ThumbsUp size={12} />{' '}
                            <span className="text-xs">Approved</span>
                          </div>
                        ) : project.project_status === 'completed' ? (
                          <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg bg-green-200 text-slate-700">
                            <Check size={12} />{' '}
                            <span className="text-xs">Completed</span>
                          </div>
                        ) : null}
                      </td>
                      <td className="relative whitespace-nowrap flex space-x-2 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Anchor
                          className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs"
                          href={`/project/${project.id}`}
                        >
                          <ExternalLink size={12} />
                        </Anchor>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
