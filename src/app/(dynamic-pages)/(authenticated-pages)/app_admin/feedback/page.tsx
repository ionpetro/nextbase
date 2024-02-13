import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { getInternalFeedbackTotalPages } from '@/data/admin/internal-feedback';
import { Suspense } from 'react';
import { FeedbackList } from './FeedbackList';
import { filtersSchema } from './schema';

import { Fallback } from '@/components/AppAdminViewUserDetails/Fallback';
import { PageHeading } from '@/components/PageHeading';
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
      <div className="flex space-x-3 justify-between">
        <Search placeholder="Search Feedback... " />
        <FeedbackDropdownFilters />
      </div>
      <Suspense key={suspenseKey} fallback={<FeedbackListFallback />}>
        <FeedbackList filters={validatedSearchParams} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
