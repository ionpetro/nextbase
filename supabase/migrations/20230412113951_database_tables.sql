CREATE TABLE "public"."app_admins" (
  "user_id" text NOT NULL,
  "role" app_admin_role
);


ALTER TABLE "public"."app_admins" enable ROW LEVEL SECURITY;


CREATE TABLE "public"."organization_credits" (
  "organization_id" uuid NOT NULL,
  "credits" bigint NOT NULL DEFAULT '12'::bigint
);


ALTER TABLE "public"."organization_credits" enable ROW LEVEL SECURITY;
-- make organization_id a primary key
ALTER TABLE ONLY "public"."organization_credits"
ADD CONSTRAINT "organization_credits_pkey" PRIMARY KEY ("organization_id");

ALTER TABLE ONLY "public"."organization_credits"
ADD CONSTRAINT "organization_credits_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id");


CREATE TABLE "public"."team_members" (
  "id" bigint generated by DEFAULT AS identity NOT NULL,
  "created_at" timestamp WITH time zone DEFAULT NOW(),
  "user_id" uuid NOT NULL REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE,
  "role" project_team_member_role NOT NULL DEFAULT 'member'::project_team_member_role,
  "team_id" bigint NOT NULL
);

CREATE TABLE "public"."teams" (
  "id" bigint generated by DEFAULT AS identity NOT NULL,
  "created_at" timestamp WITH time zone DEFAULT NOW(),
  "organization_id" uuid NOT NULL,
  "name" text NOT NULL
);

ALTER TABLE "public"."teams" enable ROW LEVEL SECURITY;

CREATE TABLE "public"."projects" (
  "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
  "name" text NOT NULL,
  "created_at" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "organization_id" uuid NOT NULL,
  "team_id" bigint,
  "project_status" project_status NOT NULL DEFAULT 'draft'::project_status
);

ALTER TABLE "public"."projects" enable ROW LEVEL SECURITY;
ALTER TABLE ONLY "public"."projects"
ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");

CREATE TABLE "public"."project_comments" (
  "id" bigint generated by DEFAULT AS identity NOT NULL,
  "created_at" timestamp WITH time zone DEFAULT NOW(),
  "text" text NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE,
  "in_reply_to" bigint,
  "project_id" uuid NOT NULL
);

ALTER TABLE "public"."project_comments" enable ROW LEVEL SECURITY;
ALTER TABLE ONLY "public"."project_comments"
ADD CONSTRAINT "project_comments_pkey" PRIMARY KEY ("id");


-- covering index for project_comments
CREATE INDEX ON "public"."project_comments" ("user_id");
CREATE INDEX ON "public"."project_comments" ("project_id");
