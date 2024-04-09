import { getInternalFeedbackTotalPages } from '@/data/admin/internal-feedback';
import { filtersSchema } from './schema';

import { Fallback } from '@/components/AppAdminViewUserDetails/Fallback';
import { PageHeading } from '@/components/PageHeading';
import { Search } from '@/components/Search';
import { Separator } from '@/components/ui/separator';
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FeedbackDropdownFilters } from './FeedbackDropdownFilters';

const FeedbackListFallback: React.FC = () => {
  return (
    <div className="flex rounded-lg bg-clip-border border max-w-[1296px] overflow-hidden">
      <ShadcnTable>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Fallback />
              </TableCell>
              <TableCell>
                <div className="bg-gray-200 animate-pulse h-4 w-32"></div>
              </TableCell>
              <TableCell>
                <div className="bg-gray-200 animate-pulse h-4 w-32"></div>
              </TableCell>
              <TableCell>
                <div className="bg-gray-200 animate-pulse h-4 w-32"></div>
              </TableCell>
              <TableCell>
                <div className="bg-gray-200 animate-pulse h-4 w-32"></div>
              </TableCell>
              <TableCell>
                <div className="bg-gray-200 animate-pulse h-4 w-32"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
    </div>
  );
};

export default async function FeedbackListPage({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const validatedSearchParams = filtersSchema.parse(searchParams);
  const totalPages = await getInternalFeedbackTotalPages(validatedSearchParams);
  const suspenseKey = JSON.stringify(validatedSearchParams);
  return (
    <div className="space-y-4 max-w-[1296px]">
      <PageHeading
        title="Feedback"
        subTitle="View all feedback your users have submitted."
      ></PageHeading>
      <div className="flex space-x-4">
        <div className='flex-1 flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <Search placeholder="Search Feedback... " />
            <FeedbackDropdownFilters />
          </div>
          <Separator orientation="horizontal" />
          <div className='h-40 border mt-4'>
            {/* <Suspense key={suspenseKey} fallback={<FeedbackListFallback />}>
              <FeedbackList filters={validatedSearchParams} />
            </Suspense> 
            <Pagination totalPages={totalPages} />
            */}
          </div>
        </div>
        <Separator orientation="vertical" className='hidden md:block' />
        <div className='hidden md:flex flex-1 border rounded-lg p-4'>First issue</div>
      </div>
    </div>
  );
}
