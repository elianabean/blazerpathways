"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider session={null}>
      <SessionSync />
      {children}
    </SessionProvider>
  );
}

// Sync session with sessionStorage
function SessionSync() {
  const { data: session } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (session) {
        sessionStorage.setItem("next-auth.session", JSON.stringify(session));
      } else {
        sessionStorage.removeItem("next-auth.session");
      }
    }
  }, [session]);

  return null;
}
