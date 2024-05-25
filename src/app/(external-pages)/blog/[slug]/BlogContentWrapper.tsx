'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Table } from '@/types';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const BlogContent = dynamic(
  () => import('./BlogContent').then((m) => m.BlogContent),
  { ssr: false },
);

export function BlogContentWrapper({
  jsonContent,
}: {
  jsonContent: Table<'internal_blog_posts'>['json_content'];
}) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-6" />}>
      <BlogContent jsonContent={jsonContent} />
    </Suspense>
  );
}
