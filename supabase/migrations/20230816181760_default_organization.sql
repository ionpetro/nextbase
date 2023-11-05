ALTER TABLE organizations
ADD COLUMN is_default BOOLEAN NOT NULL DEFAULT FALSE;


CREATE OR REPLACE FUNCTION "public"."handle_create_organization_for_auth_user"() RETURNS "trigger" LANGUAGE "plpgsql" SECURITY DEFINER AS $$BEGIN
INSERT INTO public.organizations (created_by, is_default)
VALUES (NEW.id, TRUE);
RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.handle_create_organization_for_auth_user
FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_create_organization_for_auth_user
FROM ANON;
