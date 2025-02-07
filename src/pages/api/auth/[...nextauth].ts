import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect(); // Connect to the database
        if (!credentials) {
          return null;
        }

        const user = await User.findOne({ email: credentials.email });

        if (user && credentials.password === user.password) {
          return { id: user._id, name: user.name, email: user.email, role: user.role };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    }
  },
  session: { strategy: 'jwt' as 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
