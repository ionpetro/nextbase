'use client'

import { T } from "@/components/ui/Typography";
import { useProjectContext } from "@/contexts/ProjectContext";
import { ProjectComments } from "./ProjectComments";

export default function ProjectPage() {
  const { projectByIdData } = useProjectContext();
  return <div className="space-y-6">
    <div className="space-y-2">
      <T.H3>{projectByIdData.name}</T.H3>
      <T.Subtle>This is your project page. You should create components related to your business use case here. </T.Subtle>
    </div>
    <ProjectComments />
  </div>;
}
