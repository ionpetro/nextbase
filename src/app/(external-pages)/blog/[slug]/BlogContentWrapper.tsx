'use client';

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
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent jsonContent={jsonContent} />
    </Suspense>
  );
}
