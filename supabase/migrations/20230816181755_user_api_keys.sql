-- supabase/migrations/20230509120000_user_api_keys.sql
CREATE TABLE "public"."user_api_keys" (
  "key_id" text PRIMARY KEY,
  "masked_key" text NOT NULL,
  "created_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "user_id" uuid NOT NULL,
  "expires_at" timestamp WITH time zone,
  "is_revoked" boolean NOT NULL DEFAULT false
);

-- supabase/migrations/20230509121000_user_api_keys_rls.sql
ALTER TABLE "public"."user_api_keys" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User can select their own keys" ON "public"."user_api_keys" FOR
SELECT USING (auth.uid() = user_id);

CREATE POLICY "User can insert their own keys" ON "public"."user_api_keys" FOR
INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can update their own keys" ON "public"."user_api_keys" FOR
UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
