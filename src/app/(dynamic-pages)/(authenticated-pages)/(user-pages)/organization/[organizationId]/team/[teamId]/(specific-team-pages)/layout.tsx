import HelpCard from '@/components/ui/Card/HelpCard';
import { ReactNode } from 'react';
import { SpecificTeamClientLayout } from './SpecificTeamClientLayout';
import organisationshelp from 'public/assets/help-assets/organisations-teams.png';
import teamsprojects from 'public/assets/help-assets/teams-projects.png';
import { createProjectAction } from './actions';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SpecificTeamClientLayout createProjectAction={createProjectAction}>
      {children}
    </SpecificTeamClientLayout>
  );
}
