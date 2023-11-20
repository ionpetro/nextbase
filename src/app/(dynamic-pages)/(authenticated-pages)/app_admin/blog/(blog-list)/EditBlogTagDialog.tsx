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
import Edit from 'lucide-react/dist/esm/icons/edit';
import { Table } from '@/types';
import { useToastMutation } from '@/hooks/useToastMutation';

const blogTagSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  slug: z.string(),
});

type BlogTagFormType = z.infer<typeof blogTagSchema>;

export const EditBlogTagDialog = ({
  tag,
  updateBlogTag,
}: {
  tag: Table<'internal_blog_post_tags'>;
  updateBlogTag: (id: number, data: BlogTagFormType) => Promise<void>;
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit, watch, setValue, formState } =
    useForm<BlogTagFormType>({
      resolver: zodResolver(blogTagSchema),
      defaultValues: {
        name: tag.name,
        description: tag.description ?? '',
        slug: tag.slug,
      },
    });

  const { mutate: updateBlogTagMutation, isLoading: isUpdatingBlogTag } =
    useToastMutation(
      async (payload: BlogTagFormType) => updateBlogTag(tag.id, payload),
      {
        loadingMessage: 'Updating blog tag...',
        successMessage: 'Blog tag updated!',
        errorMessage: 'Failed to update blog tag',
        onSuccess: () => {
          router.refresh();
          setIsOpen(false);
        },
      },
    );

  const { isValid } = formState;
  const nameValue = watch('name');

  useEffect(() => {
    const slug = slugify(nameValue, {
      lower: true,
      strict: true,
      replacement: '-',
    });
    setValue('slug', slug);
  }, [nameValue, setValue]);

  const onSubmit = (data: BlogTagFormType) => {
    updateBlogTagMutation(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="shadow-none hover:none">
          <Edit className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blog Tag</DialogTitle>
          <DialogDescription>
            Update the details for this blog tag.
          </DialogDescription>
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
            disabled={!isValid || isUpdatingBlogTag}
            type="submit"
            className="w-full"
          >
            {isUpdatingBlogTag ? 'Updating...' : 'Update Tag'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
