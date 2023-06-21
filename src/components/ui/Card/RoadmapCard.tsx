import { Enum } from '@/types';
import { formatFieldValue } from '@/utils/feedback';

import { Badge, BadgeProps } from '../Badge';

type RoadmapCardProps = {
  title: string;
  description: string;
  tag: Enum<'internal_feedback_thread_type'>;
  date: string;
  priority: Enum<'internal_feedback_thread_priority'>;
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
  tag: Enum<'internal_feedback_thread_type'>
): BadgeProps['variant'] => {
  switch (tag) {
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

export default function RoadmapCard({
  title,
  description,
  tag,
  date,
  priority,
}: RoadmapCardProps) {
  return (
    <div className=" rounded-lg bg-white p-4">
      <div className="">
        <p className="text-base font-[700]">{title}</p>
        <p className="text-base font-[500] text-slate-600">{description}</p>
      </div>

      <div className="mt-3">
        <div className="flex space-x-2 mb-3">
          <Badge variant={getTagVariant(tag)}>{formatFieldValue(tag)}</Badge>
          <Badge variant={getPriorityVariant(priority)}>
            {formatFieldValue(priority)}
          </Badge>
        </div>

        <p className="text-sm font-[600]">{date}</p>
      </div>
    </div>
  );
}
