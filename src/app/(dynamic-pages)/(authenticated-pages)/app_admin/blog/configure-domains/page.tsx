import { cn } from '@/utils/cn';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function ConfigureDomains() {
  return (
    <div>
      <div className={cn('hidden ', 'relative flex gap-2 items-center')}>
        <Link
          className="flex gap-1.5 py-1.5 px-3 cursor-pointer items-center group rounded-md transition hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
          href={'/app_admin/blog/post/create'}
        >
          <ArrowLeftIcon className="w-4 h-4 text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300" />
          <span className="text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300 text-sm font-normal">
            Back to Create blog post
          </span>
        </Link>
      </div>
    </div>
  );
}
