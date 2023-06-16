import { Anchor } from '@/components/Anchor';
import { Enum } from '@/types';
import { formatFieldValue } from '@/utils/feedback';

import { Badge, BadgeProps } from '../Badge';
import { Button } from '../Button/ButtonShadcn';

type InternalRoadmapCardProps = {
  title: string;
  description: string;
  tag: Enum<'internal_feedback_thread_type'>;
  date: string;
  priority: Enum<'internal_feedback_thread_priority'>;
  feedbackItemId: string;
};

const getPriorityVariant = (
  priority: Enum<'internal_feedback_thread_priority'>
): BadgeProps['variant'] => {
  switch (priority) {
    case 'high':
      return 'solidDanger';
    case 'medium':
      return 'solidDiscussion';
    case 'low':
      return 'solidInformation';
    default:
      return 'default';
  }
};

const getTagVariant = (
  type: Enum<'internal_feedback_thread_type'>
): BadgeProps['variant'] => {
  switch (type) {
    case 'bug':
      return 'danger';
    case 'general':
      return 'information';
    case 'feature_request':
      return 'discussion';
    default:
      return 'default';
  }
};

export default function InternalRoadmapCard({
  title,
  description,
  tag,
  date,
  priority,
  feedbackItemId,
}: InternalRoadmapCardProps) {
  return (
    <div className="grid grid-cols-[1fr,auto] gap-1 items-start rounded-lg bg-white p-4 ">
      <div className="">
        <div className="">
          <p className="text-base font-[700]">{title}</p>

          <p className="text-base font-[500] text-slate-600">{description}</p>
        </div>

        <div className="mt-3 -mb-0.5">
          <div className="flex space-x-2 mb-3">
            <Badge variant={getTagVariant(tag)}>{formatFieldValue(tag)}</Badge>
            <Badge variant={getPriorityVariant(priority)}>
              {formatFieldValue(priority)}
            </Badge>
          </div>

          <p className="text-sm font-[600]">{date}</p>
        </div>
      </div>
      <Anchor href={`/app_admin/feedback-list/${feedbackItemId}`}>
        <Button variant="secondaryLink" size="link" className="text-blue-600">
          Edit
        </Button>
      </Anchor>
    </div>
  );
}
