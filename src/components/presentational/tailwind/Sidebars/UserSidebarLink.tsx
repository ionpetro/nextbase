'use client';
import { Anchor } from '@/components/Anchor';
import { classNames } from '@/utils/classNames';
import { usePathname } from 'next/navigation';

export function UserSidebarLink({
    href, icon, label, isExpanded,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    isExpanded: boolean;
}) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Anchor
            href={href}
            className={classNames(
                `flex w-full gap-2.5 items-center group py-3 h-[48px] mb-1 rounded-lg transition hover:cursor-pointer hover:shadow-lg hover:bg-slate-800 `,
                isActive
                    ? ' bg-slate-800 text-slate-200 hover:bg-slate-800'
                    : ' bg-transparent',
                isExpanded
                    ? 'text-slate-200 pl-5 pr-2 justify-start'
                    : 'text-slate-200 justify-center'
            )}
        >
            <span className="text-xl group-hover:text-white">{icon}</span>
            {isExpanded ? (
                <span className="transition text-base  font-[400] group-hover:font-[600] group-hover:text-white">
                    {label}
                </span>
            ) : null}
        </Anchor>
    );
}
