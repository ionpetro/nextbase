DROP POLICY IF EXISTS "Feedback Threads Visibility Policy" ON internal_feedback_threads;

CREATE POLICY "Feedback Threads Visibility Policy" ON internal_feedback_threads FOR
SELECT USING (
    added_to_roadmap = TRUE
    OR user_id = auth.uid()
    OR open_for_public_discussion = TRUE
  );