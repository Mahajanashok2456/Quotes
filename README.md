# Inspirational Quotes Website

A modern, full-stack Next.js application for displaying and managing inspirational quotes with a beautiful dark theme and admin panel.

## Features

### Public Features
- **Beautiful Homepage**: Dark-themed, responsive design displaying quotes in elegant cards
- **Quote Display**: Each quote shows with custom fonts and colors from the database
- **Social Sharing**: Share quotes using Web Share API or copy to clipboard
- **Story Creation**: Generate vertical story images (9:16 aspect ratio) for social media

### Admin Features
- **Secure Admin Panel**: Protected with session-based authentication
- **Quote Management**: Full CRUD operations for quotes
- **Custom Styling**: Choose from multiple fonts and colors for each quote
- **Real-time Preview**: See how quotes will look before saving

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: iron-session for secure session management
- **Password Hashing**: bcryptjs
- **Image Generation**: html-to-image for story creation

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd inspirational-quotes-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Update `.env.local` with your values:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   SECRET_COOKIE_PASSWORD=your-secret-key-for-sessions
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Run the seed script to create initial admin user
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### For Visitors
- Browse inspirational quotes on the homepage
- Share quotes via social media or copy to clipboard
- Create story images for Instagram/Snapchat

### For Admins
1. Go to `/login` to access the admin panel
2. Use the credentials created during seeding
3. Add, edit, or delete quotes
4. Customize fonts and colors for each quote

## Project Structure

```
├── components/           # React components
│   ├── QuoteCard.js     # Individual quote display
│   ├── QuoteForm.js     # Admin form for adding/editing quotes
│   └── QuoteTable.js    # Admin table for managing quotes
├── lib/                 # Utility libraries
│   ├── models/          # Mongoose models
│   │   ├── Admin.js     # Admin user model
│   │   └── Quote.js     # Quote model
│   └── mongodb.js       # Database connection
├── pages/               # Next.js pages
│   ├── _app.js         # App wrapper
│   ├── admin.js        # Admin panel
│   ├── index.js        # Homepage
│   ├── login.js        # Login page
│   └── api/            # API routes
│       ├── auth/       # Authentication endpoints
│       └── quotes/     # Quote CRUD endpoints
└── styles/             # Global styles
    └── globals.css     # Tailwind CSS imports and custom styles
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Quotes
- `GET /api/quotes` - Get all quotes
- `POST /api/quotes` - Create new quote (admin only)
- `PUT /api/quotes/[id]` - Update quote (admin only)
- `DELETE /api/quotes/[id]` - Delete quote (admin only)

## Customization

### Adding New Fonts
1. Add font imports to `tailwind.config.js`
2. Update the font options in `components/QuoteForm.js`
3. Add corresponding Tailwind classes to `styles/globals.css`

### Styling
- Modify `styles/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Use Tailwind utility classes throughout components

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- Ensure MongoDB connection string is set
- Set all environment variables
- Build and start the application

## Security Features

- Session-based authentication with iron-session
- Password hashing with bcryptjs
- Protected API routes for admin operations
- Input validation and sanitization
- XSS protection through React's escaping

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.