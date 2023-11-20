'use client';

import * as React from 'react';
// feedback thread statuses = ['open', 'under_review', 'planned', 'closed', 'in_progress', 'completed']
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Enum } from '@/types';

type DefaultValueProp = {
  defaultValue: Enum<'internal_feedback_thread_status'>;
};

type ValueProp = {
  value: Enum<'internal_feedback_thread_status'>;
};

type OtherProps = DefaultValueProp | ValueProp;

type FeedbackThreadStatusSelectProps = {
  onChange: (value: Enum<'internal_feedback_thread_status'>) => void;
} & OtherProps;

// typeguard to narrow string to Enum<'internal_feedback_thread_status'>
function isFeedbackThreadStatus(
  value: string,
): value is Enum<'internal_feedback_thread_status'> {
  return [
    'open',
    'under_review',
    'planned',
    'closed',
    'in_progress',
    'completed',
  ].includes(value);
}

export function FeedbackThreadStatusSelect({
  onChange,
  ...restProps
}: FeedbackThreadStatusSelectProps) {
  return (
    <Select
      {...restProps}
      onValueChange={(value) => {
        if (!isFeedbackThreadStatus(value)) {
          throw new Error('Invalid feedback thread status');
        }
        onChange(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Feedback Thread Statuses</SelectLabel>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="under_review">Under Review</SelectItem>
          <SelectItem value="planned">Planned</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
