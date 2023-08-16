import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { createInternalFeedback } from '@/utils/supabase/internalFeedback';
import { toast } from 'react-hot-toast';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { Enum } from '@/types';
import { supabaseUserClientComponentClient } from '@/supabase-clients/user/supabaseUserClientComponentClient';

export const useCreateInternalFeedback = (
  options: {
    onSuccess?: () => void;
  } = {}
) => {
  const toastRef = useRef<string | null>(null);
  const user = useLoggedInUser();
  return useMutation(
    (data: {
      title: string;
      content: string;
      type: Enum<'internal_feedback_thread_type'>;
    }) => {
      return createInternalFeedback(
        supabaseUserClientComponentClient,
        user.id,
        data
      );
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Creating feedback...');
      },
      onSuccess: () => {
        toast.success('Feedback created!', {
          id: toastRef.current ?? undefined,
        });
        options.onSuccess?.();
      },
      onError: (error: Error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      },
    }
  );
};
