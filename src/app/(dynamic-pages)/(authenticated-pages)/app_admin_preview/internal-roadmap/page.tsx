import { AppAdminRoadmapPreview } from '@/app/(dynamic-pages)/(roadmap-pages)/roadmap/AppAdminRoadmapPreview';
import { PageHeading } from '@/components/PageHeading';

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
