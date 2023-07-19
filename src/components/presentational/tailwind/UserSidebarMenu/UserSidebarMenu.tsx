import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Anchor } from '@/components/Anchor';
import AccountsIcon from 'lucide-react/dist/esm/icons/users';
import SecurityIcon from 'lucide-react/dist/esm/icons/shield';
import LogoutIcon from 'lucide-react/dist/esm/icons/log-out';
import { cn } from '@/utils/cn';

export function UserSidebarMenu() {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-8 bottom-12 z-10 mt-2 w-[172px] origin-bottom-left rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1.5">
          <Menu.Item>
            {({ active }) => (
              <Anchor
                href="/settings"
                className={cn(
                  active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                  'flex px-3 gap-2 items-center py-2 text-sm'
                )}
              >
                <AccountsIcon className="text-lg" /> Account settings
              </Anchor>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Anchor
                href="/settings/security"
                className={cn(
                  active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                  'flex px-3 gap-2 items-center py-2 text-sm'
                )}
              >
                <SecurityIcon className="text-lg" /> Security Settings
              </Anchor>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Anchor
                href="/logout"
                prefetch={false}
                className={cn(
                  active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                  'flex px-3 gap-2 items-center py-2 text-sm'
                )}
              >
                <LogoutIcon className="text-lg" />
                Sign out
              </Anchor>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  );
}
