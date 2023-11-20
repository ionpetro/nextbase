import { cn } from '@/utils/cn';
import moment from 'moment';
import ChangeLogListCard from '@/components/ui/ChangeLog/ChangeLogListCard';
import { customMDXComponents } from '@/components/mdxComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getChangelogList } from '@/data/admin/internal-changelog';

export async function AppAdminChangelogList() {
  const changelogList = await getChangelogList();
  return (
    <div className="space-y-4  max-w-5xl ">
      <div className="space-y-6">
        {changelogList.map((item) => (
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
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              <MDXRemote
                source={item.changes}
                components={customMDXComponents}
              />
            </div>
          </ChangeLogListCard>
        ))}
      </div>
    </div>
  );
}
