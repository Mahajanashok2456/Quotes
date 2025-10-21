Mahajan's Quotes: The Aesthetic Inspiration Wall

🌟 Project Overview

"Mahajan's Quotes" is a professional, full-stack web application designed to serve inspiring quotes in an aesthetic, customizable, and highly shareable format. The project features a private, secure administrative dashboard for full control over the content and styling.

The primary objective of this project was to create a modern web experience with a strong focus on visual design and seamless deployment.

✨ Key Features Implemented

Public Features (Viewer)

Aesthetic Design: Utilizes a custom, cohesive color palette and subtle visual effects (Glassmorphism, Parallax Scrolling) for an elegant user experience.

Animated Splash Screen: A beautiful, animated floral welcome screen greets users before displaying the quotes.

Dynamic Styling: Each quote dynamically renders with its own unique font-family and font-color defined by the admin.

Optimistic UI: Liking a quote updates instantly (zero delay) in the browser.

Shareability: Features buttons to quickly copy the quote text or download the quote card as an image for social media stories.

Responsive Layout: Uses a masonry-style grid for graceful display on all devices.

Admin Features (Secure CRUD)

Secure Authentication: Uses NextAuth.js and a MongoDB database for secure, credential-based login.

Hidden Login: Admin login is protected behind a discreet button and a secure, hidden URL.

Full CRUD: The administrator has the power to Create, Read, Update, and Delete any quote.

Content Styling: Admin can set the font, color, and manage the line-break formatting for each quote.

🚀 Technology Stack

Component

Technology

Purpose

Framework

Next.js (App Router)

Full-stack application foundation for routing and APIs.

Styling

Tailwind CSS & Framer Motion

Utility-first styling for rapid, responsive design and animations.

Database

MongoDB Atlas

Cloud-hosted NoSQL database for content and user management.

Authentication

NextAuth.js

Secure credential-based login for the Admin Dashboard.

Deployment

Vercel / Render

Serverless deployment platform for zero-config hosting.

🛠️ Local Setup and Development

Prerequisites

Node.js (v18+)

npm or Yarn

A MongoDB Atlas cluster and a database user.

Installation Steps

Clone the repository:

git clone [https://github.com/Mahajanashok2456/Quotes.git](https://github.com/Mahajanashok2456/Quotes.git)
cd Quotes


Install dependencies:

npm install


Configure Environment Variables:
Create a file named .env.local in the root directory and add your secrets. DO NOT COMMIT THIS FILE TO GIT!

# .env.local (DO NOT COMMIT)
# ----------------------------------------------------
# MongoDB Connection String (Replace <password> with your secure password)
MONGODB_URI=mongodb+srv://ashokroshan78_db_user:<password>@cluster0.ga3paex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# NextAuth Secrets (Generate secure strings for both)
NEXTAUTH_SECRET=your_long_random_secret_string_here
NEXTAUTH_URL=http://localhost:3000
# ----------------------------------------------------


Seed the Admin User:
You must run the seeding script to create the initial admin user in your database.

node scripts/seedAdmin.js
# Default Credentials: admin@example.com / mahajanadmin


Run the development server:

npm run dev


🔐 Deployment and Administration

Deployment

This application is designed for Vercel. Ensure you add the following Environment Variables to your Vercel project dashboard under Settings > Environment Variables:

Key

Value

Scope

MONGODB_URI

Your Atlas connection string

Production, Preview, Development

NEXTAUTH_SECRET

The long, random secret key

Production, Preview, Development

NEXTAUTH_URL

Your public Vercel domain (e.g., https://quotes-app.vercel.app)

Production, Preview, Development

Admin Dashboard Access

The admin dashboard is protected by security middleware.

Public Site: Access the main site at your deployment URL.

Admin Login: Click the discreet "Admin" link in the bottom-right corner of the page to open the login modal.

Access URL (If needed): The direct access route for the dashboard is:
[YOUR_DOMAIN]/manage-content-a3f8b1c9

🎨 Aesthetic Choices

Color Palette: Custom palette (Deep Teal, Soft Peach, Light Cream) for a modern, calming aesthetic.

Background: Fixed-position, full-page repeating image (blurred floral/book pages) using CSS background-repeat: repeat; for infinite scroll coverage.

UI Effect: Glassmorphism (backdrop-blur-lg) applied to quote cards for enhanced readability while maintaining background visibility.

Branding: Custom favicon (heart icon) and title "Mahajan's Quotes."
