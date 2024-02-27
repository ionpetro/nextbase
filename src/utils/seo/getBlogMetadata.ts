import { Metadata } from 'next';
import { toSiteURL } from '../helpers';

export function getBlogMetadata({
  title,
  keywords,
  description,
  path,
}: {
  title: string;
  keywords?: Array<string> | undefined;
  description: NonNullable<Metadata['description']>;
  path: string;
}): Metadata {
  const effectiveTitle = `${title} | Nextbase Starter Kit Blog`;
  const effectiveKeywords = [
    ...(keywords ? keywords : []),
    'blog',
    'nextbase starter kit',
    'nextbase blog',
    'nextjs',
  ];
  return {
    title: effectiveTitle,
    keywords: effectiveKeywords,
    description,
    openGraph: {
      title: effectiveTitle,
      description: description,
      url: toSiteURL(path),
      type: 'website',
      images: [
        {
          url: `/blog-og/${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      images: [
        {
          url: `/blog-og/${encodeURIComponent(title)}`,
        },
      ],
    },
  };
}
