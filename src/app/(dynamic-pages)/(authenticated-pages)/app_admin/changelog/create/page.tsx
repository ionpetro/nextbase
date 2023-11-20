'use server';
import ChangeLogListCard from '@/components/ui/ChangeLog/ChangeLogListCard';
import InternalRoadmapCard from '@/components/ui/Card/InternalRoadmapCard';
import moment from 'moment';
import { CreateChangelog } from './CreateChangelog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { customMDXComponents } from '@/components/mdxComponents';
import { cn } from '@/utils/cn';
import { createSupabaseAdminServerComponentClient } from '@/supabase-clients/admin/createSupabaseAdminServerComponentClient';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';

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
      <div className="space-y-6 max-w-[768px]">
        <PageHeading
          title="Changelog"
          subTitle="This is the changelog for the application. It will be updated as new features are added and bugs are fixed."
        />
      </div>

      {/* Content Page */}
      <div
        className="grid grid-cols-2 gap-10 "
        style={{ gridTemplateColumns: '768px auto' }}
      >
        <div>
          <CreateChangelog />

          {/* Previous Changelogs*/}
          <div className="space-y-8 mt-10">
            <PageHeading
              title="All Releases"
              titleClassName="text-xl tracking-normal font-semibold"
              subTitle="These are the list of all Previous Releases"
            />
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
                      'dark:prose-hr:border-slate-800',
                    )}
                  >
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
        <div className="space-y-2 border px-6 py-4 rounded-lg bg-gray-100 dark:bg-slate-950/40 ">
          <p className="font-[600] dark:text-slate-300 mb-4">Completed Tasks</p>
          <div className="space-y-4">
            {completedTasksList.map((completedTask) => {
              return (
                <InternalRoadmapCard
                  key={completedTask.id}
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
