export { default } from 'next-auth/middleware';

export const config = {
  // Replace this path with your actual secret admin route
  matcher: '/manage-mahajan/:path*', 
};