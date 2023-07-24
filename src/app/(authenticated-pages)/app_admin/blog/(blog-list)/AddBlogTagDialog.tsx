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

const blogTagSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  slug: z.string(),
});

type BlogTagFormType = z.infer<typeof blogTagSchema>;

export const AddBlogTagDialog = ({ createBlogTag }: { createBlogTag: (data: BlogTagFormType) => Promise<void> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, watch, setValue, formState } = useForm<BlogTagFormType>({ resolver: zodResolver(blogTagSchema) });

  const { mutate: createBlogTagMutation, isLoading: isCreatingBlogTag } = useMutation(
    async (payload: BlogTagFormType) => createBlogTag(payload),
    {
      onSuccess: () => {
        router.refresh();
        toast.success('Successfully created blog tag');
        setIsOpen(false);
      },
      onError: () => {
        toast.error('Failed to create blog tag');
      },
    }
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

  }, [nameValue]);

  const onSubmit = (data: BlogTagFormType) => {
    createBlogTagMutation(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">Add blog tag</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Blog Tag</DialogTitle>
          <DialogDescription>
            Fill in the details for the new blog tag.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Label>Name</Label>
          <Controller control={control} name="name" render={({ field }) => <Input {...field} placeholder="Name" />} />
          <Label>Description</Label>
          <Controller control={control} name="description" render={({ field }) => <Textarea {...field} placeholder="Description" />} />
          <Label>Slug</Label>
          <Controller control={control} name="slug" render={({ field }) => <Input disabled {...field} placeholder="Slug" />} />
          <Button disabled={!isValid || isCreatingBlogTag} type="submit">
            {isCreatingBlogTag ? 'Submitting...' : 'Submit Tag'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
