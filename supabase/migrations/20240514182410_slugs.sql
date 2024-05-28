DO $$
BEGIN
    -- Check if the column 'slug' does not exist in the 'organizations' table
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema='public' AND table_name='organizations' AND column_name='slug'
    ) THEN
        -- Add the 'slug' column if it does not exist
        ALTER TABLE "public"."organizations"
        ADD COLUMN "slug" VARCHAR(255) UNIQUE NOT NULL DEFAULT gen_random_uuid()::text;

        -- Update the 'slug' column with unique UUIDs
        UPDATE "public"."organizations"
        SET "slug" = gen_random_uuid()::text;
    END IF;
END $$;

BEGIN;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema='public' AND table_name='projects' AND column_name='slug'
    ) THEN
        ALTER TABLE "public"."projects"
        ADD COLUMN "slug" VARCHAR(255) UNIQUE NOT NULL DEFAULT gen_random_uuid()::text;

        UPDATE "public"."projects"
        SET "slug" = gen_random_uuid()::text;
    END IF;
END $$;
COMMIT;
