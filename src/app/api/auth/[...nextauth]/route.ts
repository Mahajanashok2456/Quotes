import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('AUTHORIZE: Attempting login for:', credentials?.email); // Log email attempt

        if (!credentials?.email || !credentials?.password) {
          console.log('AUTHORIZE: Missing email or password');
          return null;
        }

        try {
          const { db } = await connectToDatabase();
          console.log('AUTHORIZE: Database connected.'); // Log DB connection

          const adminCollection = db.collection('admins');
          const userDoc = await adminCollection.findOne({ email: credentials.email });
          console.log('AUTHORIZE: User found in DB:', userDoc ? userDoc.email : 'No user found'); // Log user found/not found

          if (!userDoc) {
            console.log('AUTHORIZE: No user found, returning null.');
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, userDoc.password);
          console.log('AUTHORIZE: Password match result:', isValid); // Log password comparison result

          if (!isValid) {
            console.log('AUTHORIZE: Passwords do not match, returning null.');
            return null;
          }

          console.log('AUTHORIZE: Passwords match, returning user.');
          return {
            id: userDoc._id.toString(),
            email: userDoc.email,
          };
        } catch (error) {
          console.error('AUTHORIZE: Error during authorization:', error); // Log any errors
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/manage-content-a3f8b1c9/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }