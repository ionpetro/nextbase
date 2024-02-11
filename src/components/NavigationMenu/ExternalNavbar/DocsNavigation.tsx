'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from './docslinks';

type NavigationProps = {
  className?: string;
  setIsOpen?: (isOpen: boolean) => void;
};

export function DocsNavigation({ className, setIsOpen }: NavigationProps) {
  const pathname = usePathname();
  const handleClick = () => {
    setTimeout(() => {
      setIsOpen?.(false);
    }, 500);
  };

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        {navigation.map((section) => (
          <li key={section.title} onClick={handleClick}>
            <h2 className="font-display font-medium text-slate-900 dark:text-white">
              {section.title}
            </h2>
            <ul role="list" className="mt-2 space-y-2 lg:mt-2 lg:space-y-2.5">
              {section.links.map((link) => (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={clsx(
                      'block w-full',
                      link.href === pathname
                        ? 'font-semibold text-blue-500 dark:text-blue-400 before:bg-blue-500 dark:before:bg-blue-400'
                        : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300',
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
