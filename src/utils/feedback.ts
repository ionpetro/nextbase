import { BadgeProps } from '@/components/ui/badge';
import { Enum } from '@/types';

export const formatFieldValue = (type: string) => {
  // feature_request to Feature request
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

export const STATUS_OPTIONS: Array<Enum<'internal_feedback_thread_status'>> = [
  'open',
  'in_progress',
  'closed',
  'planned',
  'under_review',
];

export const PRIORITY_OPTIONS: Array<
  Enum<'internal_feedback_thread_priority'>
> = ['low', 'medium', 'high'];

export const TYPE_OPTIONS: Array<Enum<'internal_feedback_thread_type'>> = [
  'bug',
  'feature_request',
  'general',
];

export const mapStatusToVariant = (
  status: Enum<'internal_feedback_thread_status'>,
): BadgeProps['variant'] => {
  switch (status) {
    case 'closed':
      return 'outline';
    case 'open':
    case 'in_progress':
      return 'default';
    case 'planned':
    case 'under_review':
      return 'secondary';
    default:
      return 'default';
  }
};

export const mapTypeToVariant = (
  type: Enum<'internal_feedback_thread_type'>,
): BadgeProps['variant'] => {
  switch (type) {
    case 'bug':
      return 'destructive';
    case 'feature_request':
      return 'secondary';
    case 'general':
      return 'default';
    default:
      return 'default';
  }
};

export const mapPriorityToVariant = (
  priority: Enum<'internal_feedback_thread_priority'>,
): BadgeProps['variant'] => {
  switch (priority) {
    case 'low':
      return 'outline';
    case 'medium':
      return 'default';
    case 'high':
      return 'destructive';
    default:
      return 'default';
  }
};
