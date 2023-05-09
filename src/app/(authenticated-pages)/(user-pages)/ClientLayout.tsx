'use client';
import { Anchor } from '@/components/Anchor';
import { AppSidebar } from '@/components/presentational/tailwind/Sidebars/AppSidebar';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { Table } from '@/types';
import { getUserAvatarUrl } from '@/utils/helpers';
import { useState } from 'react';
import { UserOnboardingFlow } from './UserOnboardingFlow';
import ReactNoSSR from 'react-no-ssr';
import { useWindowSize } from 'rooks';
import Confetti from 'react-confetti';
import { useUserProfile } from '@/utils/react-query-hooks';
import { SidebarBottom } from '@/components/presentational/tailwind/Sidebars/SidebarBottom';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import Logo from 'public/logos/logo.png';
import { useLoggedInUserEmail } from '@/hooks/useLoggedInUserEmail';

export function ClientLayout({
  children,
  isUserAppAdmin,
  userProfile: initialUserProfile,
}: {
  children: React.ReactNode;
  isUserAppAdmin: boolean;
  userProfile: Table<'user_profiles'>;
}) {
  const [isExpanded, toggleIsExpanded] = useState<boolean>(false);
  const user = useLoggedInUser();
  const { data } = useUserProfile(initialUserProfile);
  const userProfile = data ?? initialUserProfile;
  const userEmail = useLoggedInUserEmail();
  const avatarUrl = getUserAvatarUrl({
    email: userEmail,
    profileAvatarUrl: userProfile.avatar_url ?? undefined,
  });
  const { innerHeight: _innerHeight, innerWidth: _innerWidth } = useWindowSize();
  const innerHeight = _innerHeight ?? 0;
  const innerWidth = _innerWidth ?? 0;

  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const nextbaseIconClassName = cn(
    `flex w-full mt-2 gap-2 items-center py-3 mb-1 text-white h-[64px] rounded-lg`,
    isExpanded ? "px-6 justify-start" : "justify-center"
  );

  if (!userProfile.full_name) {
    return (
      <UserOnboardingFlow
        onSuccess={() => {
          setShowConfetti(true);
        }}
        userProfile={userProfile}
      />
    );
  }

  return (
    <div className="flex h-full">
      <div
        className="bg-slate-900 space-y-2 grid grid-rows-4"
        style={{
          gridTemplateRows: 'auto auto 1fr auto',
        }}
      >
        <div >
          <Anchor
            href="/app_admin"
            className={nextbaseIconClassName}
          >
            <Image width={28} src={Logo} alt="Logo Login" />
            {isExpanded ? (
              <span className="text-xl font-[500]">Nextbase</span>
            ) : null}
          </Anchor>
        </div>
        <AppSidebar isUserAppAdmin={isUserAppAdmin}
          isExpanded={isExpanded}
          toggleIsExpanded={toggleIsExpanded}
        />
        <div />
        <SidebarBottom
          avatarUrl={avatarUrl}
          userFullname={userProfile.full_name}
          isExpanded={isExpanded}
          userEmail={userEmail}
        />
      </div>
      <div className=" flex-1 h-auto max-w-[1296px] overflow-auto">
        <div className=" px-12 py-8 space-y-10">
          {children}
        </div>
      </div>
      <ReactNoSSR>
        {showConfetti ? (
          <Confetti
            confettiSource={{
              x: innerWidth / 2,
              y: innerHeight / 3,
              w: 0,
              h: 0,
            }}
            numberOfPieces={150}
            gravity={0.1}
            initialVelocityY={20}
            initialVelocityX={20}
            recycle={false}
            tweenDuration={1000}
            run={true}
            width={innerWidth}
            height={innerHeight}
          />
        ) : null}{' '}
      </ReactNoSSR>
    </div>
  );
}

