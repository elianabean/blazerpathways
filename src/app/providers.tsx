"use client";
import { SessionProvider, signIn, signOut } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider
      session={typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("next-auth.session") || "null") : null}
    >
      {children}
    </SessionProvider>
  );
}
