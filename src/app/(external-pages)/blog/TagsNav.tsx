import { Anchor } from '@/components/Anchor';
import { Button } from '@/components/ui/Button';
import { Table } from '@/types';

export function TagsNav({
  tags,
}: {
  tags: Table<'internal_blog_post_tags'>[];
}) {
  return (
    <div className="space-x-2 flex">
      <Anchor href="/blog">
        <Button variant="outline" className="mr-2 mb-2">
          All
        </Button>
      </Anchor>
      {tags.map((tag) => (
        <Anchor href={`/blog/tag/${tag.slug}`} key={tag.id}>
          <Button variant="outline" className="mr-2 mb-2">
            {tag.name}
          </Button>
        </Anchor>
      ))}
    </div>
  );
}
