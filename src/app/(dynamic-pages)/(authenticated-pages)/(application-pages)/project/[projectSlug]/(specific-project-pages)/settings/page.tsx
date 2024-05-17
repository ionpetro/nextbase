import { T } from '@/components/ui/Typography';
import { getProjectIdBySlug } from '@/data/user/projects';
import { projectSlugParamSchema } from '@/utils/zod-schemas/params';



export default async function ProjectSettings({ params }: { params: unknown }) {
  const { projectSlug } = projectSlugParamSchema.parse(params);
  const project = await getProjectIdBySlug(projectSlug);
  return (
    <div className="space-y-2">
      <T.H3>Project Settings</T.H3>
      <T.Subtle>
        Add settings for your projects depending on your usecase
      </T.Subtle>
    </div>
  );
}
