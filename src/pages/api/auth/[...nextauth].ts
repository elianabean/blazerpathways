import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from 'next-auth/jwt'; // 👈 Import JWT type
import { Session } from 'next-auth'; // 👈 Import Session type
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });
        if (user && credentials?.password === user.password) {
          return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) { // 👈 Explicitly type JWT
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) { // 👈 Explicitly type Session & JWT
      session.user.role = token.role as string;
      session.user.id = token.id as string;
      return session;
    }
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
