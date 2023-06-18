import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import ChangeLogListCard from '@/components/ui/ChangeLog/ChangeLogListCard';
import moment from 'moment';
import { Anchor } from '@/components/Anchor';
import { Button } from '@/components/ui/Button';
import { supabaseAdmin } from '@/utils/supabase-admin';

export default async function Page() {
  const changelogItemsResponse = await supabaseAdmin
    .from('internal_changelog')
    .select('*');

  if (changelogItemsResponse.error) {
    throw changelogItemsResponse.error;
  }

  if (!changelogItemsResponse.data) {
    throw new Error('No data found');
  }
  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <BasicPageHeading
          heading="Changelog"
          subheading="This is the changelog for the application. It will be updated as new features are added and bugs are fixed."
        />

        <div>
          <Anchor href="/app_admin/changelog/create">
            <Button variant="default">Create Changelog</Button>
          </Anchor>
        </div>
      </div>

      <div className="space-y-4 max-w-[768px]">
        <div className="space-y-4">
          {changelogItemsResponse.data.map((item) => (
            <ChangeLogListCard
              key={item.id}
              date={moment(item.created_at).format('LL')}
              title={item.title}
              description={item.changes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
