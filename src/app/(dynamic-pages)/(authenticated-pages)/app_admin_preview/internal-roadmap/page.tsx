import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { AppAdminRoadmapPreview } from '../../app_admin/internal-roadmap/AppAdminRoadmapPreview';

export default async function AdminRoadmapPreview() {
  return (
    <div className=" space-y-10 max-w-[1296px]">
      <PageHeading
        title="Roadmap"
        titleClassName="text-2xl font-semibold tracking-normal"
        subTitle="This is where you see where the application is going"
      />

      <AppAdminRoadmapPreview />
    </div>
  );
}
