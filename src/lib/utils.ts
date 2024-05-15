import { clsx, type ClassValue } from 'clsx';
import slugify from 'slugify';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSlug = async (title: string): Promise<string> => {
  const slug = slugify(title, {
    lower: true,
    strict: true,
    replacement: '-',
  });
  return slug
}
