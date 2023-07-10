import { Database } from '@/lib/database.types';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// Outstanding bug
//https://github.com/vercel/next.js/issues/45371
export const supabaseAdminServerActionClient =
  createServerActionClient<Database>(
    {
      cookies,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      options: {
        global: { fetch },
      },
    }
  );
