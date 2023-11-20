import type { MDXComponents } from 'mdx/types';
import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { HashLink } from './/HashLink';
import { PrismSyntaxHighlight } from './/PrismSyntaxHighlight';

type TocNavProps = HTMLAttributes<HTMLElement>;

export const TocNav: React.FC<TocNavProps> = ({ children, ...props }) => {
  return (
    <nav
      aria-labelledby="on-this-page-title"
      {...props}
      className={cn('docs-toc-nav text-blue-500', 'w-56')}
    >
      <h2
        id="on-this-page-title"
        className="text-sm font-bold text-slate-900 dark:text-white"
      >
        On this page
      </h2>
      {children}
    </nav>
  );
};

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

export const customMDXComponents: MDXComponents = {
  a: ({ children, href, className, ref: _ref, ...props }) => {
    if (!href) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
    const isTocLink = href.startsWith('#');
    if (isTocLink) {
      return (
        <HashLink href={href} {...props}>
          {children}
        </HashLink>
      );
    }
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  },
  pre: ({ children, className, ...props }) => {
    return (
      <PrismSyntaxHighlight className={className} {...props}>
        {children}
      </PrismSyntaxHighlight>
    );
  },
  TocNav,
  prose: ({ as: Component = 'div', className, ...props }) => {
    return (
      <Component
        className={cn(
          className,
          'prose prose-slate max-w-none dark:prose-invert dark:text-slate-400',
          // headings
          'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]',
          // lead
          'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
          // links
          'prose-a:font-semibold dark:prose-a:text-sky-400',
          // link underline
          'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]',
          // pre
          'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
          // hr
          'dark:prose-hr:border-slate-800',
        )}
        {...props}
      />
    );
  },
};

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,
    ...customMDXComponents,
  };
}
