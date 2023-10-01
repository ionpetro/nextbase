'use client';
import { Anchor } from '@/components/Anchor';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useState } from 'react';
import { AppSidebar } from '@/components/presentational/tailwind/Sidebars/AppSidebar';
import darkLogo from 'public/logos/nextbase-dark-logo.png';
import lightLogo from 'public/logos/nextbase-light-logo.png';
import PanelLeftOpen from 'lucide-react/dist/esm/icons/panel-left-open';
import PanelLeftClose from 'lucide-react/dist/esm/icons/panel-left-close';
import { SidebarBottom } from '@/components/presentational/tailwind/Sidebars/SidebarBottom';
import { Table } from '@/types';
import { useUserProfile } from '@/utils/react-queries/user';
import { getUserAvatarUrl } from '@/utils/helpers';
import { useLoggedInUserEmail } from '@/hooks/useLoggedInUserEmail';
import Mail from 'lucide-react/dist/esm/icons/mail';
import { UserSidebarLink } from '@/components/presentational/tailwind/Sidebars/UserSidebarLink';
import { T } from '@/components/ui/Typography';
import {
  InitialOrganizationListType,
  useCreateOrganizationMutation,
} from '@/utils/react-query-hooks';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/Command';
import { Button } from '@/components/ui/Button';
import { classNames } from '@/utils/classNames';
import { CreateOrganizationDialog } from '@/components/presentational/tailwind/CreateOrganizationDialog';
import ChevronUpDown from 'lucide-react/dist/esm/icons/chevrons-up-down';
import CheckIcon from 'lucide-react/dist/esm/icons/check';
import UsersIcon from 'lucide-react/dist/esm/icons/users';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export function UserSidebar({
  isUserAppAdmin,
  userProfile: initialUserProfile,
  organizationList,
  setCurrentOrganizationId,
  currentOrganizationId,
}: {
  isUserAppAdmin: boolean;
  userProfile: Table<'user_profiles'>;
  organizationList: InitialOrganizationListType;
  setCurrentOrganizationId: (organizationId: string) => Promise<void>;
  currentOrganizationId: string | undefined;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { data: _userProfile } = useUserProfile(initialUserProfile);
  const userProfile = _userProfile ?? initialUserProfile;
  const userEmail = useLoggedInUserEmail();
  const avatarUrl = getUserAvatarUrl({
    email: userEmail,
    profileAvatarUrl: userProfile.avatar_url ?? undefined,
  });
  const [isExpanded, toggleIsExpanded] = useState<boolean>(false);
  const [organizationTitle, setOrganizationTitle] = useState<string>('');
  const nextbaseIconClassName = cn(
    `flex w-full gap-2 items-center py-3 mb-1 text-white h-[64px] rounded-lg`,
    isExpanded ? 'px-9 justify-start' : 'justify-center',
  );
  const chevronClassName = cn(
    `absolute flex text-gray-700 dark:text-gray-400 justify-start transition hover:bg-gray-100 dark:hover:bg-gray-900 p-2.5 rounded-lg text-4xl cursor-pointer items-start -top-[0px]`,
    isExpanded ? 'left-60 bg-transparent' : 'left-[calc(100%-19px)] ',
  );
  const currentOrganization = organizationList.find(
    (organization) => organization.id === currentOrganizationId,
  );

  const { mutate, isLoading } = useCreateOrganizationMutation({
    onSuccess: (organization) => {
      router.push(`/organization/${organization.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setOrganizationTitle('');
    },
  });

  const onConfirm = (organizationTitle: string) => {
    mutate(organizationTitle);
  };

  return (
    <div
      className="relative h-screen bg-white dark:bg-slate-900 space-y-5 px-2 grid grid-rows-4 border-r"
      style={{
        gridTemplateRows: 'auto auto 1fr auto',
      }}
    >
      <div>
        {currentOrganization ? (
          <Popover
            open={isPopoverOpen}
            onOpenChange={(isCurrentOpen) => {
              setIsPopoverOpen(isCurrentOpen);
              if (!isCurrentOpen) {
                setIsDialogOpen(false);
              }
            }}
          >
            <PopoverTrigger asChild className="w-full">
              <Button
                variant="outline"
                size="sm"
                role="combobox"
                className={classNames(
                  isExpanded ? 'px-2' : 'hidden',
                  'mx-6 mt-3 mb-5 rounded-md truncate w-[200px]',
                )}
              >
                <span className="truncate">{currentOrganization.title}</span>
                <ChevronUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] -ml-1 p-0 bg-white dark:bg-slate-900">
              <Command>
                <CommandList>
                  <CommandEmpty>No Organization found.</CommandEmpty>
                  <CommandGroup heading="Organizations">
                    {organizationList.map((organization) => (
                      <CommandItem
                        key={organization.id}
                        onSelect={() => {
                          setIsPopoverOpen(false);
                          if (currentOrganizationId === organization.id) {
                            // do nothing
                            return;
                          }
                          setCurrentOrganizationId(organization.id).then(() => {
                            router.refresh();
                            router.push(`/organization/${organization.id}`);
                          });
                        }}
                        className="text-sm flex items-start"
                      >
                        <UsersIcon className="mr-2 h-4 w-4 mt-0.5" />
                        {organization.title}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            organization.id === currentOrganizationId
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>

                <CommandSeparator />
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        // setIsPopoverOpen(false);
                        // setIsDialogOpen(true);
                      }}
                      className="px-1 py-0 w-full"
                    >
                      {/* <FiPlusCircle className="mr-2 h-5 w-5" />
                      Create Organization */}
                      <CreateOrganizationDialog
                        isLoading={isLoading}
                        onConfirm={onConfirm}
                        variant="ghost"
                        className="p-0 py-0 focus:ring-0 dark:focus:ring-0 hover:bg-transparent w-full"
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={(isCurrentOpen) => {
                          setIsDialogOpen(isCurrentOpen);
                          setIsPopoverOpen(isCurrentOpen);
                        }}
                      />
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          <Anchor className="w-full" href="/all-organizations">
            <Button
              variant="outline"
              className={classNames(
                isExpanded ? 'px-2' : 'hidden',
                'mx-6 mt-3 mb-4 rounded-md truncate w-[200px]',
              )}
            >
              All Organizations
            </Button>
          </Anchor>
        )}
        {!isExpanded ? (
          <Anchor href="/dashboard" className={nextbaseIconClassName}>
            <Image
              width={40}
              src={lightLogo}
              alt="Logo Login"
              className={cn(
                'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
                isExpanded ? '-ml-2 ' : 'ml-0 ',
              )}
            />
            <Image
              width={40}
              src={darkLogo}
              alt="Logo Login"
              className={cn(
                ' absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
                isExpanded ? '-ml-2 ' : '-ml-0',
              )}
            />

            {/* <T.P className="text-lg font-[600] text-gray-800 dark:text-gray-300">
            nextbase
          </T.P> */}
          </Anchor>
        ) : null}
      </div>
      <AppSidebar
        isUserAppAdmin={isUserAppAdmin}
        isExpanded={isExpanded}
        toggleIsExpanded={toggleIsExpanded}
      />
      <div />
      <div className="space-y-2">
        <div className="mx-2">
          <UserSidebarLink
            href="/feedback"
            icon={<Mail size={24} />}
            isExpanded={isExpanded}
            label=" Feedback"
          />
        </div>
        {/* Chevron Icon Action */}
        <div
          className={chevronClassName}
          onClick={() => toggleIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <PanelLeftClose className="h-6 w-6 z-50" />
          ) : (
            <PanelLeftOpen className="h-6 w-6 z-50" />
          )}
        </div>
        <SidebarBottom
          avatarUrl={avatarUrl}
          userFullname={userProfile.full_name ?? 'User'}
          isExpanded={isExpanded}
          userEmail={userEmail}
        />
      </div>
    </div>
  );
}
