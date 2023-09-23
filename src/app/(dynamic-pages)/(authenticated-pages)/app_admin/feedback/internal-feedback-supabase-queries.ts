/**
 CREATE TABLE internal_changelog (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  changes TEXT NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE POLICY "Allow anyone to read changelog" ON internal_blog_posts FOR
SELECT USING (TRUE);

ALTER TABLE internal_blog_posts enable ROW LEVEL SECURITY;


CREATE TYPE internal_feedback_thread_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE internal_feedback_thread_type AS ENUM ('bug', 'feature_request', 'general');
CREATE TYPE internal_feedback_thread_status AS ENUM (
  'open',
  'under_review',
  'planned',
  'closed',
  'in_progress',
  'completed'
);

CREATE TABLE internal_feedback_threads (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  priority internal_feedback_thread_priority DEFAULT 'low',
  TYPE internal_feedback_thread_type DEFAULT 'general',
  STATUS internal_feedback_thread_status DEFAULT 'open',
  added_to_roadmap BOOLEAN DEFAULT FALSE,
  open_for_public_discussion BOOLEAN DEFAULT FALSE
);

CREATE TABLE internal_feedback_comments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  thread_id UUID REFERENCES internal_feedback_threads(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);



CREATE POLICY "Feedback Threads Visibility Policy" ON internal_feedback_threads FOR
SELECT USING (
    (
      STATUS = 'planned'
      OR STATUS = 'in_progress'
      OR STATUS = 'completed'
    )
    AND added_to_roadmap = TRUE
    OR user_id = auth.uid()
    OR open_for_public_discussion = TRUE
  );

CREATE POLICY "Feedback Threads Create Policy" ON internal_feedback_threads FOR
INSERT TO authenticated WITH CHECK (TRUE);

CREATE POLICY "Feedback Threads Owner Update Policy" ON internal_feedback_threads FOR
UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Feedback Threads Owner Delete Policy" ON internal_feedback_threads FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Feedback Comments policies
CREATE POLICY "Feedback Comments Create Policy" ON internal_feedback_comments FOR
INSERT TO authenticated WITH CHECK (TRUE);

CREATE POLICY "Feedback Comments Owner Update Policy" ON internal_feedback_comments FOR
UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Feedback Comments Owner Delete Policy" ON internal_feedback_comments FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Feedback Comments View Policy" ON internal_feedback_comments FOR
SELECT TO authenticated USING (TRUE);


ALTER TABLE internal_feedback_threads enable ROW LEVEL SECURITY;
ALTER TABLE internal_feedback_comments enable ROW LEVEL SECURITY;
ALTER TABLE internal_changelog enable ROW LEVEL SECURITY;
*/

import { AppSupabaseClient, Enum } from '@/types';

export async function getAllInternalFeedbackForUser(
  supabaseClient: AppSupabaseClient,
  userId: string
) {
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllInternalFeedback(
  supabaseClient: AppSupabaseClient,
  {
    query,
    types,
    statuses,
    priorities,
  }: {
    query: string;
    types: Array<Enum<'internal_feedback_thread_type'>>;
    statuses: Array<Enum<'internal_feedback_thread_status'>>;
    priorities: Array<Enum<'internal_feedback_thread_priority'>>;
  }
) {
  let supabaseQuery = supabaseClient
    .from('internal_feedback_threads')
    .select('*');

  if (query) {
    supabaseQuery = supabaseQuery.ilike('title', `%${query}%`);
  }

  if (types.length > 0) {
    supabaseQuery = supabaseQuery.in('type', types);
  }

  if (statuses.length > 0) {
    supabaseQuery = supabaseQuery.in('status', statuses);
  }

  if (priorities.length > 0) {
    supabaseQuery = supabaseQuery.in('priority', priorities);
  }

  const { data, error } = await supabaseQuery;

  if (error) {
    throw error;
  }

  return data;
}

export async function getInternalFeedbackById(
  supabaseClient: AppSupabaseClient,
  feedbackId: string
) {
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .select('*')
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }

  return data[0];
}

export async function updateInternalFeedbackStatus(
  supabaseClient: AppSupabaseClient,
  feedbackId: string,
  status: Enum<'internal_feedback_thread_status'>
) {
  const { error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ status })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }
}

