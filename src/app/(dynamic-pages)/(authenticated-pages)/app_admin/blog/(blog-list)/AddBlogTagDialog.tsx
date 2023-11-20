import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import slugify from 'slugify';
import { Textarea } from '@/components/ui/Textarea';
import TagsIcon from 'lucide-react/dist/esm/icons/tag';
import { useToastMutation } from '@/hooks/useToastMutation';

const blogTagSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  slug: z.string(),
});

type BlogTagFormType = z.infer<typeof blogTagSchema>;

export const AddBlogTagDialog = ({
  createBlogTag,
}: {
  createBlogTag: (data: BlogTagFormType) => Promise<void>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, watch, setValue, formState } =
    useForm<BlogTagFormType>({ resolver: zodResolver(blogTagSchema) });

  const { mutate: createBlogTagMutation, isLoading: isCreatingBlogTag } =
    useToastMutation(
      async (payload: BlogTagFormType) => createBlogTag(payload),
      {
        loadingMessage: 'Creating blog tag...',
        successMessage: 'Blog tag created!',
        errorMessage: 'Failed to create blog tag',
        onSuccess: () => {
          router.refresh();
          setIsOpen(false);
        },
      },
    );

  const { isValid } = formState;
  const nameValue = watch('name');

  useEffect(() => {
    if (typeof nameValue === 'string') {
      const slug = slugify(nameValue, {
        lower: true,
        strict: true,
        replacement: '-',
      });
      setValue('slug', slug);
    }
  }, [nameValue, setValue]);

  const onSubmit = (data: BlogTagFormType) => {
    createBlogTagMutation(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Add blog tag
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <TagsIcon className="w-6 h-6" />
          </div>
          <div className="p-1 mb-4">
            <DialogTitle className="text-lg">Add blog tag</DialogTitle>
            <DialogDescription className="text-base">
              Fill in the details for the new blog tag.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label>Name</Label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => <Input {...field} placeholder="Name" />}
            />
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea {...field} placeholder="Description" />
              )}
            />
          </div>
          <div className="space-y-1">
            <Label>Slug</Label>
            <Controller
              control={control}
              name="slug"
              render={({ field }) => (
                <Input disabled {...field} placeholder="Slug" />
              )}
            />
          </div>
        </form>
        <DialogFooter className="w-full">
          <Button
            disabled={!isValid || isCreatingBlogTag}
            type="submit"
            className="w-full"
          >
            {isCreatingBlogTag ? 'Submitting...' : 'Submit Tag'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
