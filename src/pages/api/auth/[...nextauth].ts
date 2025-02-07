import NextAuth from "next-auth";
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
        await dbConnect();
        if (!credentials) {
          return null;
        }
        const user = await User.findOne({ email: credentials.email });

        if (user && credentials.password === user.password) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt" as const, // ✅ Force JWT for per-tab authentication
  },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: false, // ✅ Ensures cookies aren't shared across tabs
  cookies: {
    sessionToken: {
      name: `next-auth.session-token-${Math.random()}`, // ✅ Randomized per tab
      options: {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: "lax" as const,
        path: "/",
      },
    },
  },
};

export default NextAuth(authOptions);
