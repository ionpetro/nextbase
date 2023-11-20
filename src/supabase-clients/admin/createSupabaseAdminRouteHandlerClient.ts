import { Database } from '@/lib/database.types';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// Outstanding bug
//https://github.com/vercel/next.js/issues/45371
export const createSupabaseAdminRouteHandlerClient = () =>
  createRouteHandlerClient<Database>(
    {
      cookies,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      options: {
        global: {
          fetch,
        },
      },
    },
  );
