'use client';
import { T } from '@/components/ui/Typography';
import { UnwrapPromise } from '@/types';
import {
  useGetTeamMembers,
  useRemoveUserFromTeam,
  useUpdateUserRoleInTeam,
} from '@/utils/react-queries/teams';
import { getTeamMembersByTeamId } from '@/utils/supabase/teams';
import { AddUserToTeamDialog } from './AddUserToTeamDialog';
import { ConfirmRemoveUserFromTeamDialog } from './ConfirmRemoveUserFromTeamDialog';
import { ProjectTeamMemberRoleSelect } from './ProjectTeamMemberRoleSelect';
import { useTeamContext } from '@/contexts/TeamContext';

export function ProjectTeamMembersTable({
  teamMembers: teamMembersInitial,
  teamId,
}: {
  teamMembers: UnwrapPromise<ReturnType<typeof getTeamMembersByTeamId>>;
  teamId: number;
}) {
  const { canUserManageTeam } = useTeamContext();
  const { data: teamMembers } = useGetTeamMembers(teamId, teamMembersInitial);
  const { mutate: updateRole } = useUpdateUserRoleInTeam();
  const { mutate: removeUser } = useRemoveUserFromTeam();
  if (!teamMembers) {
    return null;
  }
  return (
    <div className="bg-gray-100 py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <div className="flex gap-2">
              <T.H2>Team Members</T.H2>
              {canUserManageTeam ? <AddUserToTeamDialog /> : null}
            </div>
            <p className="mt-2 text-sm text-gray-700">
              A list of all users in the team and their roles.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        User
                      </th>{' '}
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Change Role</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {teamMembers.map((member, index) => {
                      const userProfile = Array.isArray(member.user_profiles)
                        ? member.user_profiles[0]
                        : member.user_profiles;
                      if (!userProfile) {
                        throw new Error('userProfile is undefined');
                      }
                      return (
                        <tr key={member.id}>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {index + 1}
                          </td>{' '}
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {userProfile.full_name}
                          </td>
                          <td className="whitespace-nowrap uppercase px-3 py-4 text-sm text-gray-500">
                            {member.role}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            {canUserManageTeam ? (
                              <div className="flex gap-1 items-center">
                                <ProjectTeamMemberRoleSelect
                                  value={member.role}
                                  onChange={(newRole) => {
                                    updateRole({
                                      newRole,
                                      teamId,
                                      userId: member.user_id,
                                    });
                                    // Handle role change here
                                  }}
                                />
                                <ConfirmRemoveUserFromTeamDialog
                                  onConfirm={() => {
                                    removeUser({
                                      teamId,
                                      userId: member.user_id,
                                    });
                                  }}
                                />
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
