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
    <div className="grid grid-cols-[1fr,auto] gap-6">
      <div className="border-2 border-blue-500 rounded-md border-dashed h-48 flex justify-center items-center">
        <p className="text-sm select-none text-gray-500">
          Build something cool here!
        </p>
      </div>
      <ProjectComments />
    </div>

  </div>;
}
