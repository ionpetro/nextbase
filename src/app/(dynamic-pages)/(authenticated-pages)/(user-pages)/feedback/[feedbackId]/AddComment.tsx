'use client';

import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { T } from '@/components/ui/Typography';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

export function AddComment({
  feedbackId,
  addComment,
}: {
  feedbackId: string;
  addComment: ({
    feedbackId,
    content,
  }: {
    feedbackId: string;
    content: string;
  }) => Promise<void>;
}) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const toastRef = useRef<string | null>(null);
  const { mutate, isLoading } = useMutation(
    async (content: string) => {
      return addComment({
        feedbackId,
        content,
      });
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Submitting comment...');
      },
      onSuccess: () => {
        toast.success('Comment submitted', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;

        setContent('');
        router.refresh();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : 'An error occurred';
        toast.error(errorMessage, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
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
            mutate(content);
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
