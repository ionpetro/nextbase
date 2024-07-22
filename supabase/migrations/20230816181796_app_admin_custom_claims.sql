CREATE TYPE public.app_role AS enum ('admin');

-- USER ROLES
CREATE TABLE public.user_roles (
  id bigint generated by DEFAULT AS identity PRIMARY KEY,
  user_id uuid REFERENCES public.user_profiles ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

COMMENT ON TABLE public.user_roles IS 'Application roles for each user.';

-- enable row level security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
-- covering index
CREATE INDEX ON public.user_roles (user_id);

-- remove view
DROP VIEW IF EXISTS public.app_admin_all_users;

-- Update functions
CREATE OR REPLACE FUNCTION public.app_admin_get_all_users(
    search_query character varying DEFAULT ''::character varying,
    PAGE integer DEFAULT 1,
    page_size integer DEFAULT 20
  ) RETURNS TABLE(
    id uuid,
    email character varying,
    created_at timestamp WITH time zone,
    updated_at timestamp WITH time zone,
    full_name character varying,
    avatar_url character varying,
    is_app_admin boolean,
    confirmed_at timestamp WITH time zone,
    is_confirmed boolean,
    last_sign_in_at timestamp WITH time zone
  ) AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
RETURN QUERY
SELECT u.id,
  u.email,
  u.created_at,
  u.updated_at,
  up.full_name,
  up.avatar_url,
  (ur.role IS NOT NULL) AS is_app_admin,
  u.confirmed_at,
  (u.confirmed_at IS NOT NULL) AS is_confirmed,
  u.last_sign_in_at
FROM auth.users AS u
  JOIN public.user_profiles up ON u.id = up.id
  LEFT JOIN public.user_roles ur ON u.id = ur.user_id
  AND ur.role = 'admin'
WHERE (
    u.id::TEXT = search_query
    OR u.email ILIKE '%' || search_query || '%'
    OR up.full_name ILIKE '%' || search_query || '%'
  )
ORDER BY u.created_at DESC OFFSET (PAGE - 1) * page_size
LIMIT page_size;
END;
$$ LANGUAGE plpgsql;

REVOKE ALL ON FUNCTION public.app_admin_get_all_users
FROM PUBLIC;
REVOKE ALL ON FUNCTION public.app_admin_get_all_users
FROM ANON;
REVOKE ALL ON FUNCTION public.app_admin_get_all_users
FROM AUTHENTICATED;

CREATE OR REPLACE FUNCTION public.app_admin_get_all_users_count(
    search_query character varying DEFAULT ''::character varying
  ) RETURNS integer AS $$
DECLARE users_count integer;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;

SELECT COUNT(*) INTO users_count
FROM auth.users AS u
  JOIN public.user_profiles up ON u.id = up.id
  LEFT JOIN public.user_roles ur ON u.id = ur.user_id
  AND ur.role = 'admin'
WHERE (
    u.id::TEXT = search_query
    OR u.email ILIKE '%' || search_query || '%'
    OR up.full_name ILIKE '%' || search_query || '%'
  );

    RETURN users_count;
END;
$$ LANGUAGE plpgsql;

REVOKE ALL ON FUNCTION public.app_admin_get_all_users_count
FROM PUBLIC;
REVOKE ALL ON FUNCTION public.app_admin_get_all_users_count
FROM ANON;
REVOKE ALL ON FUNCTION public.app_admin_get_all_users_count
FROM AUTHENTICATED;


CREATE OR REPLACE FUNCTION public.app_admin_get_all_organizations_count (
    search_query character varying DEFAULT ''::character varying
  ) RETURNS bigint AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
RETURN (
  SELECT COUNT(*)
  FROM public.organizations p
    INNER JOIN public.organization_members owner_team_member ON p.id = owner_team_member.organization_id
    AND owner_team_member.member_role = 'owner'
    INNER JOIN public.user_profiles up ON owner_team_member.member_id = up.id
    LEFT JOIN public.user_roles ur ON owner_team_member.member_id = ur.user_id
    AND ur.role = 'admin'
  WHERE p.id::TEXT = search_query
    OR p.title ILIKE '%' || search_query || '%'
    OR up.full_name ILIKE '%' || search_query || '%'
    OR EXISTS (
      SELECT 1
      FROM auth.users au
      WHERE au.id = owner_team_member.member_id
        AND au.email ILIKE '%' || search_query || '%'
    )
);
END;
$$ LANGUAGE plpgsql;

REVOKE ALL ON FUNCTION public.app_admin_get_all_organizations_count
FROM PUBLIC;
REVOKE ALL ON FUNCTION public.app_admin_get_all_organizations_count
FROM ANON;
REVOKE ALL ON FUNCTION public.app_admin_get_all_organizations_count
FROM AUTHENTICATED;


CREATE OR REPLACE FUNCTION public.app_admin_get_recent_30_day_signin_count() RETURNS INTEGER AS $$
DECLARE signin_count INTEGER;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
SELECT COUNT(*) INTO signin_count
FROM auth.users
WHERE last_sign_in_at >= CURRENT_DATE - INTERVAL '30 DAYS';

RETURN signin_count;
END;
$$ LANGUAGE plpgsql;

REVOKE ALL ON FUNCTION public.app_admin_get_recent_30_day_signin_count
FROM PUBLIC;
REVOKE ALL ON FUNCTION public.app_admin_get_recent_30_day_signin_count
FROM ANON;
REVOKE ALL ON FUNCTION public.app_admin_get_recent_30_day_signin_count
FROM AUTHENTICATED;