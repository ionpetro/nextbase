'use client';

import { Button } from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

const createChangelogFormSchema = z.object({
  title: z.string(),
  changes: z.string(),
});

type CreateChangelogFormSchema = z.infer<typeof createChangelogFormSchema>;

export const CreateChangelog = ({
  createChangelogAction,
}: {
  createChangelogAction: ({
    title,
    changes,
  }: {
    title: string;
    changes: string;
  }) => Promise<void>;
}) => {
  const toastRef = useRef<string | null>(null);
  const router = useRouter();
  const { mutate } = useMutation(
    async ({ title, changes }: { title: string; changes: string }) => {
      return createChangelogAction({ title, changes });
    },
    {
      onMutate: () => {
        const toastId = toast.loading('Creating changelog...');
        toastRef.current = toastId;
      },
      onSuccess: () => {
        toast.success('Changelog created', {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
        router.refresh();
      },
      onError: (error) => {
        let message = `Failed to create changelog`;
        if (error instanceof Error) {
          message += `: ${error.message}`;
        } else if (typeof error === 'string') {
          message += `: ${error}`;
        }

        toast.error(message, {
          id: toastRef.current ?? undefined,
        });
        toastRef.current = null;
      },
    }
  );

  const { register, handleSubmit } = useForm<CreateChangelogFormSchema>({
    resolver: zodResolver(createChangelogFormSchema),
  });

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit((data) => {
        mutate(data);
      })}
    >
      <input
        placeholder="Title"
        {...register('title')}
        className="block px-4 py-6 w-full appearance-none rounded-md border bg-gray-50/10 dark:bg-slate-950/40 h-10  placeholder-muted-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-lg"
      />
      <textarea
        placeholder="Write your log here"
        {...register('changes')}
        className="block px-4 py-3 h-80 w-full appearance-none rounded-md border bg-gray-50/10 dark:bg-slate-950/40  placeholder-muted-foreground shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-lg"
      />

      <div className="flex space-x-2 justify-end">
        <Button variant="outline" type="reset" className="w-1/4">
          Cancel
        </Button>
        <Button variant="default" type="submit" className="w-1/4">
          {' '}
          Submit
        </Button>
      </div>
    </form>
  );
};
