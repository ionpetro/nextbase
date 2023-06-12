// export const useAddUserToProjectTeam = () => {
//     const toastRef = useRef<string | null>(null);
//     const queryClient = useQueryClient();
//     return useMutation(
//       async ({
//         userId,
//         teamId,
//         role,
//       }: {
//         userId: string;
//         teamId: number;
//         role: Enum<'project_team_member_role'>;
//       }) => {
//         return addUserToTeam(supabaseClient, userId, teamId, role);
//       },
//       {
//         onMutate: () => {
//           toastRef.current = toast.loading('Adding user to team...');
//         },
//         onSuccess: (_data, { teamId }) => {
//           toast.success('User added to team!', {
//             id: toastRef.current ?? undefined,
//           });
//           queryClient.invalidateQueries(['getProjectTeamMembers', teamId]);
//         },
//         onError: (error: Error) => {
//           toast.error(String(error), {
//             id: toastRef.current ?? undefined,
//           });
//         },
//       }
//     );
//   };

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { createInternalFeedback } from '@/utils/supabase/internalFeedback';
import supabaseClient from '@/utils/supabase-browser';
import { toast } from 'react-hot-toast';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { Enum } from '@/types';

export const useCreateInternalFeedback = (
  options: {
    onSuccess?: () => void;
  } = {}
) => {
  const toastRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  const user = useLoggedInUser();
  return useMutation(
    (data: {
      title: string;
      content: string;
      type: Enum<'internal_feedback_thread_type'>;
    }) => {
      return createInternalFeedback(supabaseClient, user.id, data);
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
