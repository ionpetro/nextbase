import { GiveFeedbackDialog } from '@/components/presentational/tailwind/GiveFeedbackDialog';
import { T } from '@/components/ui/Typography';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { getAllInternalFeedbackForUser } from '@/utils/supabase/internalFeedback';

import { Anchor } from '@/components/Anchor';
import { formatFieldValue, mapStatusToVariant } from '@/utils/feedback';
import moment from 'moment';
import { Badge } from '@/components/ui/Badge';
import { getLoggedInUserAction } from '@/app/(dynamic-pages)/_server-actions/user';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';

export default async function MyFeedback() {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await getLoggedInUserAction(supabaseClient);
  const feedbackList = await getAllInternalFeedbackForUser(
    supabaseClient,
    user.id
  );
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <T.H1>My Feedback</T.H1>
          <GiveFeedbackDialog isExpanded={true} />
        </div>
        <T.Subtle>A list of all your feedback to the Nextbase team.</T.Subtle>
      </div>
      {/* Feedback list table */}
      <div className="flex rounded-lg bg-clip-border border border-gray-200 max-w-[1296px] overflow-hidden">
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbackList
              ? feedbackList.map((feedback, index) => (
                  <TableRow key={feedback.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Anchor
                        className=" text-blue-600 font-medium underline underline-offset-2"
                        key={feedback.id}
                        href={`/feedback/${feedback.id}`}
                      >
                        {feedback.title}
                      </Anchor>
                    </TableCell>

                    <TableCell>{formatFieldValue(feedback.type)}</TableCell>
                    <TableCell>{formatFieldValue(feedback.priority)}</TableCell>
                    <TableCell>
                      {moment(feedback.created_at).format('LL')}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className=" whitespace-nowrap "
                        variant={mapStatusToVariant(feedback.status)}
                      >
                        {formatFieldValue(feedback.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </ShadcnTable>
      </div>
    </div>
  );
}
