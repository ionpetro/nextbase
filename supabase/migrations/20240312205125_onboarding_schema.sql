CREATE TABLE "public"."user_onboarding" (
  "user_id" uuid NOT NULL PRIMARY KEY REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE,
  "created_at" timestamp WITH time zone NOT NULL DEFAULT NOW(),
  "accepted_terms" boolean NOT NULL DEFAULT false
);

ALTER TABLE "public"."user_onboarding" enable ROW LEVEL SECURITY;

CREATE policy "Enable insert for authenticated users only" ON "public"."user_onboarding" AS permissive FOR
INSERT TO authenticated WITH CHECK (
    (
      SELECT auth.uid()
    ) = user_id
  );

CREATE policy "Users can view their onboarding status" ON "public"."user_onboarding" AS permissive FOR
SELECT TO authenticated USING (
    (
      SELECT auth.uid()
    ) = user_id
  );

CREATE policy "Users can update their onboarding status" ON "public"."user_onboarding" AS permissive FOR
UPDATE TO authenticated USING (
    (
      SELECT auth.uid()
    ) = user_id
  );