export async function updateInternalFeedbackPriority(
  supabaseClient: AppSupabaseClient,
  feedbackId: string,
  priority: Enum<'internal_feedback_thread_priority'>
) {
  const { error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ priority })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }
}

export const updateInternalFeedbackType = async (
  supabaseClient: AppSupabaseClient,
  feedbackId: string,
  type: Enum<'internal_feedback_thread_type'>
) => {
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ type })
    .eq('id', feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

export async function createInternalFeedback(
  supabaseClient: AppSupabaseClient,
  userId: string,
  payload: {
    title: string;
    content: string;
    type: Enum<'internal_feedback_thread_type'>;
  }
) {
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .insert({
      title: payload.title,
      content: payload.content,
      type: payload.type,
      user_id: userId,
    })
    .select('*');

  if (error) {
    throw error;
  }

  return data[0];
}

export async function createInternalFeedbackComment(
  supabaseClient: AppSupabaseClient,
  feedbackId: string,
  userId: string,
  content: string
) {
  const { data, error } = await supabaseClient
    .from('internal_feedback_comments')
    .insert({ thread_id: feedbackId, user_id: userId, content })
    .select('*');

  if (error) {
    throw error;
  }

  return data[0];
}

export async function toggleFeedbackThreadVisibility(
  supabaseClient: AppSupabaseClient,
  threadId: string,
  isVisible: boolean
) {
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ added_to_roadmap: isVisible })
    .eq('id', threadId)
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function toggleFeedbackThreadDiscussion(
  supabaseClient: AppSupabaseClient,
  threadId: string,
  isOpen: boolean
) {
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ open_for_public_discussion: isOpen })
    .eq('id', threadId)
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function createChangelog(
  supabaseClient: AppSupabaseClient,
  title: string,
  changes: string
) {
  const { data, error } = await supabaseClient
    .from('internal_changelog')
    .insert({
      title,
      changes,
    })
    .select('*');

  if (error) {
    throw error;
  }

  return data[0];
}

export async function getChangelogById(
  supabaseClient: AppSupabaseClient,
  changelogId: string
) {
  const { data, error } = await supabaseClient
    .from('internal_changelog')
    .select('*')
    .eq('id', changelogId);

  if (error) {
    throw error;
  }

  return data[0];
}

export async function updateChangelog(
  supabaseClient: AppSupabaseClient,
  changelogId: string,
  title: string,
  changes: string
) {
  const { data, error } = await supabaseClient
    .from('internal_changelog')
    .update({
      title,
      changes,
    })
    .eq('id', changelogId)
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteChangelog(
  supabaseClient: AppSupabaseClient,
  changelogId: string
) {
  const { data, error } = await supabaseClient
    .from('internal_changelog')
    .delete()
    .eq('id', changelogId);

  if (error) {
    throw error;
  }

  return data;
}

export const getInternalFeedbackComments = async (
  supabaseClient: AppSupabaseClient,
  feedbackId: string
) => {
  const { data, error } = await supabaseClient
    .from('internal_feedback_comments')
    .select('*')
    .eq('thread_id', feedbackId);

  if (error) {
    throw error;
  }

  return data;
};

export const updateInternalFeedbackIsOpenForDiscussion = async (
  supabaseClient: AppSupabaseClient,
  feedbackId: string,
  isOpen: boolean
) => {
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ open_for_public_discussion: isOpen })
    .eq('id', feedbackId)
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const updateInternalFeedbackIsAddedToRoadmap = async (
  supabaseClient: AppSupabaseClient,
  feedbackId: string,
  isAdded: boolean
) => {
  const { data, error } = await supabaseClient
    .from('internal_feedback_threads')
    .update({ added_to_roadmap: isAdded })
    .eq('id', feedbackId)
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};

export const addCommentToInternalFeedbackThread = async (
  supabaseClient: AppSupabaseClient,
  feedbackId: string,
  userId: string,
  content: string
) => {
  const { data, error } = await supabaseClient
    .from('internal_feedback_comments')
    .insert({ thread_id: feedbackId, user_id: userId, content })
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};
