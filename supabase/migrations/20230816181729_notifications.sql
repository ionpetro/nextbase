CREATE TABLE user_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  is_seen BOOLEAN NOT NULL DEFAULT FALSE,
  payload JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "public"."user_notifications" ENABLE ROW LEVEL SECURITY;
ALTER PUBLICATION supabase_realtime
ADD TABLE user_notifications;


CREATE policy Only_user_can_read_their_own_notification ON user_notifications AS permissive FOR
SELECT TO authenticated USING ((auth.uid () = user_id));

CREATE policy Only_user_can_update_their_notification ON user_notifications AS permissive FOR
UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE policy Only_user_can_delete_their_notification ON user_notifications AS permissive FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE policy Any_user_can_create_notification ON user_notifications AS permissive FOR
INSERT TO authenticated WITH CHECK (TRUE);