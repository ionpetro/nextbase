import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import slugify from 'slugify';
import { Textarea } from '@/components/ui/Textarea';
import Pen from 'lucide-react/dist/esm/icons/pen-tool';
import { Table } from '@/types';

const blogTagSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  slug: z.string(),
});

type BlogTagFormType = z.infer<typeof blogTagSchema>;

export const EditBlogTagDialog = ({ tag, updateBlogTag }: { tag: Table<'internal_blog_post_tags'>; updateBlogTag: (id: number, data: BlogTagFormType) => Promise<void>; }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit, watch, setValue, formState } = useForm<BlogTagFormType>({
    resolver: zodResolver(blogTagSchema),
    defaultValues: {
      name: tag.name,
      description: tag.description ?? '',
      slug: tag.slug,
    },
  });

  const { mutate: updateBlogTagMutation, isLoading: isUpdatingBlogTag } = useMutation(
    async (payload: BlogTagFormType) => updateBlogTag(tag.id, payload),
    {
      onSuccess: () => {
        router.refresh();
        toast.success('Successfully updated blog tag');
        setIsOpen(false);
      },
      onError: () => {
        toast.error('Failed to update blog tag');
      },
    }
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
  }, [nameValue]);

  const onSubmit = (data: BlogTagFormType) => {
    updateBlogTagMutation(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Pen />
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
          <Label>Name</Label>
          <Controller control={control} name="name" render={({ field }) => <Input {...field} placeholder="Name" />} />
          <Label>Description</Label>
          <Controller control={control} name="description" render={({ field }) => <Textarea {...field} placeholder="Description" />} />
          <Label>Slug</Label>
          <Controller control={control} name="slug" render={({ field }) => <Input disabled {...field} placeholder="Slug" />} />
          <Button disabled={!isValid || isUpdatingBlogTag} type="submit">
            {isUpdatingBlogTag ? 'Updating...' : 'Update Tag'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
