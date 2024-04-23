-- Drop app_admins table
DROP TABLE IF EXISTS "public"."app_admins";

DROP FUNCTION IF EXISTS "public"."make_user_app_admin"("user_id" "uuid");
CREATE OR REPLACE FUNCTION "public"."make_user_app_admin"("user_id_arg" "uuid") RETURNS "void" AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;

INSERT INTO public.user_roles (user_id, role)
VALUES (user_id_arg, 'admin') ON CONFLICT (user_id, role) DO NOTHING;
END;
$$ LANGUAGE "plpgsql";
ALTER FUNCTION "public"."make_user_app_admin"("user_id_arg" "uuid") OWNER TO "postgres";
REVOKE ALL ON FUNCTION public.make_user_app_admin
FROM PUBLIC;
REVOKE ALL ON FUNCTION public.make_user_app_admin
FROM ANON;
REVOKE ALL ON FUNCTION public.make_user_app_admin
FROM AUTHENTICATED;

DROP FUNCTION IF EXISTS "public"."remove_app_admin_privilege_for_user"("user_id" "uuid");
CREATE OR REPLACE FUNCTION "public"."remove_app_admin_privilege_for_user"("user_id_arg" "uuid") RETURNS "void" AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
DELETE FROM public.user_roles
WHERE user_id = user_id_arg
  AND role = 'admin';
END;
$$ LANGUAGE "plpgsql";
ALTER FUNCTION "public"."remove_app_admin_privilege_for_user"("user_id_arg" "uuid") OWNER TO "postgres";
REVOKE ALL ON FUNCTION public.remove_app_admin_privilege_for_user
FROM PUBLIC;
REVOKE ALL ON FUNCTION public.remove_app_admin_privilege_for_user
FROM ANON;
REVOKE ALL ON FUNCTION public.remove_app_admin_privilege_for_user
FROM AUTHENTICATED;
