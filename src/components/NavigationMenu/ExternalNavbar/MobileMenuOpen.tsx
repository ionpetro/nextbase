'use client';

import { LucideIcon } from '@/components/LucideIcon';
import { useContext } from 'react';
import { MobileMenuContext } from './MobileMenuContext';

export function MobileMenuOpen() {
  const { setMobileMenuOpen } = useContext(MobileMenuContext);
  return (
    <LucideIcon name="Menu"
      onClick={() => setMobileMenuOpen((prev) => !prev)}
      className="lg:hidden -mr-2 hover:cursor-pointer"
    />
  );
}
