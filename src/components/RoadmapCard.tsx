import { Enum } from '@/types';
import { formatFieldValue } from '@/utils/feedback';
import { Bug, Calendar, Command, Info } from 'lucide-react';

import { Badge, BadgeProps } from './ui/badge';

const getIconVariantForTag = (tag: Enum<'internal_feedback_thread_type'>) => {
  switch (tag) {
    case 'bug':
      return <Bug className="mr-2 h-4 w-4" />;
    case 'general':
      return <Info className="mr-2 h-4 w-4" />;
    case 'feature_request':
      return <Command className="mr-2 h-4 w-4" />;
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
      return 'destructive';
    case 'medium':
      return 'secondary';
    case 'low':
      return 'default';
    default:
      return 'default';
  }
};

const getTagVariant = (
  tag: Enum<'internal_feedback_thread_type'>,
): BadgeProps['variant'] => {
  switch (tag) {
    case 'bug':
      return 'destructive';
    case 'general':
      return 'default';
    case 'feature_request':
      return 'secondary';
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
    <div className="border items-start p-4 rounded">
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-lg font-semibold  ">{title}</p>
          <p className="text-base text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="mt-3 -mb-0.5">
        <div className="flex space-x-2 mb-3">
          <Badge variant="outline">
            {getIconVariantForTag(tag)}
            {formatFieldValue(tag)}
          </Badge>
          <Badge variant="outline">{formatFieldValue(priority)}</Badge>
        </div>

        <div className="flex text-sm text-muted-foreground items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span className="font-semibold">{date}</span>
        </div>
      </div>
    </div>
  );
}
