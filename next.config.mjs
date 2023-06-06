/** @type {import('next').NextConfig} */

import createWithMdx from '@next/mdx';
import remarkToc from 'remark-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import rehypeToc from 'rehype-toc';
import rehypeParse from 'rehype-parse';
import rehypeSlug from 'rehype-slug';
import rehypeSlugify from '@microflash/rehype-slugify';
import { select, selectAll } from 'hast-util-select';
import remarkFrontmatter from 'remark-frontmatter';
import { h } from 'hastscript';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

function rehypeWrapMainContent() {
  return (tree) => {
    let navNode;
    const nonNavNodes = tree.children?.filter((node) => {
      if (node.type === 'element' && node.tagName === 'TocNav') {
        navNode = node;
        return false;
      }
      return true;
    });

    if (navNode) {
      tree.children = [
        h('div.docs-main-contents', h('prose', nonNavNodes)),
        h('div.docs-toc', navNode),
      ];
    }

    return tree;
  };
}

const withMDX = createWithMdx({
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeToc,
        {
          headings: ['h2', 'h3'],
          customizeTOC: (toc) => {
            // change element from nav to TOCNav
            // We need this to be able to render a custom component in mdx-components
            // to replace the `a` tags with `Link` components
            toc.tagName = 'TocNav';
            return toc;
          },
        },
      ],
      rehypeWrapMainContent,
    ],
  },
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
    appDir: true,
  },
  reactStrictMode: true,
  // webpack: (config) => {
  //   if (typeof nextRuntime === 'undefined') {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //     };
  //   }

  //   return config;
  // },
};

export default withMDX(nextConfig);
