'use client';
import { Anchor } from '@/components/Anchor';
import { useProjectContext } from '@/contexts/ProjectContext';

export function SpecificProjectClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { projectByIdData, maybeTeamData, organizationData } =
    useProjectContext();

  return (
    <div className="space-y-10">
      <div className="space-x-6">
        <span className="text-base py-2 font-[600] text-slate-500">
          <Anchor href="/dashboard">Dashboard</Anchor>
        </span>
        <span className="text-base  py-2 font-[600] text-slate-500">/</span>
        <span className="text-base py-2 font-[600] text-slate-500">
          <Anchor href={`/organization/${organizationData.id}`}>
            {organizationData.title}
          </Anchor>
        </span>
        {maybeTeamData ? (
          <>
            <span className="text-base  py-2 font-[600] text-slate-500">/</span>
            <span className="text-base py-2 font-[600] text-slate-500">
              <Anchor
                href={`/organization/${organizationData.id}/team/${maybeTeamData.id}`}
              >
                {maybeTeamData.name}
              </Anchor>
            </span>
          </>
        ) : null}
        <span className="text-base  py-2 font-[600] text-slate-500">/</span>
        <span className="text-base py-2 bg-blue-50 rounded-lg px-4 font-[700] text-blue-600">
          {projectByIdData.name}
        </span>
      </div>
      {children}
    </div>
  );
}
