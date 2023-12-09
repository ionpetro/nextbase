import { GiveFeedbackDialog } from './GiveFeedbackDialog';
import { Anchor } from '@/components/Anchor';
import { formatFieldValue, mapStatusToVariant } from '@/utils/feedback';
import moment from 'moment';
import { Badge } from '@/components/ui/Badge';
import {
  ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table/ShadcnTable';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { getAllInternalFeedbackForLoggedInUser } from '@/data/user/internalFeedback';
import { Suspense } from 'react';

async function UserFeedbackList() {
  const feedbackList = await getAllInternalFeedbackForLoggedInUser();
  return (
    <div className="flex rounded-lg bg-clip-border border mt-10  overflow-hidden">
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
                      className=" font-medium underline underline-offset-4"
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
                      size="sm"
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
  );
}

export default async function MyFeedback() {
  return (
    <div>
      <PageHeading
        title="My Feedback"
        subTitle="A list of all your feedback to the Nextbase team"
        actions={<GiveFeedbackDialog isExpanded={true} />}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <UserFeedbackList />
      </Suspense>
    </div>
  );
}
