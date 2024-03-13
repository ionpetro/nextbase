import { createSupabaseUserRouteHandlerClient } from '@/supabase-clients/user/createSupabaseUserRouteHandlerClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createSupabaseUserRouteHandlerClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  if (!data?.session?.user) {
    return Response.json({ error: 'Not logged in' }, { status: 401 });
  } else if (!data.session.refresh_token) {
    return Response.json({ error: 'No refresh token' }, { status: 401 });
  }

  await supabase.auth.refreshSession({
    refresh_token: data.session?.refresh_token,
  });

  return Response.json({ message: 'Refreshed' });
}
