import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Database } from './lib/database.types';
import { toSiteURL } from './utils/helpers';

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const sessionResponse = await supabase.auth.getSession();

  if (!req.nextUrl.pathname.startsWith(`/app_admin_preview`) && req.nextUrl.pathname.startsWith('/app_admin')) {
    if (!(sessionResponse?.data.session?.user &&
      'user_role' in sessionResponse.data.session.user &&
      sessionResponse.data.session.user.user_role === 'admin')) {
      return NextResponse.redirect(toSiteURL('/dashboard'));
    }
  }
  return res;
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
