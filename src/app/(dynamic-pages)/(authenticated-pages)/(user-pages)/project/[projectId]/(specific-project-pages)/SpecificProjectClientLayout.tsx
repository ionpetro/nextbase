'use client';
import { Anchor } from '@/components/Anchor';
import Overline from '@/components/presentational/tailwind/Text/Overline';
import { useProjectContext } from '@/contexts/ProjectContext';
import { ProjectHeader } from './ProjectDetails';

export function SpecificProjectClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { projectByIdData, maybeTeamData, organizationData } =
    useProjectContext();

  return (
    <div className="space-y-8">
      <div className="space-y-0">
        <div className="flex mb-4 space-x-4">
          <Overline className="text-gray-500 dark:text-gray-600">
            <Anchor href="/dashboard">Dashboard</Anchor>
          </Overline>
          <Overline className="text-gray-500 dark:text-gray-600">/</Overline>
          <Overline className="text-gray-500 dark:text-gray-600">
            <Anchor href={`/organization/${organizationData.id}`}>
              {organizationData.title}
            </Anchor>
          </Overline>
          {maybeTeamData ? (
            <>
              <Overline className="text-gray-500 dark:text-gray-600">
                /
              </Overline>
              <Overline className="text-gray-500 dark:text-gray-600">
                <Anchor
                  href={`/organization/${organizationData.id}/team/${maybeTeamData.id}`}
                >
                  {maybeTeamData.name}
                </Anchor>
              </Overline>
            </>
          ) : null}
          <Overline className="text-gray-500 dark:text-gray-600">/</Overline>
          <Overline className="text-gray-800 dark:text-gray-400 font-bold underline-offset-4 underline">
            {projectByIdData.name}
          </Overline>
        </div>
        <ProjectHeader />
      </div>
      {children}
    </div>
  );
}
