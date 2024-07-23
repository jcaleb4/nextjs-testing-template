import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  requestHeaders.set('x-referrer', request.referrer);
  requestHeaders.set('x-destination', request.destination);

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(
    'middleware session ====================================================> ',
    session,
  );

  const { pathname } = request.nextUrl;

  const publicPaths = [
    '/login',
    '/signup',
    '/api/auth',
    '/_next/static',
    '/_next/image',
  ];

  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (!isPublicPath && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);

    return NextResponse.redirect(loginUrl);
  }

  if (isPublicPath && session) {
    const homeUrl = new URL('/', request.url);
    homeUrl.searchParams.set('callbackUrl', request.url);

    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/', '/user', '/dashboard', '/profile'],
};
