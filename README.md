# Echoes of Mahajan

A collection of wisdom from great minds, built with Next.js 15, TypeScript, and MongoDB.

## Features

- View inspirational quotes with beautiful typography
- Admin dashboard for managing quotes
- User authentication with NextAuth.js
- Responsive design with Tailwind CSS
- Like functionality for quotes
- Export quotes as images

## Getting Started

First, install the dependencies:

```bash
npm install
```

Set up your environment variables by creating a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Access

To access the admin dashboard, you'll need to create an admin user:

```bash
npm run create-admin
```

Then visit [http://localhost:3000/manage-content-a3f8b1c9/login](http://localhost:3000/manage-content-a3f8b1c9/login) to log in with:
- Email: admin@example.com
- Password: mahajanadmin

## Project Structure

- `src/app` - Main application using Next.js App Router
- `src/app/api` - API routes for quotes and authentication
- `components` - Reusable React components
- `src/models` - Mongoose models for MongoDB
- `src/lib` - Utility functions and database connection

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with `@tailwindcss/line-clamp`
- **Authentication**: NextAuth.js
- **Database**: MongoDB via Mongoose ODM
- **Utilities**: bcryptjs for hashing, framer-motion for animations, html2canvas for screenshot capture

## Deployment

This application is designed for Vercel. Ensure you add the following Environment Variables to your Vercel project dashboard under Settings > Environment Variables:

| Key | Value | Scope |
|-----|-------|-------|
| MONGODB_URI | Your Atlas connection string | Production, Preview, Development |
| NEXTAUTH_SECRET | The long, random secret key | Production, Preview, Development |
| NEXTAUTH_URL | Your public Vercel domain (e.g., https://quotes-app.vercel.app) | Production, Preview, Development |

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - styling with Tailwind
- [MongoDB Documentation](https://docs.mongodb.com/) - database operations
- [NextAuth.js Documentation](https://next-auth.js.org/) - authentication

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
