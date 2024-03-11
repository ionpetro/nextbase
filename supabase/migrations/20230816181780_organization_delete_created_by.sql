-- Migration to delete the 'created_by' column from the 'organizations' table
ALTER TABLE "public"."organizations" DROP CONSTRAINT "organizations_created_by_fkey";

-- We need to drop the policies that refer to the 'created_by' column
DROP POLICY "All team members can read organizations" ON "public"."organizations";
DROP POLICY "All organization members can read organizations" ON "public"."organizations";

BEGIN;

ALTER TABLE organizations DROP COLUMN IF EXISTS created_by;

COMMIT;



CREATE policy "All organization members can read organizations v2" ON "public"."organizations" AS permissive FOR
SELECT TO authenticated USING (
    (
      auth.uid() IN (
        SELECT get_organization_member_ids(organizations.id) AS get_organization_member_ids
      )
    )
  );