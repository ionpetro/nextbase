'use client';
import { Anchor } from '@/components/Anchor';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useContext } from 'react';
import { MobileMenuContext } from './MobileMenuContext';
import { navbarLinks } from './constants';

export function MobileMenu() {
  const { setMobileMenuOpen, mobileMenuOpen } = useContext(MobileMenuContext);
  return (
    <>
      {mobileMenuOpen && (
        <ul className="md:hidden w-full shadow-2xl py-2 flex flex-col items-start font-medium pb-2">
          {navbarLinks.map(({ name, href }) => (
            <li
              key={name}
              className="px-4 py-2 rounded-lg text-gray-900 dark:text-gray-300"
            >
              <Link href={href} onClick={() => setMobileMenuOpen(false)}>
                {name}
              </Link>
            </li>
          ))}
          <hr className="w-full h-2" />
          <Anchor href="/login" className="px-4 w-full">
            <Button variant="default" size="default" className="group w-full">
              Log In
              <svg
                className="ml-2 -mr-1 w-5 h-5 group-hover:translate-x-1 transition"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Anchor>
        </ul>
      )}
    </>
  );
}
