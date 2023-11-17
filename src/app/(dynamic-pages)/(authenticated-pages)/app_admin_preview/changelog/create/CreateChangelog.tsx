'use client';

import { Button } from '@/components/ui/Button';
import { createChangelog } from '@/data/admin/internal-changelog';
import { useToastMutation } from '@/hooks/useToastMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createChangelogFormSchema = z.object({
  title: z.string(),
  changes: z.string(),
});

type CreateChangelogFormSchema = z.infer<typeof createChangelogFormSchema>;

export const CreateChangelog = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate: createChangelogMutation, isLoading } = useToastMutation(
    async ({ title, changes }: CreateChangelogFormSchema) => {
      return createChangelog({
        changes,
        title,
      });
    },
    {
      loadingMessage: 'Creating changelog...',
      successMessage: 'Changelog created!',
      errorMessage: 'Failed to create changelog',
      onSuccess: () => {
        router.refresh();
        formRef.current?.reset();
      },
    },
  );

  const { register, handleSubmit } = useForm<CreateChangelogFormSchema>({
    resolver: zodResolver(createChangelogFormSchema),
  });

  return (
    <form
      ref={formRef}
      className="space-y-3"
      onSubmit={handleSubmit((data) => {
        createChangelogMutation(data);
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
          {isLoading ? 'Creating Changelog...' : 'Create Changelog'}
        </Button>
      </div>
    </form>
  );
};
