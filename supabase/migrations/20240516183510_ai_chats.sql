CREATE TABLE "public"."chats" (
  "id" text NOT NULL,
  "user_id" uuid NULL,
  "payload" jsonb,
  "created_at" timestamp WITH time zone DEFAULT timezone('utc'::text, NOW()) NOT NULL
);

CREATE UNIQUE INDEX chats_pkey ON public.chats USING btree (id);

ALTER TABLE "public"."chats"
ADD CONSTRAINT "chats_pkey" PRIMARY KEY USING INDEX "chats_pkey";

ALTER TABLE "public"."chats"
ADD CONSTRAINT "chats_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE NOT valid;

ALTER TABLE "public"."chats" validate CONSTRAINT "chats_user_id_fkey";

-- Create a function to set the default user_id
CREATE FUNCTION set_default_user_id() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    NEW.user_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function before insert
CREATE TRIGGER set_user_id_before_insert
BEFORE INSERT ON "public"."chats"
FOR EACH ROW
EXECUTE FUNCTION set_default_user_id();

-- RLS
ALTER TABLE "public"."chats" enable ROW LEVEL SECURITY;

CREATE policy "Allow full access to own chats" ON "public"."chats" AS permissive FOR ALL TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));
