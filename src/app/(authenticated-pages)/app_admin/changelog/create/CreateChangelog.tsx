'use client';

import { Button } from '@/components/ui/Button';
import { useCreateChangelog } from '@/utils/react-query-hooks-app-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createChangelogFormSchema = z.object({
  title: z.string(),
  changes: z.string(),
});

type CreateChangelogFormSchema = z.infer<typeof createChangelogFormSchema>;

export const CreateChangelog = () => {
  const { mutate } = useCreateChangelog();
  const { register, handleSubmit } = useForm<CreateChangelogFormSchema>({
    resolver: zodResolver(createChangelogFormSchema),
  });

  return (
    <form
      className="space-y-2"
      onSubmit={handleSubmit((data) => {
        mutate(data);
      })}
    >
      <input
        placeholder="Title"
        {...register('title')}
        className="w-full px-6 py-4 rounded-lg border border-gray-200"
      />
      <textarea
        placeholder="Write your log here"
        {...register('changes')}
        className="w-full px-6 py-4 rounded-lg border border-gray-200 h-[320px]"
      />

      <div className="flex space-x-2 justify-end">
        <Button variant="outline" type="submit">
          Cancel
        </Button>
        <Button variant="default" type="submit">
          {' '}
          Submit
        </Button>
      </div>
    </form>
  );
};
