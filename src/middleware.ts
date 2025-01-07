import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);
 
export const config = {
  // Match both the root path and internationalized pathnames
  matcher: ['/', '/(az|ru|en|tr)/:path*', '/((?!api|_next|static|favicon.ico).*)']
};