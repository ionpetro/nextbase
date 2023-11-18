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
import { T } from '@/components/ui/Typography';
import Image from 'next/image';

const loremIpsumTexts = [
  'Lorem ipsum dolor sit amet',
  'Consectetur adipiscing elit',
  'Sed do eiusmod tempor incididunt',
  'Ut labore et dolore magna aliqua',
  'Ut enim ad minim veniam',
  'Quis nostrud exercitation ullamco ',
  'Duis aute irure dolor in reprehenderit',
  'Excepteur sint occaecat cupidatat non proident',
  'Sunt in culpa qui officia deserunt mollit anim id est laborum',
  'Lorem ipsum dolor sit amet',
  'Consectetur adipiscing elit',
];

export function FeedbackListPreview() {
  // Generate fake data
  const feedbackList = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    user_id: `User ${i + 1}`,
    title:
      loremIpsumTexts[i].length > 30
        ? loremIpsumTexts[i].slice(0, 30) + '...'
        : loremIpsumTexts[i],
    type: 'bug',
    priority: 'high',
    created_at: new Date().toISOString(),
    status: 'open' as Enum<'internal_feedback_thread_status'>,
  }));

  return (
    <div className="flex rounded-lg bg-clip-border border max-w-[1296px] overflow-hidden [&_a]:pointer-events-none">
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
                  <span className="flex space-x-2 items-center">
                    <Image
                      className="rounded-full border border-slate-500 h-6 w-6"
                      alt={feedback.user_id}
                      src={`https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp`}
                      height={24}
                      width={24}
                    />
                    <T.P>{feedback.user_id}</T.P>
                  </span>
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
