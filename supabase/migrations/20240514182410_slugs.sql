BEGIN;

ALTER TABLE "public"."organizations"
ADD COLUMN "slug" VARCHAR(255) UNIQUE NOT NULL DEFAULT gen_random_uuid()::text;

UPDATE "public"."organizations"
SET "slug" = gen_random_uuid()::text;

COMMIT;

BEGIN;

ALTER TABLE "public"."projects"
ADD COLUMN "slug" VARCHAR(255) UNIQUE NOT NULL DEFAULT gen_random_uuid()::text;

UPDATE "public"."projects"
SET "slug" = gen_random_uuid()::text;

COMMIT;