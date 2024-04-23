'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createChangelog } from '@/data/admin/internal-changelog';
import { uploadImage } from '@/data/admin/user';
import { useToastMutation } from '@/hooks/useToastMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const TipTap = dynamic(() => import('@/components/tip-tap-Editor/TipTap'), {
  ssr: false,
});

export type ChangelogType = {
  changelog_image: { name: string; url: string };
  title: string;
  content: string;
};

const CreateChangelogFormSchema = z.object({
  changelog_image: z.object({ name: z.string(), url: z.string() }).optional(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
});

export const CreateChangelogForm = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { mutate: upload } = useToastMutation(
    async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return await uploadImage(formData, file.name, {
        upsert: true,
      });
    },
    {
      loadingMessage: 'Uploading changelog banner image...',
      errorMessage: 'Failed to upload changelog banner image',
      successMessage: 'Changelog banner image uploaded!',
      onSuccess: (data) => {
        setIsUploading(false);
        setValue('changelog_image', {
          name: 'changelog_image',
          url: data,
        });
      },
    },
  );

  const submit: SubmitHandler<ChangelogType> = async (data) => {
    await createChangelog(data);
    router.push('/changelog');
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<ChangelogType>({
    resolver: zodResolver(CreateChangelogFormSchema),
    defaultValues: {
      title: '',
      content: '',
      changelog_image: {
        name: 'fallback_image',
        url: 'https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    },
  });

  return (
    <form
      className="max-w-3xl space-y-4"
      onSubmit={handleSubmit(submit)}
      data-testid="create-changelog-form"
    >
      <h1 className="text-2xl font-bold mb-4">Create Changelog</h1>
      <div className="flex flex-col gap-8">
        <Label htmlFor="inputImages">
          Upload cover image
          <Controller
            control={control}
            name="changelog_image"
            render={({ field }) => {
              return (
                <div
                  data-image={
                    watch('changelog_image.name') === 'fallback_image'
                  }
                  className="flex flex-col gap-4 mt-4 relative rounded-lg group min-h-64 items-center justify-center"
                >
                  <Button
                    type="button"
                    className="absolute w-fit inset-0 m-auto z-20 group-hover:flex hidden items-center justify-center gap-2 text-lg cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('inputImages')?.click();
                    }}
                  >
                    Change Image
                  </Button>

                  <Image
                    src={watch('changelog_image.url')}
                    alt={''}
                    className="w-full max-h-64 rounded-lg object-center group-hover:brightness-50 transition-all duration-200 ease-in-out object-cover border-2 cursor-pointer flex "
                    width={1920}
                    height={1080}
                  />

                  <input
                    data-testid="file-input"
                    id="inputImages"
                    disabled={isUploading}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        upload?.(file);
                      }
                    }}
                    type="file"
                    name="file-input"
                    hidden
                    accept="image/*"
                  />
                </div>
              );
            }}
          />
        </Label>
        <div className="flex w-full justify-between text-muted-foreground text-sm">
          <p>Hover and click to change the banner image</p>
          <p>Allowed *.jpeg, *.jpg, *.png</p>
          {errors.changelog_image && (
            <p className="text-red-400 text-sm">
              {errors.changelog_image.message}
            </p>
          )}
        </div>
      </div>
      <Label>Title</Label>
      <Input
        type="text"
        placeholder="Changelog Title"
        {...register('title')}
        name="title"
      />
      {errors.title && (
        <p className="text-red-400 text-sm">{errors.title.message}</p>
      )}
      <Label>Content</Label>
      <Card>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TipTap {...field} placeholder="Write your changelog here..." />
          )}
        />
      </Card>
      {errors.content && (
        <p className="text-red-400 text-sm">{errors.content.message}</p>
      )}

      <div className="w-full flex gap-4 self-end justify-end">
        <Button variant={'outline'} onClick={() => router.push('/changelog')}>
          Cancel
        </Button>
        <Button type="submit" name="submit-changelog">
          Create
        </Button>
      </div>
    </form>
  );
};
