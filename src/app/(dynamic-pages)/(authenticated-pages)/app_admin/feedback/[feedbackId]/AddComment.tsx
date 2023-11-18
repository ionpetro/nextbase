'use client';

import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { T } from '@/components/ui/Typography';
import { appAdminAddCommentToInternalFeedbackThread } from '@/data/admin/internal-feedback';
import { useToastMutation } from '@/hooks/useToastMutation';
import { useState } from 'react';

export function AddComment({ feedbackId }: { feedbackId: string }) {
  const [content, setContent] = useState('');
  const { mutate, isLoading } = useToastMutation(
    async () => {
      return appAdminAddCommentToInternalFeedbackThread(feedbackId, content);
    },
    {
      loadingMessage: 'Submitting Comment',
      successMessage: 'Successfully submitted comment',
      errorMessage: 'Failed to add comment',
      onSuccess: () => {
        setContent('');
      },
    },
  );

  return (
    <div className="space-y-2 mb-12">
      <T.P className="font-[600] text-muted-foreground">Your Response</T.P>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your Response here"
        className="rounded-lg w-full h-[224px] p-3 mb-2 border b-gray-300"
      />{' '}
      <div className="flex space-x-2 mt-10 justify-end">
        <Button
          variant="outline"
          size="default"
          className="w-1/4"
          onClick={() => {
            setContent('');
          }}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          onClick={() => {
            if (content.length > 0) {
              mutate();
            }
          }}
          className="w-1/4"
          disabled={isLoading || content.length === 0}
        >
          {isLoading ? 'Submitting' : 'Submit'}
        </Button>
      </div>
    </div>
  );
}
