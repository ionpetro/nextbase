'use client';
import { Button } from '@/components/ui/Button';
import TrashIcon from 'lucide-react/dist/esm/icons/trash-2';
import { useFormState, useFormStatus } from 'react-dom';
import { deleteBlogPost } from './actions';
import { toast } from 'sonner';
import { useEffect, useRef } from 'react';
import { useFormSubmission } from '@/utils/server-actions/useFormSubmission';
import { ServerActionState } from '@/utils/server-actions/types';

function SubmitButton({ state }: { state: ServerActionState }) {
  const toastRef = useRef<string | number>();

  const { formStatus } = useFormSubmission(state, {
    onSuccess: (state) => {
      console.log('success');
      toast.success(state.message, {
        id: toastRef.current ?? undefined,
      });
    },
    onError: (state) => {
      toast.error(state.message, {
        id: toastRef.current ?? undefined,
      });
    },
    onLoading: () => {
      toastRef.current = toast.loading(`Deleting blog post...`);
    },
  });

  return (
    <Button
      variant="infoLink"
      aria-disabled={formStatus.pending}
      className="text-red-500 dark:text-red-500 hover:text-red-600 hover:dark:text-red-400 p-0"
    >
      <TrashIcon className="mr-2 h-5 w-5" />
    </Button>
  );
}

const initialState: ServerActionState = {
  message: null,
  status: 'idle',
  serverActionCount: 0,
};

export function AppAdminDeleteBlogPost({ blogPostId }: { blogPostId: string }) {
  const [state, deleteBlogPostAction] = useFormState(
    deleteBlogPost,
    initialState,
  );

  return (
    <form action={deleteBlogPostAction} key={state.serverActionCount}>
      <input type="hidden" name="blog_post_id" value={blogPostId} />
      <SubmitButton state={state} />
    </form>
  );
}
