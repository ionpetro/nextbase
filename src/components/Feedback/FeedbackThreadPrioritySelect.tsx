'use client';

import * as React from 'react';
// feedback thread priorities = ['low', 'medium', 'high']
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
  defaultValue: Enum<'internal_feedback_thread_priority'>;
};

type ValueProp = {
  value: Enum<'internal_feedback_thread_priority'>;
};

type OtherProps = DefaultValueProp | ValueProp;

type FeedbackThreadPrioritySelectProps = {
  onChange: (value: Enum<'internal_feedback_thread_priority'>) => void;
} & OtherProps;

// typeguard to narrow string to Enum<'internal_feedback_thread_priority'>
function isFeedbackThreadPriority(
  value: string,
): value is Enum<'internal_feedback_thread_priority'> {
  return ['low', 'medium', 'high'].includes(value);
}

export function FeedbackThreadPrioritySelect({
  onChange,
  ...restProps
}: FeedbackThreadPrioritySelectProps) {
  return (
    <Select
      {...restProps}
      onValueChange={(value) => {
        if (!isFeedbackThreadPriority(value)) {
          throw new Error('Invalid feedback thread priority');
        }
        onChange(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Feedback Thread Priorities</SelectLabel>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
