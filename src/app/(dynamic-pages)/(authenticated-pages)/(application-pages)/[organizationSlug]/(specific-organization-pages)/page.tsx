import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { ProjectsCardList } from "@/components/Projects/ProjectsCardList";
import { Search } from "@/components/Search";
import { Button } from "@/components/ui/button";
import { getOrganizationIdBySlug } from "@/data/user/organizations";
import { getProjects } from "@/data/user/projects";
import {
  organizationSlugParamSchema,
  projectsfilterSchema
} from "@/utils/zod-schemas/params";
import { Layers } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import type { z } from "zod";
import { DashboardLoadingFallback } from "./DashboardLoadingFallback";
import { TeamMembers } from "./TeamMembers";
import { ExportPDF } from "./_exportPdf/ExportPdf";
import { GraphContainer } from "./_graphs/GraphContainer";


async function Projects({
  organizationId,
  filters,
}: { organizationId: string; filters: z.infer<typeof projectsfilterSchema> }) {
  const projects = await getProjects({
    organizationId,
    ...filters,
  });
  return <ProjectsCardList projects={projects} />

}

async function Dashboard({ params, searchParams }: { params: unknown, searchParams: unknown }) {
  const { organizationSlug } = organizationSlugParamSchema.parse(params);
  const organizationId = await getOrganizationIdBySlug(organizationSlug);
  const validatedSearchParams = projectsfilterSchema.parse(searchParams);

  return (
    <div>
      <div className="mt-8 w-full">
        <div className="flex flex-col">
          <div className="flex justify-between w-full">
            <h1 className="font-semibold text-2xl">Dashboard</h1>
            <div className="flex gap-4">
              <ExportPDF />
              <CreateProjectDialog organizationId={organizationId} />
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <h2 className="font-semibold text-xl">Recent Projects</h2>
            <div className="flex gap-4">
              <Search placeholder="Search projects" />
              <Button
                variant={"outline"}
                asChild
                className="flex gap-2 self-end"
              >
                <Link href={`/${organizationSlug}/projects`}>
                  <Layers className="w-4 h-4" />
                  View all projects
                </Link>
              </Button>
            </div>

          </div>

          <div className="flex flex-col gap-2">
            <Projects
              organizationId={organizationId}
              filters={validatedSearchParams}
            />
            {validatedSearchParams.query && <p className="mt-4 ml-2 text-sm">Searching for <span className="font-bold">{validatedSearchParams.query}</span></p>}
          </div>
        </div>
      </div>
      <div >
        <GraphContainer organizationSlug={organizationSlug}>
          <Suspense>
            <TeamMembers />
          </Suspense>
        </GraphContainer>
      </div>
    </div>
  );

}

export default async function OrganizationPage({
  params,
  searchParams,
}: {
  params: unknown;
  searchParams: unknown;
}) {
  return <Suspense fallback={<DashboardLoadingFallback />}>
    <Dashboard params={params} searchParams={searchParams} />
  </Suspense>
}
