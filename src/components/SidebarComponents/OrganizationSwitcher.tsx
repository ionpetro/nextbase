'use client';
import { CreateOrganizationDialog } from '@/components/CreateOrganizationDialog';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { createOrganization } from '@/data/user/organizations';
import { useToastMutation } from '@/hooks/useToastMutation';
import { cn } from '@/utils/cn';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LucideIcon } from '../LucideIcon';

export function OrganizationSwitcher({
  slimOrganizations,
  currentOrganizationId,
}: {
  slimOrganizations: Array<{
    id: string;
    title: string;
  }>;
  currentOrganizationId: string;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const currentOrganization = slimOrganizations.find(
    (organization) => organization.id === currentOrganizationId,
  );
  const { mutate, isLoading } = useToastMutation(
    async (organizationTitle: string) => {
      return await createOrganization(organizationTitle);
    },
    {
      loadingMessage: 'Creating organization...',
      errorMessage: 'Failed to create organization',
      successMessage: 'Organization created!',
      onSuccess: (organization) => {
        router.push(`/organization/${organization}`);
      },
    },
  );

  const onConfirm = (organizationTitle: string) => {
    mutate(organizationTitle);
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={(isCurrentOpen) => {
        setIsPopoverOpen(isCurrentOpen);
        if (!isCurrentOpen) {
          setIsDialogOpen(false);
        }
      }}
    >
      <PopoverTrigger asChild className="w-fit">
        <Button
          variant="ghost"
          size="sm"
          data-testid="organization-switcher"
          role="combobox"
          className="justify-between hover:border-neutral-700 dark:hover:border-gray-500 hover:bg-transparent mx-0 px-2 py-5 border rounded-sm w-full font-normal text-gray-500 text-sm dark:text-gray-300 truncate"
        >
          <div className="flex items-center gap-1">
            <LucideIcon name="UsersRound" className="mt-0.5 mr-2 w-4 h-4" />
            {currentOrganization?.title ?? 'Select Organization'}
          </div>
          <LucideIcon name="ChevronsUpDown" className="opacity-50 w-4 h-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="my-2 -ml-1 p-0 border rounded-lg w-[238px]"
      >
        <Command>
          <CommandList>
            <CommandEmpty>No Organization found.</CommandEmpty>
            <CommandGroup heading="Organizations">
              {slimOrganizations.map((organization) => (
                <CommandItem
                  key={organization.id}
                  onSelect={() => {
                    setIsPopoverOpen(false);
                    router.push(`/organization/${organization.id}`);
                  }}
                  className="flex items-start text-sm"
                >
                  {/* <LucideIcon name="UsersRound" className="mt-0.5 mr-2 w-4 h-4" /> */}
                  {organization.title}
                  <LucideIcon name="Check"
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
              <CommandItem className="px-1 py-0 w-full">
                <CreateOrganizationDialog
                  isLoading={isLoading}
                  onConfirm={onConfirm}
                  variant="ghost"
                  className="py-0 p-0 focus:ring-0 dark:focus:ring-0 hover:bg-transparent w-full"
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
  );
}
