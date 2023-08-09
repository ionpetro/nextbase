'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { navigation } from './links';

export function Navigation({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-10">
        {navigation.map((section) => (
          <li key={section.title}>
            <h2 className="font-bold text-gray-800 mb-0 leading-4 dark:text-white">
              {section.title}
            </h2>
            <ul role="list" className="mt-2 ml-1  ">
              {section.links.map((link) => (
                <li key={link.href} className="relative flex items-center ">
                  <Link
                    href={link.href}
                    className={clsx(
                      'block w-full pl-4 before:pointer-events-none p-1.5 pr-2 rounded-lg transition hover:bg-gray-100 ',
                      link.href === pathname
                        ? 'font-medium text-gray-900 bg-zinc-100 '
                        : 'text-gray-600 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
                    )}
                  >
                    {link.title}
                  </Link>
                  {/* <div className="absolute w-px h-full flex items-start justify-start mt-3 ml-2 bg-zinc-200" >
                    <div className="absolute w-px h-5  mt-0 my-6 bg-zinc-400" />
                  </div> */}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
