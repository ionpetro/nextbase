import { Anchor } from '@/components/Anchor';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import Overline from '@/components/presentational/tailwind/Text/Overline';
import { T } from '@/components/ui/Typography';
import { z } from 'zod';
import { getSlimInternalFeedback } from '@/data/user/internalFeedback';
import { Suspense } from 'react';
import { FeedbackCommentList } from './FeedbackCommentList';
import { FeedbackStatusDetails } from './FeedbackStatusDetails';

const feedbackItemPageParams = z.object({
  feedbackId: z.string(),
});

export default async function FeedbackItemPage({
  params,
}: {
  params: unknown;
}) {
  const { feedbackId } = feedbackItemPageParams.parse(params);
  const slimFeedbackThread = await getSlimInternalFeedback(feedbackId);

  return (
    <>
      <div className="flex space-x-4">
        <Overline className="text-gray-500 hover:text-gray-800 dark:text-gray-600 hover:dark:text-gray-400">
          <Anchor href="/">Dashboard</Anchor>
        </Overline>
        <Overline className="text-gray-500 dark:text-gray-600">/</Overline>
        <Overline className="text-gray-500 hover:text-gray-800 dark:text-gray-600 hover:dark:text-gray-400">
          <Anchor href="/feedback">My Feedback</Anchor>
        </Overline>
        <Overline className="text-gray-500 dark:text-gray-600">/</Overline>
        <Overline className="text-gray-800 dark:text-gray-400 font-bold underline-offset-4 underline">
          {slimFeedbackThread.title}
        </Overline>
      </div>

      {/* Page Heading */}
      <PageHeading
        title={slimFeedbackThread.title}
        subTitle={slimFeedbackThread.content}
      />

      {/* Feedback */}

      <div className="space-y-4">
        <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
          <FeedbackStatusDetails feedbackId={feedbackId} />
        </Suspense>
        <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
          <FeedbackCommentList
            feedbackId={feedbackId}
            feedbackThreadStatus={slimFeedbackThread.status}
          />
        </Suspense>
      </div>
    </>
  );
}
