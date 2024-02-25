import { SidebarLink } from '@/components/SidebarLink';
import { getProjects } from '@/data/user/projects';
import ProjectIcon from 'lucide-react/dist/esm/icons/layers';

export async function ProjectsList({
  organizationId,
}: {
  organizationId: string;
}) {
  const projects = await getProjects({ organizationId, teamId: null });

  return (
    <div className="flex flex-col">
      <p className="text-sm uppercase font-semibold px-2 py-[10px]">Projects</p>
      <div className="flex flex-col">
        {projects.length > 0 ? (
          projects.map((project) => (
            <SidebarLink
              key={project.id}
              href={`/project/${project.id}`}
              icon={<ProjectIcon className="h-5 w-5" />}
              label={project.name}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-slate-400 px-2">
            No projects yet
          </p>
        )}
      </div>
    </div>
  );
}
