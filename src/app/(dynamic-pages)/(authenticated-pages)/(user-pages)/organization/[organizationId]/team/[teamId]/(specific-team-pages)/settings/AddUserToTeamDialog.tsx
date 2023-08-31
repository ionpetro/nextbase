import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { T } from '@/components/ui/Typography';
// convert the imports above into modularized imports
// import Check from 'lucide-react/dist/esm/icons/check';
import AddUserIcon from 'lucide-react/dist/esm/icons/user-plus';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProjectTeamMemberRoleSelect } from './ProjectTeamMemberRoleSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOrganizationContext } from '@/contexts/OrganizationContext';
import { useTeamContext } from '@/contexts/TeamContext';
import { useGetMembersInOrganization } from '@/utils/react-queries/organizations';
import { OrganizationUsersSelect } from './OrganizationUsersSelect';
import { Enum, Table } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Label } from '@/components/ui/Label';

const addUserSchema = z.object({
  userId: z.string(),
  role: z.enum(['readonly', 'member', 'admin']),
});

type AddUserFormType = z.infer<typeof addUserSchema>;

export const AddUserToTeamDialog = ({
  addUserToTeamAction,
}: {
  addUserToTeamAction: ({
    userId,
    teamId,
    role,
  }: {
    userId: string;
    teamId: number;
    role: Enum<'project_team_member_role'>;
  }) => Promise<Table<'team_members'>>;
}) => {
  const [open, setOpen] = useState(false);
  const { organizationId } = useOrganizationContext();
  const { teamId } = useTeamContext();
  const { control, formState, handleSubmit } = useForm<AddUserFormType>({
    defaultValues: {
      role: 'member',
    },
    resolver: zodResolver(addUserSchema),
  });
  const {
    data: organizationTeamMembers,
    isLoading: isOrganizationTeamMembersDataLoading,
  } = useGetMembersInOrganization(organizationId);
  const toastRef = useRef<string | undefined>(undefined);
  const { mutate: addUser } = useMutation(
    async ({
      userId,
      teamId,
      role,
    }: {
      userId: string;
      teamId: number;
      role: Enum<'project_team_member_role'>;
    }) => {
      return addUserToTeamAction({ userId, teamId, role });
    },
    {
      onMutate: () => {
        toastRef.current = toast.loading('Adding user to team...');
      },
      onSuccess: () => {
        toast.success('User added to team!', {
          id: toastRef.current ?? undefined,
        });
      },
      onError: (error: Error) => {
        toast.error(String(error), {
          id: toastRef.current ?? undefined,
        });
      },
    }
  );
  const users =
    isOrganizationTeamMembersDataLoading || !organizationTeamMembers
      ? []
      : organizationTeamMembers.map((member) => {
        const userProfile = Array.isArray(member.user_profiles)
          ? member.user_profiles[0]
          : member.user_profiles;
        if (!userProfile) {
          throw new Error('User profile not found');
        }
        return {
          value: userProfile.id,
          label: userProfile.full_name ?? userProfile.id,
        };
      });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="default">
          <AddUserIcon className="mr-2 w-5 h-5" /> Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={handleSubmit((data) => {
            addUser({
              role: data.role,
              teamId,
              userId: data.userId,
            });
            setOpen(false);
          })}
        >
          <DialogHeader>
            <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
              <AddUserIcon className="w-6 h-6" />
            </div>
            <div className="p-1 mb-4">
              <DialogTitle className="text-lg">Add to Team</DialogTitle>
              <DialogDescription className="text-base">
                Add user to team
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex flex-col gap-6 mt-4 mb-4">
            {!users.length ? (
              <T.Subtle>Loading...</T.Subtle>
            ) : (
              <Controller
                control={control}
                name="userId"
                render={({ field }) => {
                  const selectedUser = users.find(
                    (user) => user.value === field.value
                  );
                  return (
                    <OrganizationUsersSelect
                      value={selectedUser}
                      onChange={(newUser) => {
                        field.onChange(newUser.value);
                      }}
                      users={users}
                    />
                  );
                }}
              ></Controller>
            )}
            <Controller
              control={control}
              name="role"
              render={({ field }) => {
                return (
                  <div className="flex flex-col space-y-2 justify-start w-full mb-4">
                    <Label className="text-muted-foreground">
                      Select a role
                    </Label>
                    <ProjectTeamMemberRoleSelect
                      value={field.value}
                      onChange={(newRole) => {
                        // updateRole({
                        //   newRole,
                        //   teamId,
                        //   userId: member.user_id,
                        // });
                        field.onChange(newRole);
                        // Handle role change here
                      }}
                    />
                  </div>
                );
              }}
            ></Controller>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={'outline'}
              onClick={() => {
                setOpen(false);
              }}
              className="w-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formState.isValid}
              variant="default"
              className="w-full"
            >
              Yes, add to team
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
