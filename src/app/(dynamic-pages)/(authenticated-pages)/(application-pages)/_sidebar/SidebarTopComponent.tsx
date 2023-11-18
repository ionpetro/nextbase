import { Anchor } from '@/components/Anchor';
import { cn } from '@/utils/cn';
import darkLogo from 'public/logos/nextbase-dark-logo.png';
import lightLogo from 'public/logos/nextbase-light-logo.png';
import Image from 'next/image';
import { T } from '@/components/ui/Typography';
import CloseIcon from 'lucide-react/dist/esm/icons/x';
import PanelLeftClose from 'lucide-react/dist/esm/icons/panel-left-close';

export function SidebarTopComponent() {
    return (
        <div className="flex justify-between w-full mb-5">
            <Anchor
                href="/dashboard"
                className="ml-1.5 cursor-pointer flex items-center gap-1 w-full"
            >
                <Image
                    width={36}
                    src={lightLogo}
                    alt="Logo Login"
                    className={cn(
                        'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
                        '-ml-2 ',
                    )}
                />
                <Image
                    width={36}
                    src={darkLogo}
                    alt="Logo Login"
                    className={cn(
                        ' absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
                        '-ml-2 ',
                    )}
                />

                <T.P className="text-base font-medium text-neutral-600 dark:text-slate-300">
                    Nextbase
                </T.P>
            </Anchor>
            <div className="group border p-2 hover:bg-neutral-50 dark:hover:bg-white/5 rounded-md">
                <PanelLeftClose className="h-4 w-4 text-neutral-500 group-hover:text-neutral-700 dark:text-slate-400 group-hover:dark:text-slate-300" />
            </div>
        </div>
    );
}
