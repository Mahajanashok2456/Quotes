export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/manage-mahajan/:path*', '/api/admin/:path*'],
};