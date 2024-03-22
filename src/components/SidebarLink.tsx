'use client';
import { T } from '@/components/ui/Typography';
import { MOBILE_MEDIA_QUERY_MATCHER } from '@/constants';
import { SidebarVisibilityContext } from '@/contexts/SidebarVisibilityContext';
import useMatchMedia from '@/hooks/useMatchMedia';
import Link from 'next/link';
import React, { useContext } from 'react';

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
    </div>
  );
}

type SidebarItemProps = React.PropsWithChildren<{
  label: string;
  icon: JSX.Element;
}> & { props?: React.HTMLProps<HTMLDivElement> };

export const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(
  ({ label, icon, ...props }, ref) => {
    return (
      <div
        key={label}
        className="hover:cursor-pointer hover:text-foreground text-muted-foreground rounded-md hover:bg-accent group w-full flex items-center pr-2"
        ref={ref}
        {...props}
      >
        <div className="p-2 group-hover:text-foreground">{icon}</div>
        <T.P className="p-2 w-full text-sm group-hover:text-foreground">
          {label}
        </T.P>
      </div>
    );
  },
);
