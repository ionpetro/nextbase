import { cn } from '@/utils/cn';
import { organizationSlugParamSchema } from '@/utils/zod-schemas/params';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default async function OrganizationSettingsNavbar({
  params,
}: {
  params: unknown;
}) {
  const { organizationSlug } = organizationSlugParamSchema.parse(params);
  return (
    <div className={cn('hidden ', 'relative flex gap-2 items-center')}>
      Billing
      <Link
        className="flex gap-1.5 py-1.5 px-3 cursor-pointer items-center group rounded-md transition hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800"
        href={`/${organizationSlug}`}
      >
        <ArrowLeftIcon className="w-4 h-4 text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300" />
        <span className="text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300 text-sm font-normal">
          Back to Organization
        </span>
      </Link>
      {/* <p className="text-gray-500 dark:text-slate-400  text-sm font-normal">
        /
      </p>
      <p className="text-gray-500 px-2 dark:text-slate-400  text-sm font-normal">
        Settings
      </p>
      <p className="text-gray-500 dark:text-slate-400  text-sm font-normal">
        /
      </p>
      <p className="text-gray-500 px-2 dark:text-slate-400  text-sm font-normal">
        Billing
      </p> */}
    </div>
  );
}
