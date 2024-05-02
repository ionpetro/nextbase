import { z } from "zod";

export const authUserMetadataSchema = z.object({
  onboardingStatus: z.object({
    hasAcceptedTerms: z.boolean().default(false),
    hasCompletedProfile: z.boolean().default(false),
    hasCreatedOrganization: z.boolean().default(false),
  }).default({})
}).passthrough();

export type AuthUserMetadata = z.infer<typeof authUserMetadataSchema>;

