import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToMongoose } from "@/lib/mongodb";
import User from "@/models/User";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Debug logging to see what credentials are received
        console.log('AUTHORIZE FUNCTION - Credentials received:', credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log('AUTHORIZE FUNCTION - Missing email or password');
          return null;
        }

        try {
          // Connect to MongoDB
          await connectToMongoose();
          
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          
          console.log('AUTHORIZE FUNCTION - User found:', user);
          
          if (!user) {
            console.log('AUTHORIZE FUNCTION - User not found');
            return null;
          }

          // Check if the password matches
          console.log('AUTHORIZE FUNCTION - Comparing passwords...');
          const isValid = await user.comparePassword(credentials.password);
          console.log('AUTHORIZE FUNCTION - Password comparison result:', isValid);
          
          if (!isValid) {
            console.log('AUTHORIZE FUNCTION - Password mismatch');
            return null;
          }

          // Return user object
          console.log('AUTHORIZE FUNCTION - Authentication successful');
          return {
            id: user._id.toString(),
            email: user.email,
            name: "Admin"
          };
        } catch (error) {
          console.error('AUTHORIZE FUNCTION - Error during authentication:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/manage-mahajan/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // @ts-ignore
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };