import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import ChangeLogListCard from '@/components/ui/ChangeLog/ChangeLogListCard';
import LargeSectionHeading from '@/components/ui/Headings/LargeSectionHeading';

import InternalRoadmapCard from '@/components/ui/Card/InternalRoadmapCard';
import moment from 'moment';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { CreateChangelog } from './CreateChangelog';

export default async function Page() {
  const completedTasksListResponse = await supabaseAdmin
    .from('internal_feedback_threads')
    .select('*')
    .eq('status', 'completed');

  const changelogItemsResponse = await supabaseAdmin
    .from('internal_changelog')
    .select('*');

  if (changelogItemsResponse.error) {
    throw changelogItemsResponse.error;
  }

  if (!changelogItemsResponse.data) {
    throw new Error('No data found');
  }

  if (completedTasksListResponse.error) {
    throw completedTasksListResponse.error;
  }

  if (!completedTasksListResponse.data) {
    throw new Error('No data found');
  }

  const completedTasksList = completedTasksListResponse.data;

  return (
    <div className="space-y-10">
      {/* Create Changelog Page */}
      <BasicPageHeading
        heading="Create Changelog"
        subheading="This is the changelog for the application. It will be updated as new features are added and bugs are fixed."
      />

      {/* Content Page */}
      <div
        className="grid grid-cols-2 gap-10 "
        style={{ gridTemplateColumns: '768px auto' }}
      >
        <div>
          {/* Create Changelog Card */}
          <CreateChangelog />

          {/* Previous Changelogs*/}
          <div className="space-y-8 mt-10">
            <LargeSectionHeading
              heading="All Releases"
              subheading="These are the list of all Previous Releases"
            >
              {/* <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline">
                    <AiOutlineFilter className="text-xl mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>Latest First</DropdownMenuItem>
                  <DropdownMenuItem>Oldest First</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </LargeSectionHeading>
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
        {/* Roadmap Card */}
        <div className="space-y-2  px-6 py-4 rounded-lg bg-gray-100 ">
          <p className="font-[600] mb-4">Completed Tasks</p>
          <div className="space-y-4">
            {completedTasksList.map((completedTask) => {
              return (
                <InternalRoadmapCard
                  title={completedTask.title}
                  description={completedTask.content}
                  tag={completedTask.type}
                  date={moment(completedTask.created_at).format('LL')}
                  priority={completedTask.priority}
                  feedbackItemId={completedTask.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
