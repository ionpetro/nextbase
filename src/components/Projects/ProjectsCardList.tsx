"use client";
import { T } from "@/components/ui/Typography";
import type { Table } from "@/types";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { ProjectBadge } from "../ui/badge-project";
import { Card } from "../ui/card";

export enum ProjectStatus {
  draft = "draft",
  pending_approval = "in review",
  approved = "in progress",
  completed = "completed",
}


export const ProjectsCardList = ({
  projects,
}: {
  projects: Table<"projects">[];
}) => {
  if (projects.length === 0) {
    return (
      <T.P className="text-muted-foreground my-6">
        🔍 No matching projects found.
      </T.P>
    );
  }
  return (
    <div className="mt-6 flex w-full overflow-x-auto gap-4 p-2">
      {projects.slice(0, 5).map((project) => (
        <Link href={`/project/${project.id}`} className="min-w-72 hover:shadow-md shadow-black transition-shadow duration-300 ease-in-out rounded-lg">
          <Card key={project.id} className="p-4 flex flex-col gap-4">
            <ProjectBadge variant={project.project_status} className="w-fit ">{ProjectStatus[project.project_status]}</ProjectBadge>
            <h2 className="text-xl font-bold">{project.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <CalendarDays className="size-4" />
              <span>{format(new Date(project.created_at), "dd MMMM, yyyy")}</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
