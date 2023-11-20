import { Anchor } from '@/components/Anchor';
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
import { Button } from '../Button/ButtonShadcn';

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
  type: Enum<'internal_feedback_thread_type'>,
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
      <Anchor href={`/app_admin/feedback/${feedbackItemId}`} className="mt-1">
        <Button variant="primaryLink" size="link">
          <EditIcon className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </Anchor>
    </div>
  );
}
