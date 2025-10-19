export { default } from 'next-auth/middleware';

export const config = {
  // Replace the path with your actual secret admin route
  matcher: '/manage-mahajan/:path*', 
};