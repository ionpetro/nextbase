import { ReactNode } from 'react';
import { InternalNavbar } from '@/components/ui/NavigationMenu/InternalNavbar';
import { Anchor } from '@/components/Anchor';
import { Badge } from '@/components/ui/Badge';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="h-screen w-full grid overflow-hidden"
      style={{
        gridTemplateColumns: 'auto 1fr',
      }}
    >
      <div className="flex flex-col space-y-2">
        <Anchor href="/settings">Account Settings</Anchor>
        <Anchor href="/settings/security">Security Settings</Anchor>
        <Anchor href="/settings/developer">Developer Settings</Anchor>
        <Anchor href="/invitations">Invitations</Anchor>
        <Anchor href="/feedback">My Feedback</Anchor>
      </div>
      <div>
        <InternalNavbar
          title="Organization Name"
          badge={
            <Badge variant="discussion" size="xxs" className="ml-2">
              Beta
            </Badge>
          }
        />
        <div className="relative flex-1 h-auto mt-8 w-full overflow-auto">
          <div className="px-12 space-y-6 pb-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
