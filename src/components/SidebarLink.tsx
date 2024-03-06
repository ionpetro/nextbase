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
  isPro?: boolean;
};

export function SidebarLink({ label, href, icon, isPro }: SidebarLinkProps) {
  const { setVisibility } = useContext(SidebarVisibilityContext);
  const isMobile = useMatchMedia(MOBILE_MEDIA_QUERY_MATCHER);

  return (
    <div
      key={href}
      className=" hover:cursor-pointer hover:text-foreground text-muted-foreground rounded-md hover:bg-accent group w-full flex items-center pr-2"
    >
      <div className="p-2 group-hover:text-foreground">{icon}</div>
      <Link
        onClick={() => isMobile && setVisibility(false)}
        className="p-2 w-full text-sm group-hover:text-gray-800 dark:group-hover:text-slate-300"
        href={href}
      >
        {label}
      </Link>
      {isPro && (
        <T.P className="text-xs rounded-md px-2 py-1 uppercase font-medium bg-muted text-foreground ">
          Pro
        </T.P>
      )}
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
      className=" hover:cursor-pointer hover:text-foreground text-muted-foreground rounded-md hover:bg-accent group w-full flex items-center pr-2"
    >
      <div className="p-2 group-hover:text-foreground">{icon}</div>
      <T.P className="p-2 w-full text-sm group-hover:text-foreground ">
        {label}
      </T.P>
    </div>
  );
}
