import clsx from 'clsx';
import type { FiltersSchema } from './schema';

import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { Separator } from '@/components/ui/separator';
import {
  getLoggedInUserFeedbackList,
  getLoggedInUserFeedbackTotalPages,
} from '@/data/user/internalFeedback';
import FeedbackDetailWrapper from './FeedbackDetail';
import { FeedbackFacetedFilters } from './FeedbackFacetedFilters';
import { FeedbackItem } from './FeedbackItem';
import { FeedbackDetailFallback } from './FeedbackPageFallbackUI';

async function LoggedInUserFeedbackPage({
  filters,
  feedbackId,
}: {
  filters: FiltersSchema;
  feedbackId?: string;
}) {
  const feedbacks = await getLoggedInUserFeedbackList(filters);
  const totalFeedbackPages = await getLoggedInUserFeedbackTotalPages(filters);

  return (
    <div className="h-full w-full flex md:gap-2">
      <div
        className={clsx(
          feedbackId && 'hidden',
          'md:flex flex-col flex-1 h-full max-w-[40rem]',
        )}
      >
        <div className="flex flex-col gap-2 mb-4">
          <Search placeholder="Search Feedback... " />
          <FeedbackFacetedFilters />
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto gap-2 mb-4">
          {feedbacks.length > 0 ? (
            feedbacks?.map((feedback) => (
              <FeedbackItem
                key={feedback?.id}
                feedback={feedback}
                filters={filters}
                feedbackId={
                  // try to use feedbackId to highlight, if it's not present use the first item
                  feedbackId || feedbacks[0].id
                }
              />
            ))
          ) : (
            <div
              className="flex h-full w-full items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  No feedbacks available
                </h3>
                <p className="text-sm text-muted-foreground">
                  You must be logged in to view feedback.
                </p>

              </div>
            </div>
          )}
        </div>
        <div className="border-t py-2">
          <Pagination totalPages={totalFeedbackPages} />
        </div>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />
      <div
        className={clsx(!feedbackId && '!hidden', 'md:block flex-1 relative')}
      >
        {feedbacks.length > 0 ? (
          <FeedbackDetailWrapper feedbackId={feedbackId ?? feedbacks[0]?.id} />
        ) : (
          <FeedbackDetailFallback />
        )}
      </div>
    </div>
  );
}

export default LoggedInUserFeedbackPage;
