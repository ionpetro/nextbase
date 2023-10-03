'use client';
import Image from 'next/image';
import { UserSidebarMenu } from '../UserSidebarMenu';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { cn } from '@/utils/cn';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { T } from '@/components/ui/Typography';

export const UserNavPopover = ({
  avatarUrl,
  userFullname,
  userEmail,
}: {
  avatarUrl: string;
  userFullname: string;
  userEmail: string;
}) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="h-[24px] w-[24px] border rounded-full">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              placeholder="blur"
              blurDataURL={avatarUrl}
              quality={100}
              sizes="100vw"
              alt="User avatar"
              style={{
                borderRadius: '50%',
                objectFit: 'contain',
              }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent sideOffset={8} align="end" className="w-[240px]">
          <UserSidebarMenu
            userEmail={userEmail}
            userFullName={userFullname}
            userAvatarUrl={avatarUrl}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
