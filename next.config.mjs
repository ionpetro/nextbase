/** @type {import('next').NextConfig} */

import createWithMdx from '@next/mdx';
import rehypeToc from 'rehype-toc';
import rehypeSlug from 'rehype-slug';
import { h } from 'hastscript';
import { withSentryConfig } from '@sentry/nextjs';
import createWithBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createWithBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: process.env.ANALYZE === 'true',
});

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
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },
};

export default withBundleAnalyzer(withSentryConfig(withMDX(nextConfig)));
