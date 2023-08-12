'use client';

import { cn } from '@/utils/cn';
import Link from 'next/link';
import NotificationIcon from 'lucide-react/dist/esm/icons/bell';
import Home from 'lucide-react/dist/esm/icons/home';
import { usePathname } from 'next/navigation';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/Popover';
import { TabsNavigation } from '@/components/presentational/tailwind/TabsNavigation';
import CheckIcon from 'lucide-react/dist/esm/icons/check';
import LightIcon from 'lucide-react/dist/esm/icons/sun';
import { useMemo } from 'react';
import NotificationElement from '@/components/presentational/tailwind/TabsNavigation/NotificationElement';
import Logo from 'public/logos/logo.png';

export default function InternalNavbar() {
    const pathname = usePathname();
    const href = '/all';
    const isActive = pathname === href;
    const baseClassNames =
        'whitespace-nowrap py-2 border-b-2 px-3 font-medium text-base flex items-center space-x-2';
    const modifierClasses = isActive
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300';
    const className = `${baseClassNames} ${modifierClasses}`;
    const notificationTabs = useMemo(() => {
        return [
            {
                label: 'All',
                href: `/all`,
            },
            {
                label: 'Read',
                href: `/read`,
            },
        ];
    }, []);

    return (
        <div
            className={cn(
                'h-full flex mx-auto px-12 border-b border-neutral-200/50 py-3 w-full mb-8 justify-center items-center'
            )}
        >
            <div className={cn('hidden lg:block', 'relative ')}>
                <Link
                    href="/dashboard"
                    className="inline-flex items-center font-medium text-neutral-500 hover:text-neutral-800"
                    aria-label="Home page"
                >
                    <Home className="h-5 w-5 mr-2" /> Dashboard
                </Link>
            </div>
            <div className="relative flex basis-0 items-center justify-end gap-3 sm:gap-3 md:flex-grow">
                <div className="group p-[5px] bg-gradient-to-b from-white to-neutral-50 hover:bg-gradient-to-b hover:from-neutral-50 hover:to-neutral-100/50 transition rounded-[8px] border cursor-pointer border-neutral-900 border-opacity-20 ">
                    <LightIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-700" />
                </div>
                <Popover>
                    <PopoverTrigger className="group p-[5px] bg-gradient-to-b from-white to-neutral-50 hover:bg-gradient-to-b hover:from-neutral-100 hover:to-neutral-100 transition rounded-[8px] border border-neutral-900 border-opacity-20 ">
                        <NotificationIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-700" />
                    </PopoverTrigger>
                    <PopoverContent className="mr-12 w-[560px] p-0 rounded-xl overflow-hidden">
                        <div className="border-b-2 border-neutral-300 dark:border-neutral-600 px-6 pb-2 shadow-lg">
                            <div className="mt-7 mb-3 flex justify-between">
                                <p className="text-2xl font-bold dark:text-white">
                                    Notifications
                                </p>
                                <div className="flex text-sm mt-1.5 space-x-1 text-neutral-600 hover:text-neutral-700 cursor-pointer font-medium">
                                    <CheckIcon className="h-5 w-5" />{' '}
                                    <span className="underline underline-offset-4 dark:text-neutral-600">
                                        Mark as all read
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mx-auto">
                            <NotificationElement
                                title="New Invitation"
                                description="You have a pending Invitation"
                                createdAt="2 days ago"
                                href="/"
                                image="../logos/logo-black.png"
                                isRead={false}
                                isNew={true}
                            />

                            <NotificationElement
                                title="New Invitation"
                                description="You have a pending Invitation. Accept the invite and join the organization. Meet the team and enjoy Nextbase"
                                createdAt="2 days ago"
                                href="/"
                                image="../assets/user-image.png"
                                isRead={false}
                                isNew={true}
                            />
                            <NotificationElement
                                title="New Invitation"
                                description="You have a pending Invitation"
                                createdAt="2 days ago"
                                href="/"
                                image="../logos/logo-black.png"
                                isRead={false}
                                isNew={false}
                            />
                            <NotificationElement
                                title="New Invitation"
                                description="You have a pending Invitation"
                                createdAt="2 days ago"
                                href="/"
                                image="../logos/logo-black.png"
                                isRead={true}
                                isNew={false}
                            />
                            <NotificationElement
                                title="New Invitation"
                                description="You have a pending Invitation"
                                createdAt="2 days ago"
                                href="/"
                                image="../logos/logo-black.png"
                                isRead={true}
                                isNew={false}
                            />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
