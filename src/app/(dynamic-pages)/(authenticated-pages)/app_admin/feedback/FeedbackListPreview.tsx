import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import { formatFieldValue, mapStatusToVariant } from '@/utils/feedback';
import { Badge } from '@/components/ui/Badge';
import { format } from 'date-fns';
import { Suspense } from 'react';
import { Fallback } from '@/components/AppAdminViewUserDetails/Fallback';
import { Enum } from '@/types';

export function FeedbackListPreview() {
  // Generate fake data
  const feedbackList = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    user_id: `User ${i + 1}`,
    title: `Feedback ${i + 1}`,
    type: 'bug',
    priority: 'high',
    created_at: new Date().toISOString(),
    status: 'open' as Enum<'internal_feedback_thread_status'>,
  }));

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
          {feedbackList.map((feedback) => (
            <TableRow key={feedback.id}>
              <TableCell>
                <Suspense fallback={<Fallback />}>
                  <div>{feedback.user_id}</div>
                </Suspense>
              </TableCell>
              <TableCell>
                <div className=" font-medium underline underline-offset-4 ">
                  {feedback.title}
                </div>
              </TableCell>

              <TableCell>{formatFieldValue(feedback.type)}</TableCell>
              <TableCell>{formatFieldValue(feedback.priority)}</TableCell>
              <TableCell>
                {format(new Date(feedback.created_at), 'PPpp')}
              </TableCell>
              <TableCell className="py-2">
                <Badge
                  className="whitespace-nowrap"
                  size="sm"
                  variant={mapStatusToVariant(feedback.status)}
                >
                  {formatFieldValue(feedback.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
    </div>
  );
}
