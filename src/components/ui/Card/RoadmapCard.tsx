import { Enum } from '@/types';
import { formatFieldValue } from '@/utils/feedback';

import {
  Bug as BugIcon,
  Info as InfoIcon,
  Command as FeatureIcon,
  Calendar as CalendarIcon,
  Pencil as EditIcon,
} from 'lucide-react/dist/esm/icons';
import { Badge, BadgeProps } from '../Badge';

const getIconVariantForTag = (tag: Enum<'internal_feedback_thread_type'>) => {
  switch (tag) {
    case 'bug':
      return <BugIcon className="mr-2 h-4 w-4" />;
    case 'general':
      return <InfoIcon className="mr-2 h-4 w-4" />;
    case 'feature_request':
      return <FeatureIcon className="mr-2 h-4 w-4" />;
    default:
      return null;
  }
};

type RoadmapCardProps = {
  title: string;
  description: string;
  tag: Enum<'internal_feedback_thread_type'>;
  date: string;
  priority: Enum<'internal_feedback_thread_priority'>;
};

const getPriorityVariant = (
  priority: Enum<'internal_feedback_thread_priority'>,
): BadgeProps['variant'] => {
  switch (priority) {
    case 'high':
      return 'danger';
    case 'medium':
      return 'warning';
    case 'low':
      return 'information';
    default:
      return 'default';
  }
};

const getTagVariant = (
  tag: Enum<'internal_feedback_thread_type'>,
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
    <div className="border items-start rounded-xl bg-white dark:bg-slate-900 p-4 ">
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-lg font-semibold  ">{title}</p>
          <p className="text-base text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="mt-3 -mb-0.5">
        <div className="flex space-x-2 mb-3">
          <Badge size="sm" variant="default">
            {getIconVariantForTag(tag)}
            {formatFieldValue(tag)}
          </Badge>
          <Badge size="sm" variant={getPriorityVariant(priority)}>
            {formatFieldValue(priority)}
          </Badge>
        </div>

        <div className="flex text-sm text-muted-foreground items-center">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="font-semibold">{date}</span>
        </div>
      </div>
    </div>
  );
}
