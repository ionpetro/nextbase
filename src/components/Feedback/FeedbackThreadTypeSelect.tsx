'use client';

import * as React from 'react';
// feedback thread types = ['bug', 'feature_request', 'general']
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
  defaultValue: Enum<'internal_feedback_thread_type'>;
};

type ValueProp = {
  value: Enum<'internal_feedback_thread_type'>;
};

type OtherProps = DefaultValueProp | ValueProp;

type FeedbackThreadTypeSelectProps = {
  onChange: (value: Enum<'internal_feedback_thread_type'>) => void;
} & OtherProps;

// typeguard to narrow string to Enum<'internal_feedback_thread_type'>
function isFeedbackThreadType(
  value: string,
): value is Enum<'internal_feedback_thread_type'> {
  return ['bug', 'feature_request', 'general'].includes(value);
}

export function FeedbackThreadTypeSelect({
  onChange,
  ...restProps
}: FeedbackThreadTypeSelectProps) {
  return (
    <Select
      {...restProps}
      onValueChange={(value) => {
        if (!isFeedbackThreadType(value)) {
          throw new Error('Invalid feedback thread type');
        }
        onChange(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Feedback Thread Types</SelectLabel>
          <SelectItem value="bug">Bug</SelectItem>
          <SelectItem value="feature_request">Feature Request</SelectItem>
          <SelectItem value="general">General</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
