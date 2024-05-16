import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { PageHeading } from "@/components/PageHeading";
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
import { OrganizationPageHeading } from "./OrganizationPageHeading";
import ProjectsLoadingFallback from "./ProjectsLoadingFallback";
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
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return <ProjectsCardList projects={projects} />

}

export default async function OrganizationPage({
  params,
  searchParams,
}: {
  params: unknown;
  searchParams: unknown;
}) {
  const { organizationSlug } = organizationSlugParamSchema.parse(params);
  const organizationId = await getOrganizationIdBySlug(organizationSlug)

  const validatedSearchParams = projectsfilterSchema.parse(searchParams);
  new Promise(() => setTimeout(() => { }, 20000));
  return (
    <div>
      <div className="block space-y-0 lg:hidden">
        <Suspense
          fallback={
            <PageHeading
              title={"Loading..."}
              isLoading
              titleHref={`/${organizationSlug}`}
            />
          }
        >
          <OrganizationPageHeading organizationId={organizationId} organizationSlug={organizationSlug} />
        </Suspense>
      </div>
      <div className="mt-8 w-full">

        <div className="flex flex-col">
          <div className="flex justify-between mb-6 w-full">
            <h1 className="font-semibold text-2xl">Dashboard</h1>
            <div className="flex gap-4">
              <ExportPDF />
              <CreateProjectDialog organizationId={organizationId} />
            </div>
          </div>
          <div className="flex justify-between items-center">
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
            <Suspense fallback={<ProjectsLoadingFallback quantity={3} />}>
              <Projects
                organizationId={organizationId}
                filters={validatedSearchParams}
              />
            </Suspense>
            {validatedSearchParams.query && <p className="mt-4 ml-2 text-sm">Searching for <span className="font-bold">{validatedSearchParams.query}</span></p>}
          </div>
        </div>
      </div>
      <div>
        <GraphContainer organizationSlug={organizationSlug} >
          <Suspense>
            <TeamMembers />
          </Suspense>
        </GraphContainer>
      </div>
    </div>
  );
}
