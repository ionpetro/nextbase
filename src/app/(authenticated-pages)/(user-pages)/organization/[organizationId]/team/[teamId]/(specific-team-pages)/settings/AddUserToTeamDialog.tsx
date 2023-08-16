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
import Plus from 'lucide-react/dist/esm/icons/plus';
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
        <Button className="gap-1">
          <Plus size="16" /> <span>Add User</span>
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
            <DialogTitle>Add to Team</DialogTitle>
            <DialogDescription>Add user to team</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
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
                );
              }}
            ></Controller>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!formState.isValid}>
              Yes, add to team
            </Button>
            <Button
              type="button"
              variant={'outline'}
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
