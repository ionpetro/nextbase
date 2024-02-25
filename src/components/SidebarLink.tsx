'use client';
import { T } from '@/components/ui/Typography';
import { MOBILE_MEDIA_QUERY_MATCHER } from '@/constants';
import { SidebarVisibilityContext } from '@/contexts/SidebarVisibilityContext';
import useMatchMedia from '@/hooks/useMatchMedia';
import Link from 'next/link';
import { useContext } from 'react';

type SidebarLinkProps = {
  label: string;
  href: string;
  icon: JSX.Element;
};

export function SidebarLink({ label, href, icon }: SidebarLinkProps) {
  const { setVisibility } = useContext(SidebarVisibilityContext);
  const isMobile = useMatchMedia(MOBILE_MEDIA_QUERY_MATCHER);

  return (
    <div
      key={href}
      className="text-gray-500 hover:cursor-pointer dark:text-slate-400 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 group w-full flex items-center"
    >
      <div className="p-2 group-hover:text-gray-800 dark:group-hover:text-slate-300">
        {icon}
      </div>
      <Link
        onClick={() => isMobile && setVisibility(false)}
        className="p-2 w-full text-sm group-hover:text-gray-800 dark:group-hover:text-slate-300"
        href={href}
      >
        {label}
      </Link>
    </div>
  );
}

type SidebarItemProps = {
  label: string;
  icon: JSX.Element;
};

export function SidebarItem({ label, icon }: SidebarItemProps) {
  return (
    <div
      key={label}
      className="text-gray-500 hover:cursor-pointer dark:text-slate-400 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 group w-full flex items-center"
    >
      <div className="p-2 group-hover:text-gray-800 dark:group-hover:text-slate-300">
        {icon}
      </div>
      <T.P className="p-2 w-full text-sm group-hover:text-gray-800 dark:group-hover:text-slate-300">
        {label}
      </T.P>
    </div>
  );
}
