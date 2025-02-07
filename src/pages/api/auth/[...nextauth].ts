import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
      
        if (!credentials) {
          return null;
        }

        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
      
        if (!user) {
          return null;
        }
      
        if (credentials.password !== user.password) {
          return null;
        }
      
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
      
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt" as SessionStrategy, // ✅ Use JWT sessions (avoids cookies)
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
