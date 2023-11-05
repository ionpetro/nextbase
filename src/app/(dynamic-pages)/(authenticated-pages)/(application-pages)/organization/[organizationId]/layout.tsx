import { ReactNode } from 'react';
import { z } from 'zod';

const paramsSchema = z.object({
  organizationId: z.string(),
});

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: unknown;
}) {
  return <>{children}</>;
}
