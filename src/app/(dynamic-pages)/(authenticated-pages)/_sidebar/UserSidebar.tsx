import { Anchor } from '@/components/Anchor';

export async function UserSidebar() {
  return (
    <div className="h-full  w-[264px] flex flex-col space-y-2 border-r dark:border-gray-700/50 select-none">
      <Anchor href="/dashboard">Dashboard</Anchor>
      <Anchor href="/settings">Account Settings</Anchor>
      <Anchor href="/settings/security">Security Settings</Anchor>
      <Anchor href="/settings/developer">Developer Settings</Anchor>
      <Anchor href="/invitations">Invitations</Anchor>
      <Anchor href="/feedback">My Feedback</Anchor>
    </div>
  );
}
