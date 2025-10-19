export { default } from 'next-auth/middleware';

export const config = {
  // Protect only the admin dashboard, not the login page
  matcher: ['/manage-mahajan/:path*', '/((?!manage-mahajan/login).*)'],
};