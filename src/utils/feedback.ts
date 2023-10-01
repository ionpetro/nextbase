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
) => {
  switch (status) {
    case 'closed':
      return 'success';
    case 'open':
    case 'in_progress':
      return 'warning';
    case 'planned':
    case 'under_review':
      return 'information';
    default:
      return 'default';
  }
};

export const mapTypeToVariant = (
  type: Enum<'internal_feedback_thread_type'>,
) => {
  switch (type) {
    case 'bug':
      return 'danger';
    case 'feature_request':
      return 'success';
    case 'general':
      return 'information';
    default:
      return 'default';
  }
};

export const mapPriorityToVariant = (
  priority: Enum<'internal_feedback_thread_priority'>,
) => {
  switch (priority) {
    case 'low':
      return 'information';
    case 'medium':
      return 'warning';
    case 'high':
      return 'danger';
    default:
      return 'default';
  }
};
