'use client';

import { TiptapExtensions } from '@/components/TipTapEditor/extensions';
import { Table } from '@/types';
import { generateHTML } from '@tiptap/core';

export function BlogContent({
  jsonContent,
}: {
  jsonContent: Table<'internal_blog_posts'>['json_content'];
}) {
  const validContent =
    typeof jsonContent === 'string'
      ? JSON.parse(jsonContent)
      : typeof jsonContent === 'object' && jsonContent !== null
        ? jsonContent
        : {};
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: generateHTML(validContent, TiptapExtensions),
      }}
    ></div>
  );
}
