CREATE TYPE internal_blog_post_status AS ENUM ('draft', 'published');

CREATE TABLE internal_blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE NOT NULL,
  STATUS internal_blog_post_status DEFAULT 'draft' NOT NULL,
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE internal_blog_author_posts (
  author_id UUID REFERENCES internal_blog_author_profiles(user_id) ON DELETE CASCADE,
  post_id UUID REFERENCES internal_blog_posts(id) ON DELETE CASCADE,
  PRIMARY KEY (author_id, post_id)
);

CREATE TABLE internal_blog_post_tags (
  id integer PRIMARY KEY generated always AS identity,
  slug text NOT NULL,
  name text NOT NULL,
  description text
);

-- Create a table to handle the blog post and tag relationship
CREATE TABLE internal_blog_post_tags_relationship (
  blog_post_id uuid NOT NULL REFERENCES internal_blog_posts (id) ON DELETE CASCADE,
  tag_id integer NOT NULL REFERENCES internal_blog_post_tags (id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, tag_id)
);




-- Enable RLS on table internal_blog_posts
-- Enable RLS on table internal_blog_posts
ALTER TABLE internal_blog_posts enable ROW LEVEL SECURITY;
ALTER TABLE internal_blog_author_profiles enable ROW LEVEL SECURITY;
ALTER TABLE internal_blog_author_posts enable ROW LEVEL SECURITY;
-- Enable RLS on table internal_blog_posts
-- Enable RLS on table internal_blog_posts
ALTER TABLE internal_blog_post_tags enable ROW LEVEL SECURITY;
ALTER TABLE internal_blog_post_tags_relationship enable ROW LEVEL SECURITY;


-- Policy: Anyone should be able to read internal_blog_posts
CREATE POLICY "Allow anyone to read admin blog posts" ON internal_blog_posts FOR
SELECT USING (TRUE);

-- Policy Anyone should be able to read internal_blog_author_profiles
CREATE POLICY "Allow anyone to read admin blog author profiles" ON internal_blog_author_profiles FOR
SELECT USING (TRUE);

-- Policy: Allow only authenticated users to create internal_blog_author_posts
CREATE POLICY "Allow  any to read admin blog author posts" ON internal_blog_author_posts FOR
SELECT USING (TRUE);


-- Policy: Anyone should be able to read internal_blog_posts
CREATE POLICY "Allow anyone to read admin blog post tags" ON internal_blog_post_tags FOR
SELECT USING (TRUE);

-- Policy Anyone should be able to read internal_blog_author_profiles
CREATE POLICY "Allow anyone to read admin blog tag relationships" ON internal_blog_post_tags_relationship FOR
SELECT USING (TRUE);


CREATE TABLE internal_changelog (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  changes TEXT NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE POLICY "Allow anyone to read changelog" ON internal_changelog FOR
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
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  priority internal_feedback_thread_priority DEFAULT 'low' NOT NULL,
  TYPE internal_feedback_thread_type DEFAULT 'general' NOT NULL,
  STATUS internal_feedback_thread_status DEFAULT 'open' NOT NULL,
  added_to_roadmap BOOLEAN DEFAULT FALSE NOT NULL,
  open_for_public_discussion BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE internal_feedback_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  thread_id UUID REFERENCES internal_feedback_threads(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
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

CREATE POLICY "Changelog is visible to everyone" ON internal_changelog FOR
SELECT USING (TRUE);