/** 
 * CREATE TYPE internal_blog_post_status AS ENUM ('draft', 'published');

CREATE TABLE internal_blog_posts (
  id UUID PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_featured BOOLEAN DEFAULT FALSE,
  STATUS internal_blog_post_status DEFAULT 'draft',
  cover_image VARCHAR(255),
  seo_data JSONB
);

CREATE TABLE internal_blog_author_profiles (
  user_id UUID PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  avatar_url VARCHAR(255) NOT NULL,
  website_url VARCHAR(255),
  twitter_handle VARCHAR(255),
  facebook_handle VARCHAR(255),
  linkedin_handle VARCHAR(255),
  instagram_handle VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE internal_blog_author_posts (
  author_id UUID REFERENCES internal_blog_author_profiles(user_id) ON DELETE CASCADE,
  post_id UUID REFERENCES internal_blog_posts(id) ON DELETE CASCADE,
  PRIMARY KEY (author_id, post_id)
);

-- Policy: Anyone should be able to read internal_blog_posts
CREATE POLICY "Allow anyone to read admin blog posts" ON internal_blog_posts FOR
SELECT USING (TRUE);

-- Enable RLS on table internal_blog_posts
-- Enable RLS on table internal_blog_posts
ALTER TABLE internal_blog_posts enable ROW LEVEL SECURITY;
ALTER TABLE internal_blog_author_profiles enable ROW LEVEL SECURITY;
ALTER TABLE internal_blog_author_posts enable ROW LEVEL SECURITY;

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

/**
 * 

export const updateUserName = async (
  supabase: AppSupabaseClient,
  user: User,
  name: string
) => {
  await supabase
    .from('user_profiles')
    .update({
      full_name: name,
    })
    .eq('id', user.id);
};

export const getAllOrganizationsForUser = async (
  supabase: AppSupabaseClient,
  userId: string
) => {
  const { data: organizations, error: organizationsError } = await supabase.rpc(
    'get_organizations_for_user',
    {
      user_id: userId,
    }
  );
  if (!organizations) {
    throw new Error(organizationsError.message);
  }

  const { data, error } = await supabase
    .from('organizations')
    .select(
      '*, organization_members(id,member_id,member_role, user_profiles(*)), subscriptions(id, prices(id,products(id,name)))'
    )
    .in(
      'id',
      organizations.map((org) => org.organization_id)
    )
    .order('created_at', {
      ascending: false,
    });
  if (error) {
    throw error;
  }

  return data || [];
};

export const getOrganizationById = async (
  supabase: AppSupabaseClient,
  organizationId: string
) => {
  const { data, error } = await supabase
    .from('organizations')
    // query team_members and team_invitations in one go
    .select('*')
    .eq('id', organizationId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const createOrganization = async (
  supabase: AppSupabaseClient,
  user: User,
  name: string
) => {
  const { data, error } = await supabase
    .from('organizations')
    .insert({
      title: name,
      created_by: user.id,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateOrganizationTitle = async (
  supabase: AppSupabaseClient,
  organizationId: string,
  title: string
): Promise<Table<'organizations'>> => {
  const { data, error } = await supabase
    .from('organizations')
    .update({
      title,
    })
    .eq('id', organizationId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getMembersInOrganization = async (
  supabase: AppSupabaseClient,
  organizationId: string
) => {
  const { data, error } = await supabase
    .from('organization_members')
    .select('*, user_profiles(*)')
    .eq('organization_id', organizationId);

  if (error) {
    throw error;
  }

  return data || [];
};

export const getPendingTeamInvitationsInOrganization = async (
  supabase: AppSupabaseClient,
  organizationId: string
) => {
  const { data, error } = await supabase
    .from('organization_join_invitations')
    .select(
      '*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*)'
    )
    .eq('organization_id', organizationId)
    .eq('status', 'active');

  if (error) {
    throw error;
  }

  return data || [];
};

export const getOrganizationSubscription = async (
  supabase: AppSupabaseClient,
  organizationId: string
) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .eq('organization_id', organizationId)
    .in('status', ['trialing', 'active'])
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getUserOrganizationRole = async (
  supabase: AppSupabaseClient,
  userId: string,
  organizationId: string
): Promise<Enum<'organization_member_role'>> => {
  const { data, error } = await supabase
    .from('organization_members')
    .select('*')
    .eq('member_id', userId)
    .eq('organization_id', organizationId)
    .single();

  if (error) {
    throw error;
  } else if (!data) {
    throw new Error('User is not a member of this organization');
  }

  return data.member_role;
};

 */

import { AppSupabaseClient, Enum, Table } from '@/types';

export const createAuthorProfile = async (
  supabase: AppSupabaseClient,
  payload: Omit<
    Table<'internal_blog_author_profiles'>,
    'created_at' | 'updated_at'
  >
) => {
  const { data, error } = await supabase
    .from('internal_blog_author_profiles')
    .insert(payload)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const createBlogPost = async (
  supabase: AppSupabaseClient,
  authorId: string,
  payload: Omit<Table<'internal_blog_posts'>, 'created_at' | 'updated_at'>
) => {
  const { data, error } = await supabase
    .from('internal_blog_posts')
    .insert(payload)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  // assign to author
  await supabase.from('internal_blog_author_posts').insert({
    author_id: authorId,
    post_id: data.id,
  });

  return data;
};

export const getBlogPostById = async (
  supabase: AppSupabaseClient,
  postId: string
) => {
  const { data, error } = await supabase
    .from('internal_blog_posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getBlogPostsByAuthorId = async (
  supabase: AppSupabaseClient,
  authorId: string
) => {
  const { data, error } = await supabase
    .from('internal_blog_author_posts')
    .select('*, internal_blog_posts(*)')
    .eq('author_id', authorId);

  if (error) {
    throw error;
  }

  return data;
};
