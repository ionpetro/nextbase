alter table "public"."chats" add column "project_id" uuid not null;

alter table "public"."chats" add constraint "public_chats_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE not valid;

alter table "public"."chats" validate constraint "public_chats_project_id_fkey";


