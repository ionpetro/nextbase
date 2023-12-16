'use client';

import MenuIcon from 'lucide-react/dist/esm/icons/menu';
import { useContext } from 'react';
import { MobileMenuContext } from './MobileMenuContext';

export function MobileMenuOpen() {
  const { setMobileMenuOpen } = useContext(MobileMenuContext);
  return (
    <MenuIcon
      onClick={() => setMobileMenuOpen((prev) => !prev)}
      className="hover:cursor-pointer lg:hidden -mr-2"
    />
  );
}
