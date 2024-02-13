import { PageHeading } from '@/components/PageHeading';
import { Button } from '@/components/ui/button';
import { ChangelogListPreview } from '../../app_admin/changelog/ChangelogListPreview';

export default function AppAdminChangelogPreview() {
  return (
    <div className="space-y-10">
      <div className="space-y-6  max-w-5xl ">
        <PageHeading
          title="Changelog"
          subTitle="This is the changelog for the application. It will be updated as new features are added and bugs are fixed."
          actions={
            <Button variant="default" className="mt-2">
              Create Changelog
            </Button>
          }
        />
      </div>
      <ChangelogListPreview />
    </div>
  );
}
