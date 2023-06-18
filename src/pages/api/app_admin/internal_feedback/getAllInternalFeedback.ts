import { withAppAdminPrivilegesApi } from '@/utils/api-routes/wrappers/withAppAdminPrivilegesApi';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppSupabaseClient } from '@/types';
import { z } from 'zod';
import { withAllowedMethods } from '@/utils/api-routes/wrappers/withAllowedMethods';
import { getAllInternalFeedback } from '@/utils/supabase/internalFeedback';
import {
  INTERNAL_FEEDBACK_THREAD_TYPE_VALUES,
  INTERNAL_FEEDBACK_THREAD_STATUS_VALUES,
  INTERNAL_FEEDBACK_THREAD_PRIORITY_VALUES,
} from '@/utils/typeguards';

function toArray<T>(value: undefined | T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === undefined) {
    return [];
  }
  return [value];
}

const bodySchema = z.object({
  query: z.string().optional(),
  types: z
    .union([
      z.enum(INTERNAL_FEEDBACK_THREAD_TYPE_VALUES),
      z.array(z.enum(INTERNAL_FEEDBACK_THREAD_TYPE_VALUES)),
    ])
    .optional(),
  statuses: z
    .union([
      z.enum(INTERNAL_FEEDBACK_THREAD_STATUS_VALUES),
      z.array(z.enum(INTERNAL_FEEDBACK_THREAD_STATUS_VALUES)),
    ])
    .optional(),
  priorities: z
    .union([
      z.enum(INTERNAL_FEEDBACK_THREAD_PRIORITY_VALUES),
      z.array(z.enum(INTERNAL_FEEDBACK_THREAD_PRIORITY_VALUES)),
    ])
    .optional(),
});

const getAllInternalFeedbackApi = async (
  req: NextApiRequest,
  res: NextApiResponse,
  supabaseAdminServerClient: AppSupabaseClient
) => {
  const {
    query,
    types: _types,
    statuses: _statuses,
    priorities: _priorities,
  } = bodySchema.parse(req.query);

  const types = toArray(_types);
  const statuses = toArray(_statuses);
  const priorities = toArray(_priorities);

  try {
    const data = await getAllInternalFeedback(supabaseAdminServerClient, {
      query: query || '',
      types: types || [],
      statuses: statuses || [],
      priorities: priorities || [],
    });
    res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default withAllowedMethods(
  ['GET'],
  withAppAdminPrivilegesApi(getAllInternalFeedbackApi)
);
