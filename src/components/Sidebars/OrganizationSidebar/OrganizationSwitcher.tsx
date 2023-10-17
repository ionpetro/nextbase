'use client';

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
import ChevronUpDown from 'lucide-react/dist/esm/icons/chevrons-up-down';
import CheckIcon from 'lucide-react/dist/esm/icons/check';
import UsersIcon from 'lucide-react/dist/esm/icons/users';
import { CreateOrganizationDialog } from '@/components/presentational/tailwind/CreateOrganizationDialog';
import { Button } from '@/components/ui/Button';
import { classNames } from '@/utils/classNames';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { toast } from 'react-hot-toast';

export function OrganizationSwitcher({
  organizationList,
  currentOrganizationId,
  setCurrentOrganizationId,
  isSidebarExpanded,
}: {
  organizationList: InitialOrganizationListType;
  currentOrganizationId: string | undefined;
  setCurrentOrganizationId: (organizationId: string) => Promise<void>;
  isSidebarExpanded: boolean;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const { mutate, isLoading } = useCreateOrganizationMutation({
    onSuccess: (organization) => {
      router.push(`/organization/${organization.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
          variant="outline"
          size="sm"
          role="combobox"
          className={classNames(
            isSidebarExpanded ? 'px-2' : 'hidden',
            'mx-2 rounded-md truncate w-fit',
          )}
        >
          <ChevronUpDown className=" h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="w-[200px] -ml-1 p-0 bg-white dark:bg-slate-900"
      >
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
              <CommandItem className="px-1 py-0 w-full">
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
  );
}
