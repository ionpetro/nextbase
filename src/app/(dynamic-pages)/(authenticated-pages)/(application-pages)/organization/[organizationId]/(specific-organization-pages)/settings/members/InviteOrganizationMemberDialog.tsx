'use client';
import { LucideIcon } from '@/components/LucideIcon';
import { OrganizationMemberRoleSelect } from '@/components/OrganizationMemberRoleSelect';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Enum } from '@/types';
import { useState } from 'react';

type Props = {
  onInvite: (email: string, role: Enum<'organization_member_role'>) => void;
  isLoading: boolean;
};

export const InviteOrganizationMemberDialog = ({
  onInvite,
  isLoading,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Enum<'organization_member_role'>>('member');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          data-testid="invite-user-button"
          size="default"
        >
          <LucideIcon name="UserPlus" className="mr-2 w-5 h-5" />
          Invite user
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="bg-gray-200/50 dark:bg-gray-700/40 mb-2 p-3 rounded-lg w-fit">
            <LucideIcon name="UserPlus" className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">Invite user</DialogTitle>
            <DialogDescription className="mt-0 text-base">
              Invite a user to your organization.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form
          data-testid="invite-user-form"
          onSubmit={(event) => {
            event.preventDefault();
            onInvite(email, role);
            setEmail('');
            setOpen(false);
          }}
        >
          <div className="mb-8">
            <div className="flex flex-col justify-start space-y-2 mb-4 w-full">
              <Label className="text-muted-foreground">Select a role</Label>
              <OrganizationMemberRoleSelect
                value={role}
                onChange={(newRole) => setRole(newRole)}
              />
            </div>
            <Label className="text-muted-foreground">Enter Email</Label>
            <Input
              className="shadow focus:shadow-outline mt-1.5 px-3 py-2 border rounded-lg w-full h-11 text-gray-700 appearance-none focus:ring-0 leading-tight focus:outline-none text-base"
              id="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              disabled={isLoading}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Inviting User' : 'Invite'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
