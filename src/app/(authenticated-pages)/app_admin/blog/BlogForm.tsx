'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Table, TableInsertPayload, TableUpdatePayload } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useEffect, useRef } from 'react';
import slugify from 'slugify';
import { Switch } from '@/components/ui/Switch';
import dynamic from 'next/dynamic';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useRouter } from 'next/navigation';
import {
  internalBlogPostSchema,
  InternalBlogPostSchema,
} from '@/utils/zod-schemas/internalBlog';
import { UploadBlogImage } from './post/UploadBlogImage';
import Image from 'next/image';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

const baseDefaultValues: Partial<InternalBlogPostSchema> = {
  status: 'draft',
  is_featured: false,
  title: '',
  content: '## Hello world',
};

type BlogFormProps = {
  authors: Table<'internal_blog_author_profiles'>[];
  initialBlogPost?: InternalBlogPostSchema;
} & (
    | {
      mode: 'create';
      onSubmit: (
        authorId: string,
        data: TableInsertPayload<'internal_blog_posts'>
      ) => Promise<void>;
    }
    | {
      mode: 'update';
      onSubmit: (
        authorId: string,
        postId: string,
        data: TableUpdatePayload<'internal_blog_posts'>
      ) => Promise<void>;
      initialBlogPost: InternalBlogPostSchema;
      postId: string;
    }
  );

export const BlogForm = ({
  authors,
  initialBlogPost,
  ...rest
}: BlogFormProps) => {
  const defaultValues = Object.assign({}, baseDefaultValues, initialBlogPost);
  const router = useRouter();
  const { control, handleSubmit, formState, watch, setValue } =
    useForm<InternalBlogPostSchema>({
      resolver: zodResolver(internalBlogPostSchema),
      defaultValues,
    });
  const { isValid } = formState;
  const titleValue = watch('title');
  useEffect(() => {
    // remove special characters including spaces and question marks
    const slug = slugify(titleValue, {
      lower: true,
      strict: true,
      replacement: '-',
    });
    setValue('slug', slug);
  }, [titleValue]);

  const toastRef = useRef<string | null>(null);
  const { mutate: submitPostMutation, isLoading: isSubmittingPost } =
    useMutation(
      async (data: InternalBlogPostSchema) => {
        const { author_id, ...restPayload } = data;
        if (rest.mode === 'create') {
          return rest.onSubmit(author_id, restPayload);
        } else {
          return rest.onSubmit(author_id, rest.postId, restPayload);
        }
      },
      {
        onMutate: () => {
          const toastId = toast.loading('Creating blog post...');
          toastRef.current = toastId;
        },
        onSuccess: () => {
          router.refresh();
          toast.success('Blog post created', {
            id: toastRef.current ?? undefined,
          });
          toastRef.current = null;
          router.push('/app_admin/blog');
        },
        onError: (error) => {
          let message = `Failed to create blog post`;
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

  function onSubmit(data: InternalBlogPostSchema) {
    submitPostMutation(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
      <div className="space-y-2">
        <Label>Cover Image URL</Label>
        {/* <Controller
          control={control}
          name="cover_image"
          render={({ field }) => (
            <Input {...field} placeholder="Cover Image URL" />
          )}
        />
         */}
        <Controller
          control={control}
          name="cover_image"
          render={({ field }) => {
            console.log(field);
            return (
              <>
                {field.value ? (
                  <div>
                    <div className="relative h-72">
                      <Image
                        src={field.value}
                        fill
                        alt="Cover Image"
                        style={{
                          objectFit: 'contain',
                        }}
                      />
                    </div>

                    <button
                      onClick={() => {
                        field.onChange(null);
                      }}
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <UploadBlogImage onUpload={(path) => field.onChange(path)} />
                )}
              </>
            );
          }}
        />
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <Controller
          control={control}
          name="title"
          render={({ field }) => {
            return <Input {...field} placeholder="Title" />;
          }}
        />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <Controller
          control={control}
          name="content"
          render={({ field }) => {
            return <MDEditor {...field} />;
          }}
        />
      </div>
      <div className="space-y-2">
        <Label>Summary</Label>
        <Controller
          control={control}
          name="summary"
          render={({ field }) => <Textarea {...field} placeholder="Summary" />}
        />
      </div>
      <div className="space-y-2">
        <Label>Is Featured</Label>
        <Controller
          control={control}
          name="is_featured"
          render={({ field }) => (
            <Switch
              disabled={isSubmittingPost}
              checked={field.value}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
          )}
        />
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="space-y-2">
        <Label>Author</Label>
        <Controller
          control={control}
          name="author_id"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                {authors.map((admin) => (
                  <SelectItem key={admin.user_id} value={admin.user_id}>
                    {admin.display_name || `User ${admin.user_id}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="space-y-2">
        <Label>Slug</Label>
        <Controller
          control={control}
          name="slug"
          render={({ field }) => (
            <Input disabled {...field} placeholder="Slug" />
          )}
        />
      </div>
      <Button disabled={!isValid || isSubmittingPost} type="submit">
        {isSubmittingPost ? 'Submitting...' : 'Submit Post'}
      </Button>
    </form>
  );
};
