import clsx from 'clsx';
import type { FiltersSchema } from './schema';

import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { Separator } from '@/components/ui/separator';
import {
  getAnonUserFeedbackList,
  getAnonUserFeedbackTotalPages,
} from '@/data/anon/internalFeedback';
import FeedbackDetailWrapper from './FeedbackDetail';
import { FeedbackFacetedFilters } from './FeedbackFacetedFilters';
import { FeedbackItem } from './FeedbackItem';
import { FeedbackDetailFallback } from './FeedbackPageFallbackUI';

async function AnonUserFeedbackPage({
  filters,
  feedbackId,
}: {
  filters: FiltersSchema;
  feedbackId?: string;
}) {
  const feedbacks = await getAnonUserFeedbackList(filters);
  const totalFeedbackPages = await getAnonUserFeedbackTotalPages(filters);

  return (
    <div className="h-full flex md:gap-2">
      <div
        className={clsx(
          feedbackId && 'hidden',
          'md:flex flex-col flex-1 h-full',
        )}
      >
        <div className="flex flex-col gap-2 mb-4">
          <Search placeholder="Search Feedback... " />
          <FeedbackFacetedFilters />
        </div>
        <div className="flex flex-col  flex-1 overflow-y-auto gap-2 mb-4">
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
            <div className="flex h-80 border rounded-lg shadow-md items-center justify-center gap-2 mb-4">
              <h2>No feedbacks available</h2>
            </div>
          )}
        </div>
        <div className="border-t py-2">
          <Pagination totalPages={totalFeedbackPages} />
        </div>
      </div>
      <Separator orientation="vertical" className="hidden md:block" />
      <div
        className={clsx(!feedbackId && 'hidden', 'md:block flex-1 relative')}
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

export default AnonUserFeedbackPage;
