import { ReactNode, Suspense } from 'react';

export function ApplicationLayoutShell({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div
      className="h-screen w-full grid overflow-hidden"
      style={{
        gridTemplateColumns: 'auto 1fr',
      }}
    >
      <Suspense fallback={<div>Loading sidebar</div>}> {sidebar}</Suspense>
      <div className="h-full overflow-y-auto">
        <div className="relative flex-1 h-auto w-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
