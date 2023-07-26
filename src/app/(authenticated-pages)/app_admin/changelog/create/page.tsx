'use server';
import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import ChangeLogListCard from '@/components/ui/ChangeLog/ChangeLogListCard';
import LargeSectionHeading from '@/components/ui/Headings/LargeSectionHeading';
import InternalRoadmapCard from '@/components/ui/Card/InternalRoadmapCard';
import moment from 'moment';
import { CreateChangelog } from './CreateChangelog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { customMDXComponents } from '@/components/mdxComponents';
import { cn } from '@/utils/cn';
import { createSupabaseAdminServerComponentClient } from '@/supabase-clients/admin/createSupabaseAdminServerComponentClient';
import { createChangelogAction } from './actions';

export default async function Page() {
  const supabaseClient = createSupabaseAdminServerComponentClient();
  const completedTasksListResponse = await supabaseClient
    .from('internal_feedback_threads')
    .select('*')
    .eq('status', 'completed');

  const changelogItemsResponse = await supabaseClient
    .from('internal_changelog')
    .select('*')
    .order('created_at', { ascending: false });

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
          <CreateChangelog
            createChangelogAction={createChangelogAction}
          />

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
              {changelogItemsResponse.data.map((item, index) => (
                <ChangeLogListCard
                  key={item.id}
                  date={moment(item.created_at).format('LL')}
                  title={item.title}
                >
                  <div
                    className={cn(
                      'prose prose-slate max-w-none dark:prose-invert dark:text-slate-400',
                      // headings
                      'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]',
                      // lead
                      'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
                      // links
                      'prose-a:font-semibold dark:prose-a:text-sky-400',
                      // link underline
                      'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]',
                      // pre
                      'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
                      // hr
                      'dark:prose-hr:border-slate-800'
                    )}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-expect-error */}
                    <MDXRemote
                      source={item.changes}
                      components={customMDXComponents}
                    />
                  </div>
                </ChangeLogListCard>
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
