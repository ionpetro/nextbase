'use client';

import { Anchor } from '@/components/Anchor';
import { useOrganizationContext } from '@/contexts/OrganizationContext';
import { useProjectContext } from '@/contexts/ProjectContext';
import { useTeamContext } from '@/contexts/TeamContext';

export function SpecificProjectClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { organizationByIdData } = useOrganizationContext();
  const { teamByIdData } = useTeamContext();
  const { projectByIdData } = useProjectContext();
  return (
    <div className="space-y-10">
      <div className="space-x-6">
        <span className="text-base py-2 font-[600] text-slate-500">
          <Anchor href="/dashboard">Dashboard</Anchor>
        </span>
        <span className="text-base  py-2 font-[600] text-slate-500">/</span>
        <span className="text-base py-2 font-[600] text-slate-500">
          <Anchor href={`/organization/${organizationByIdData.id}`}>
            {organizationByIdData.title}
          </Anchor>
        </span>
        <span className="text-base  py-2 font-[600] text-slate-500">/</span>
        <span className="text-base py-2 font-[600] text-slate-500">
          <Anchor
            href={`/organization/${organizationByIdData.id}/team/${teamByIdData.id}`}
          >
            {teamByIdData.name}
          </Anchor>
        </span>
        <span className="text-base  py-2 font-[600] text-slate-500">/</span>
        <span className="text-base py-2 bg-blue-50 rounded-lg px-4 font-[700] text-blue-600">
          {projectByIdData.name}
        </span>
      </div>
      {children}
    </div>
  );
}
