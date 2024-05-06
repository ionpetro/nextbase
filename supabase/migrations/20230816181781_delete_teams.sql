-- delete teams
-- Migration script to drop team_members and teams tables
BEGIN;

-- Drop policies on 'projects' table that refer to teams or team_members
DROP POLICY IF EXISTS "Enable read access for all team members" ON "public"."projects";

-- Drop policies on 'project_comments' table that refer to teams or team_members
DROP POLICY IF EXISTS "All team members of a project can make project comments" ON "public"."project_comments";
DROP POLICY IF EXISTS "All team members of a project can read project comments" ON "public"."project_comments";

-- Drop policies related to 'teams'
DROP POLICY IF EXISTS "Enable insert for org admins only" ON "public"."teams";
DROP POLICY IF EXISTS "Enable read access for org admins or team members" ON "public"."teams";
DROP POLICY IF EXISTS "Enable update for org admins" ON "public"."teams";
DROP POLICY IF EXISTS "Enable delete for org admins only" ON "public"."teams";

-- Since policies related to 'team_members' are indirectly through functions, ensure to review and adjust or drop functions and related policies accordingly.
-- Drop functions related to 'teams' and 'team_members' tables
DROP FUNCTION IF EXISTS public.get_team_admins_by_team_id(bigint);
DROP FUNCTION IF EXISTS public.get_team_members_team_id(bigint);
DROP FUNCTION IF EXISTS public.get_organization_id_by_team_id(bigint);

-- Assuming no foreign key constraints are depending on these tables. If there are, they need to be dropped first.
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.teams CASCADE;

COMMIT;


-- recreate policies for projects but with only organizations and not teams
CREATE policy "Enable read access for all organization members" ON "public"."projects" AS permissive FOR
SELECT TO authenticated USING (
    (
      SELECT auth.uid()
    ) IN (
      SELECT get_organization_member_ids(projects.organization_id) AS get_organization_member_ids
    )
  );


-- recreate policies for project_comments but with only organizations and not teams
CREATE policy "All organization members of a project can read project comments" ON "public"."project_comments" AS permissive FOR
SELECT TO authenticated USING (
    (
      SELECT auth.uid()
    ) IN (
      SELECT get_organization_member_ids(get_organization_id_for_project_id(project_id)) AS get_organization_member_ids
    )
  );

  CREATE policy "All organization members of a project can make project comments" ON "public"."project_comments" AS permissive FOR
INSERT TO authenticated WITH CHECK (
    (
      (
        SELECT auth.uid()
      ) IN (
        SELECT "public"."get_organization_member_ids"(get_organization_id_for_project_id(project_id)) AS "get_organization_member_ids"
      )
    )
  );
