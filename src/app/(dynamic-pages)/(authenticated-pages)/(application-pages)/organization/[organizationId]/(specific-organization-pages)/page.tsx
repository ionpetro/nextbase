import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { PageHeading } from "@/components/PageHeading";
import { ProjectsCardList } from "@/components/Projects/ProjectsCardList";
import { Search } from "@/components/Search";
import { T } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getAllOrganizationsForUser } from "@/data/user/organizations";
import { getProjects } from "@/data/user/projects";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import {
  organizationParamSchema,
  projectsfilterSchema,
} from "@/utils/zod-schemas/params";
import { Layers } from "lucide-react";
import InfoIcon from "lucide-react/dist/esm/icons/info";
import Link from "next/link";
import { Suspense } from "react";
import type { z } from "zod";
import { OrganizationExportPDF } from "./OrganizationExportPDF";
import { OrganizationGraphs } from "./OrganizationGraphs";
import { OrganizationPageHeading } from "./OrganizationPageHeading";

async function Projects({
  organizationId,
  filters,
}: { organizationId: string; filters: z.infer<typeof projectsfilterSchema> }) {
  const projects = await getProjects({
    organizationId,
    ...filters,
  });
  return <ProjectsCardList projects={projects} />;
}

export default async function OrganizationPage({
  params,
  searchParams,
}: {
  params: unknown;
  searchParams: unknown;
}) {
  const user = await serverGetLoggedInUser()
  const { organizationId } = organizationParamSchema.parse(params);
  const validatedSearchParams = projectsfilterSchema.parse(searchParams);
  const organizationsForUser = await getAllOrganizationsForUser(user.id)



  return (
    <div className="">
      <div className="space-y-0 block lg:hidden">
        <Suspense
          fallback={
            <PageHeading
              title={"Loading..."}
              isLoading
              titleHref={`/organization/${organizationId}`}
            />
          }
        >
          <OrganizationPageHeading organizationId={organizationId} />
        </Suspense>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2 justify-start items-center">
            <div>
              <div className="flex gap-3 items-center">
                <T.H3 className="mt-0">Projects</T.H3>{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200" />
                  </DialogTrigger>
                  <DialogContent className="w-128">
                    <T.H2>Projects</T.H2>
                    <T.P className="text-muted-foreground">
                      Projects are adaptable to diverse business usecases. For
                      example, they could be tasks in a project management app,
                      customer profiles in a CRM system, or appointments in a
                      scheduling app.
                    </T.P>
                  </DialogContent>
                </Dialog>
              </div>
              <T.P className="text-muted-foreground leading-6">
                You can create projects within teams, or within your
                organization.
              </T.P>
            </div>
          </div>
          <div className="flex gap-4">
            <OrganizationExportPDF />
            <CreateProjectDialog organizationId={organizationId} />
          </div>
        </div>
        <Suspense
          fallback={
            <div className="flex justify-center items-center">
              <T.Subtle>Loading Projects...</T.Subtle>
            </div>
          }
        >
          <div className="flex flex-col mt-16">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Projects</h2>
              <div className="flex gap-4">
                <Search placeholder="Search projects" />
                <Button
                  variant={"outline"}
                  asChild
                  className="self-end flex gap-2"
                >
                  <Link href={`/organization/${organizationId}/projects`}>
                    <Layers className="h-4 w-4" />
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
              {validatedSearchParams.query && <p className="text-sm ml-2">Searching for <span className="font-bold">{validatedSearchParams.query}</span></p>}
            </div>
          </div>
        </Suspense>
      </div>
      <div>
        <Suspense>
          <OrganizationGraphs organizations={organizationsForUser} organizationId={organizationId} />
        </Suspense>
      </div>
    </div>
  );
}
