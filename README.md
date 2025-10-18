# 🌟 Inspirational Quotes Website

A visually stunning full-stack web application that showcases inspirational quotes with a modern dark theme. Features a public-facing homepage for quote browsing and sharing, alongside a secure admin panel for content management with customizable styling options.

[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-green.svg)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000.svg)](https://vercel.com/)

## 📖 Description

The Inspirational Quotes Website is a modern, responsive web application designed to spread positivity and wisdom through beautifully presented quotes. Users can browse, share, and create social media stories from inspirational quotes, while administrators have full control over content management with advanced customization features including font selection and color theming.

## ✨ Key Features

### 🌐 Public-Facing Features
- **Elegant Homepage**: Dark-themed, responsive design with gradient backgrounds and smooth animations
- **Dynamic Quote Display**: Quotes rendered with custom fonts and colors stored in the database
- **Social Sharing**: Native Web Share API integration with clipboard fallback for easy content sharing
- **Story Generation**: Create downloadable 9:16 aspect ratio images perfect for social media platforms
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Server-Side Rendering**: Fast loading with SEO-friendly pre-rendered content

### 🔐 Admin Panel Features
- **Secure Authentication**: Session-based login system with protected routes
- **Complete CRUD Operations**: Add, edit, delete, and manage quotes through an intuitive interface
- **Live Preview**: Real-time quote preview with styling changes
- **Font Customization**: Choose from multiple Google Fonts (Montserrat, Playfair Display, Lora, etc.)
- **Color Picker**: Full color customization for quote text and backgrounds
- **Bulk Management**: Efficient table view for managing multiple quotes
- **Form Validation**: Client and server-side validation for data integrity

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **[Next.js](https://nextjs.org/)** | 14.0.0 | React framework with SSR/SSG support |
| **[React](https://reactjs.org/)** | 18.2.0 | UI component library |
| **[Tailwind CSS](https://tailwindcss.com/)** | 3.3.0 | Utility-first CSS framework |
| **[MongoDB](https://www.mongodb.com/)** | 6.0.0 | NoSQL database |
| **[Mongoose](https://mongoosejs.com/)** | 8.0.0 | MongoDB object modeling |
| **[Iron Session](https://github.com/vvo/iron-session)** | 8.0.0 | Secure session management |
| **[Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)** | 2.4.3 | Password hashing |
| **[html-to-image](https://github.com/bubkoo/html-to-image)** | 1.11.11 | Story image generation |

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB Atlas** account or local MongoDB instance
- **Git** for version control

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/inspirational-quotes-website.git
   cd inspirational-quotes-website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```

   Update the `.env.local` file with your configuration:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   SECRET_COOKIE_PASSWORD=your-secret-key-for-sessions
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set Up the Database**
   ```bash
   npm run seed
   ```
   This will create an initial admin user and sample quotes.

5. **Start the Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**

   - **Homepage**: [http://localhost:3000](http://localhost:3000)
   - **Admin Panel**: [http://localhost:3000/login](http://localhost:3000/login)

## 🔐 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `SECRET_COOKIE_PASSWORD` | Secret key for session encryption | Yes | `your-super-secret-key-change-in-production` |
| `NEXTAUTH_URL` | Base URL for the application | No | `http://localhost:3000` |

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com) and sign in
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings
   - Navigate to Environment Variables
   - Add all variables from your `.env.local` file

4. **Deploy**
   - Vercel will automatically deploy your application
   - Access your live site at the provided URL

### Alternative Deployment Platforms

The application can also be deployed to:
- **Netlify**: Requires build configuration
- **Railway**: Full-stack deployment support
- **DigitalOcean App Platform**: Scalable deployment
- **AWS Amplify**: Enterprise-grade hosting

For any platform, ensure:
- MongoDB connection string is properly configured
- All environment variables are set in the deployment environment
- Build process completes successfully

## 📁 Project Structure

```
inspirational-quotes-website/
├── components/              # React components
│   ├── QuoteCard.js        # Individual quote display component
│   ├── QuoteForm.js        # Admin form for CRUD operations
│   └── QuoteTable.js       # Admin quotes management table
├── lib/                    # Core libraries and utilities
│   ├── models/             # Database models
│   │   ├── Admin.js        # Admin user schema
│   │   └── Quote.js        # Quote schema
│   └── mongodb.js          # Database connection utility
├── pages/                  # Next.js pages and API routes
│   ├── _app.js             # Application wrapper
│   ├── admin.js            # Protected admin panel
│   ├── index.js            # Public homepage
│   ├── login.js            # Authentication page
│   └── api/                # REST API endpoints
│       ├── auth/           # Authentication routes
│       │   ├── login.js    # Admin login endpoint
│       │   └── logout.js   # Session destruction
│       └── quotes/         # Quote management routes
│           ├── index.js    # GET/POST quotes
│           └── [id].js     # PUT/DELETE individual quotes
├── scripts/                # Database utilities
│   └── seed.js             # Database seeding script
├── styles/                 # Global styling
│   └── globals.css         # Tailwind imports and custom styles
├── .env.local              # Environment variables (gitignored)
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # Project documentation
```

## 🔒 Security Features

- **Session Management**: Secure iron-session implementation
- **Password Hashing**: bcrypt.js for password security
- **Protected Routes**: Admin-only API endpoints
- **Input Validation**: Server-side data validation
- **XSS Protection**: React's automatic escaping
- **Environment Variables**: Sensitive data properly secured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Quote content and inspiration from various public sources
- Design inspiration from modern web applications
- Next.js community for excellent documentation and support

---

**Built with ❤️ using Next.js, Tailwind CSS, and MongoDB**