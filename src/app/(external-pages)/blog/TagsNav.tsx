import { Button } from '@/components/ui/Button';
import { Table } from '@/types';
import Link from 'next/link';

export function TagsNav({
  tags,
}: {
  tags: Table<'internal_blog_post_tags'>[];
}) {
  return (
    <div className="space-x-2 flex">
      <Link href="/blog">
        <Button variant="outline" className="mr-2 mb-2">
          All
        </Button>
      </Link>
      {tags.map((tag) => (
        <Link href={`/blog/tag/${tag.slug}`} key={tag.id}>
          <Button variant="outline" className="mr-2 mb-2">
            {tag.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
