import { z } from 'zod';

export const organizationParamSchema = z.object({
  organizationId: z.string().uuid(),
});

export const projectParamSchema = z.object({
  projectId: z.string().uuid(),
});
