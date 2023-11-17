import { z } from 'zod';
import { Anchor } from '@/components/Anchor';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import Overline from '@/components/presentational/tailwind/Text/Overline';
import {
  adminGetInternalFeedbackById,
  appAdminGetSlimInternalFeedback,
} from '@/data/admin/internal-feedback';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { Suspense } from 'react';
import { T } from '@/components/ui/Typography';
import { FeedbackCommentList } from './FeedbackCommentList';
import { FeedbackStatusDetails } from './FeedbackStatusDetails';

const feedbackItemPageParams = z.object({
  feedbackId: z.string(),
});

export async function generateMetadata({ params }: { params: unknown }) {
  const { feedbackId } = feedbackItemPageParams.parse(params);
  const feedbackThread = await adminGetInternalFeedbackById(feedbackId);

  return {
    title: `${feedbackThread.title} | User Feedback | Nextbase`,
    description: 'User feedback',
  };
}

export default async function AppAdminFeedbackItemPage({
  params,
}: {
  params: unknown;
}) {
  const { feedbackId } = feedbackItemPageParams.parse(params);
  const slimFeedbackThread = await appAdminGetSlimInternalFeedback(feedbackId);

  return (
    <>
      <div className="flex mb-4 space-x-4">
        <Anchor href="/app_admin" className="group space-x-1 flex items-center">
          <ChevronLeft className="relative text-gray-500 h-4 w-4 hover:-translate-x-10 group-hover:text-gray-800 group-hover:dark:text-gray-400 dark:text-gray-600" />
          <Overline className="text-gray-500 group-hover:text-gray-800 dark:text-gray-600 group-hover:dark:text-gray-400">
            Back to Admin Panel
          </Overline>
        </Anchor>
        <Overline className="text-gray-500 dark:text-gray-600">/</Overline>
        <Anchor href="/app_admin/feedback">
          <Overline className="text-gray-500 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-400">
            All Feedback
          </Overline>
        </Anchor>
        <Overline className="text-gray-500 dark:text-gray-600">/</Overline>
        <Overline className="text-gray-800 dark:text-gray-400 font-bold underline-offset-4 underline">
          User's Feedback
        </Overline>
      </div>
      {/* Page Heading */}
      <PageHeading
        title={slimFeedbackThread.title}
        subTitle={slimFeedbackThread.content}
      />
      <div className="space-y-4">
        <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
          <FeedbackCommentList
            feedbackId={feedbackId}
            feedbackThreadStatus={slimFeedbackThread.status}
          />
        </Suspense>
        <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
          <FeedbackStatusDetails feedbackId={feedbackId} />
        </Suspense>
      </div>
    </>
  );
}
