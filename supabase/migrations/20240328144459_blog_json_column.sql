BEGIN;

ALTER TABLE internal_blog_posts
ADD COLUMN json_content JSONB NOT NULL DEFAULT '{}';

COMMIT;