import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb'; // Make sure this file is correctly set up
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise), // Use MongoDB Adapter for session storage
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (user && credentials.password === user.password) {
          return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    }
  },
  session: {
    strategy: 'jwt', // Keep JWT strategy, but sessions will still be stored in the database
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
