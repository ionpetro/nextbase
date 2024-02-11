import { AppAdminViewUserDetails } from '@/components/AppAdminViewUserDetails';
import { Fallback } from '@/components/AppAdminViewUserDetails/Fallback';
import { Badge } from '@/components/ui/Badge';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import { getPaginatedInternalFeedbackList } from '@/data/admin/internal-feedback';
import { formatFieldValue, mapStatusToVariant } from '@/utils/feedback';
import { format } from 'date-fns';
import Link from 'next/link';
import { Suspense } from 'react';
import { FiltersSchema } from './schema';

export async function FeedbackList({ filters }: { filters: FiltersSchema }) {
  const feedbackList = await getPaginatedInternalFeedbackList(filters);

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
                  <AppAdminViewUserDetails userId={feedback.user_id} />
                </Suspense>
              </TableCell>
              <TableCell>
                <Link
                  className=" font-medium underline underline-offset-4 "
                  key={feedback.id}
                  href={`/app_admin/feedback/${feedback.id}`}
                >
                  {feedback.title}
                </Link>
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
