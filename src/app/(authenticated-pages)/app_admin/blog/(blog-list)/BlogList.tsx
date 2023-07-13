import React from 'react';
import moment from 'moment';
import { Table } from '@/types';
import { Anchor } from '@/components/Anchor';

function BlogList({ blogs }: { blogs: Table<'internal_blog_posts'>[] }) {
  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
          <p className="text-gray-600 mb-2">
            {blog.summary.slice(0, 100)}
            {blog.summary.length > 100 && '...'}
          </p>
          <p className="text-gray-400 text-sm">
            Published: {moment(blog.created_at).format('MMMM Do, YYYY')}
          </p>
          <div className="flex items-center justify-between">
            <Anchor href={`/app_admin/blog/post/${blog.id}/edit`}>
              Edit post
            </Anchor>
            <Anchor href={`/blog/${blog.slug}`}>View post</Anchor>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
