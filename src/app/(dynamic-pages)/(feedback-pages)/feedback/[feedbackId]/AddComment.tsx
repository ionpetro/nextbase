'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { addCommentToInternalFeedbackThread } from '@/data/feedback';
import { useToastMutation } from '@/hooks/useToastMutation';

import { Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function AddComment({
  feedbackId,
  isOpenToComments,
  defaultValue = '',
}: {
  feedbackId: string;
  isOpenToComments: boolean;
  defaultValue?: string;
}) {
  const [content, setContent] = useState(defaultValue);

  const { mutate, isLoading } = useToastMutation(
    async () => {
      return addCommentToInternalFeedbackThread({ feedbackId, content });
    },
    {
      loadingMessage: 'Adding Comment',
      successMessage: 'Successfully added your comment',
      errorMessage: 'Failed to add comment',
      onSuccess: () => {
        setContent('');
        toast.success('Comment added');
      },
    },
  );

  return (
    <div className="grid w-full gap-2" data-testid="add-comment-form">
      <Textarea
        name="comment-area"
        placeholder="Type your message here."
        value={content}
        disabled={isLoading || !isOpenToComments}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        name="add-comment-button"
        disabled={isLoading || content.length === 0}
        onClick={() => {
          if (content.length > 0) {
            mutate();
          }
        }}
      >
        <Send className="h-4 w-4 mr-2" />
        Add Comment
      </Button>
    </div>
  );
}

export default AddComment;
