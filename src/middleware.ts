import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Database } from './lib/database.types';
import { toSiteURL } from './utils/helpers';
// const matchAppAdmin = match('/app_admin_preview/(.*)?');
import { match } from 'path-to-regexp';


// Using a middleware to protect pages from unauthorized access
// may seem repetitive however it massively increases the security
// and performance of your application. This is because the middleware
// runs first on the server and can bail out early before the
// server component is even rendered. This means no database queries
// or other expensive operations are run if the user is not authorized.
const protectedPagePrefixes = [
  `/organization(/.*)?`, // matches /organization and any sub route of /organization
  `/project(/.*)?`, // matches /project and any sub route of /project
  `/app_admin(/.*)?`, // matches /app_admin and any sub route of /app_admin
  `/dashboard`,
  `/settings(/.*)?`,
  `/invitations`,
  `/app_admin_preview(/.*)?`,
];

function isProtectedPage(pathname: string) {
  // is exact match or starts with a protected page prefix

  return protectedPagePrefixes.some((prefix) => {
    const matchPath = match(prefix);
    return matchPath(pathname);
  });
}


// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const sessionResponse = await supabase.auth.getSession();
  const maybeUser = sessionResponse?.data.session?.user
  if (isProtectedPage(req.nextUrl.pathname) && !maybeUser) {
    console.log('isProtectedPage and no user')
    return NextResponse.redirect(toSiteURL('/login'));
  }
  if (!req.nextUrl.pathname.startsWith(`/app_admin_preview`) && req.nextUrl.pathname.startsWith('/app_admin')) {
    if (!(maybeUser &&
      'user_role' in maybeUser &&
      maybeUser.user_role === 'admin')) {
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
