import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string; // Add the role property
    } & DefaultSession["user"];
  }

  interface User {
    role: string; // Also extend the User interface
  }
}