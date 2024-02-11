import { Button } from '@/components/ui/button';
import { Enum } from '@/types';
import { formatFieldValue } from '@/utils/feedback';
import {
  Bug as BugIcon,
  Calendar as CalendarIcon,
  Pencil as EditIcon,
  Command as FeatureIcon,
  Info as InfoIcon,
} from 'lucide-react/dist/esm/icons';
import Link from 'next/link';
import { Badge, BadgeProps } from './ui/badge';

type InternalRoadmapCardProps = {
  title: string;
  description: string;
  tag: Enum<'internal_feedback_thread_type'>;
  date: string;
  priority: Enum<'internal_feedback_thread_priority'>;
  feedbackItemId: string;
};

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

const getPriorityVariant = (
  priority: Enum<'internal_feedback_thread_priority'>,
): BadgeProps['variant'] => {
  switch (priority) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'default';
    case 'low':
      return 'outline';
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
    <div className="grid border grid-cols-[1fr,auto] gap-1 items-start rounded-xl bg-white dark:bg-slate-900 p-4 ">
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-lg font-semibold  ">{title}</p>
          <p className="text-base text-muted-foreground">{description}</p>
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
      <Link href={`/app_admin/feedback/${feedbackItemId}`} className="mt-1">
        <Button>
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </Link>
    </div>
  );
}
