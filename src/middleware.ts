import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supportedLocales = ['az', 'ru', 'en', 'tr'];
const defaultLocale = process.env.DEFAULT_LOCALE;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for public folder paths
  if (pathname.startsWith('/public/')) return;
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;

  // Always use default locale for the redirect
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|static).*)',
  ],
} 