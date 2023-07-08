import { supabaseAdminServerComponentClient } from '@/supabase-clients/admin/supabaseAdminServerComponentClient';
import { getInternalFeedbackById } from '@/utils/supabase/internalFeedback';
import { z } from 'zod';

import ClientAdminFeedbackItemPage from './ClientFeedbackItemPage';

const feedbackItemPageParams = z.object({
  feedbackId: z.string(),
});

export default async function AppAdminFeedbackItemPage({
  params,
}: {
  params: unknown;
}) {
  const { feedbackId } = feedbackItemPageParams.parse(params);

  const feedbackThread = await getInternalFeedbackById(
    supabaseAdminServerComponentClient,
    feedbackId
  );

  return <ClientAdminFeedbackItemPage feedbackThread={feedbackThread} />;
}
