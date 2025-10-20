export { default } from 'next-auth/middleware';

export const config = {
  // IMPORTANT: Replace this path with your actual secret admin route
  // e.g., '/manage-content-a3f8b1c9/:path*'
  matcher: '/manage-mahajan/:path*', 
};