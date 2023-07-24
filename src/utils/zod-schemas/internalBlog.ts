import { z } from 'zod';

export const authorProfileSchema = z.object({
  user_id: z.string(),
  display_name: z.string(),
  bio: z.string(),
  avatar_url: z.string(),
  website_url: z.string().optional(),
  twitter_handle: z.string().optional(),
  facebook_handle: z.string().optional(),
  linkedin_handle: z.string().optional(),
  instagram_handle: z.string().optional(),
});

export const internalBlogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  is_featured: z.boolean(),
  status: z.enum(['draft', 'published']),
  cover_image: z.string().optional(),
  author_id: z.string(),
  tag_ids: z.array(z.number()),
});

export type InternalBlogPostSchema = z.infer<typeof internalBlogPostSchema>;
