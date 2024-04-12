import { ZodTypeAny, z } from 'zod';

const singleOrArray = <T extends ZodTypeAny>(schema: T) => {
  return z.preprocess((obj) => {
    if (Array.isArray(obj)) {
      return obj;
    } else if (typeof obj === 'string') {
      return obj.split(',');
    } else {
      return [];
    }
  }, z.array(schema));
};

export const feedbackStatusesSchema = singleOrArray(
  z.enum([
    'open',
    'in_progress',
    'closed',
    'planned',
    'under_review',
    'completed',
  ]),
);

export const feedbackTypesSchema = singleOrArray(
  z.enum(['bug', 'feature_request', 'general']),
);

export const feedbackPrioritiesSchema = singleOrArray(
  z.enum(['low', 'medium', 'high']),
);

export const dropdownFiltersSchema = z.object({
  statuses: feedbackStatusesSchema.optional(),
  types: feedbackTypesSchema.optional(),
  priorities: feedbackPrioritiesSchema.optional(),
});

export const sortSchema = z.enum(['asc', 'desc']).optional();

export type FeedbackSortSchema = z.infer<typeof sortSchema>;

export type FeedbackDropdownFiltersSchema = z.infer<
  typeof dropdownFiltersSchema
>;

export const filtersSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    query: z.string().optional(),
  })
  .merge(dropdownFiltersSchema)
  .merge(z.object({ sort: sortSchema }));

export type FiltersSchema = z.infer<typeof filtersSchema>;
