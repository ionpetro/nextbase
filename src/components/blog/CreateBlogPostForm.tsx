'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { TagsMultiInsert } from '../TagsMultiInsert/TagsMultiInsert';
import TipTap from '../tip-tap-Editor/TipTap';
import { T } from '../ui/Typography';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

export const blogSchema = z.object({
  title: z.string(),
  content: z.string(),
  slug: z.string(),
  isHighlighted: z.boolean(),
  image: z.string().url(),
  summary: z.string(),
  tags: z.string().array(),
  author: z.string(),
});

export type blogSchemaType = z.infer<typeof blogSchema>;

export const CreateBlogPostForm = () => {
  const methods = useForm<blogSchemaType>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      content: 'Default content for blog post',
      slug: 'default-slug',
      isHighlighted: false,
      image: '/mockups/laptop.jpeg',
      summary: 'Default summary for blog post',
      tags: [],
    },
  });

  const watchAllFields = methods.watch();

  console.log(watchAllFields);

  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [isNewAvatarImageLoading, setIsNewAvatarImageLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const fileUrl = URL.createObjectURL(event.target.files[0]);
      setSelectedImage(fileUrl);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const MotionImage = motion(Image);

  useEffect(() => {
    return () => {
      if (selectedImage) URL.revokeObjectURL(selectedImage);
    };
  }, [selectedImage]);

  const onSubmit = (data: blogSchemaType) => {
    console.log(data);
  };

  return (
    <div>
      <div className="col-span-4 flex w-full justify-between items-center py-2">
        <h1 className="text-xl font-medium">Create blog post</h1>
        <Link href={'/app_admin/configure-domains'} replace>
          <Button variant="outline" className="w-fit self-end flex gap-2">
            <Settings size={16} /> Configure Domains
          </Button>
        </Link>
      </div>
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-5 gap-2"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Card className="h-96 col-span-3">
            <Controller
              {...methods.register('content')}
              control={methods.control}
              render={({ field }) => <TipTap {...field} />}
            />
          </Card>

          <Card className="p-4 flex h-fit col-span-2 flex-col gap-4">
            <T.P className="mt-2">Blog post slug</T.P>
            <Input
              placeholder="this-is-the-blog-post"
              {...methods.register('slug')}
            />
            <div className="flex w-full justify-between">
              <div>
                <T.P>Feature blog post</T.P>
                <T.Small className="text-muted-foreground">
                  Highlights your article for increased visibility
                </T.Small>
              </div>
              <Controller
                name="isHighlighted"
                control={methods.control}
                render={({ field }) => (
                  <Switch onCheckedChange={field.onChange} />
                )}
              />
            </div>
            <T.P>Cover Image</T.P>
            <Label
              className="inline p-0 m-0 cursor-pointer text-muted-foreground"
              htmlFor="file-input"
            >
              <MotionImage
                animate={{
                  opacity: isNewAvatarImageLoading ? [0.5, 1, 0.5] : 1,
                }}
                transition={
                  /* eslint-disable */
                  isNewAvatarImageLoading
                    ? {
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }
                    : undefined
                  /* eslint-enable */
                }
                onLoad={(file) => {
                  setIsNewAvatarImageLoading(false);
                }}
                onError={() => {
                  setIsNewAvatarImageLoading(false);
                }}
                loading="eager"
                width={800}
                height={600}
                className="h-40 object-center object-cover w-full rounded-lg"
                src={selectedImage ? selectedImage : '/mockups/laptop.jpeg'}
                alt="avatarUrl"
              />
            </Label>
            <input
              {...methods.register('image')}
              disabled={isNewAvatarImageLoading}
              ref={fileInputRef}
              onChange={handleFileChange}
              type="file"
              hidden
              name="file-input"
              id="file-input"
              accept="image/*"
            />
            <T.P>Summary</T.P>
            <Textarea
              {...methods.register('summary')}
              className="resize-none"
              placeholder="A short summary of the blog post"
              {...methods.register('summary')}
            />
            <T.P>Tags</T.P>
            <TagsMultiInsert />
            <T.P>Author</T.P>
            <Controller
              control={methods.control}
              name="author"
              render={({ field }) => {
                return (
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an author" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">John Doe</SelectItem>
                        <SelectItem value="2">Jane Doe</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
            <div className="flex justify-between mt-8">
              <Button variant={'outline'} type="button">
                Save as Draft
              </Button>
              <Button type="submit">Publish Post</Button>
            </div>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
};
