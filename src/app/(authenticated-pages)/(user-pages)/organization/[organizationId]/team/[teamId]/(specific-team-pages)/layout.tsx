import HelpCard from "@/components/ui/Card/HelpCard";
import { ReactNode } from "react";
import { TeamGraphs } from "../../TeamGraphs";
import { SpecificTeamClientLayout } from "./SpecificTeamClientLayout";
import organisationshelp from "public/assets/help-assets/organisations-teams.png";
import teamsprojects from "public/assets/help-assets/teams-projects.png";

export default function Layout({
  children
}: {
  children: ReactNode
}) {
  return <div className="space-y-8 pt-4 max-w-7xl px-8">
    <SpecificTeamClientLayout>
      {children}
    </SpecificTeamClientLayout>
    <TeamGraphs />
    {/* Help Cards */}
    <div className="grid grid-cols-2 space-x-6 w-full">
      <HelpCard
        heading="Teams within Organisations"
        subheading="Without Organisations you can't make Teams"
        image={organisationshelp}
      />

      <HelpCard
        heading="Projects within Teams"
        subheading="Build Projects within Teams and Organisations"
        image={teamsprojects}
      />
    </div>
  </div>
}
