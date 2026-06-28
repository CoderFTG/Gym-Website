"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Login } from "@/components/admin/Login";
import { Dashboard } from "@/components/admin/Dashboard";

/**
 * Root of the admin SPA. Resolves the Supabase auth session client-side and
 * routes to either the login screen or the dashboard. Neutral light theme
 * (Brief §6.1) — deliberately distinct from the public Ink/Volt site.
 */
export function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-admin-bg font-sans text-slate-900 [color-scheme:light]">
      {!isSupabaseConfigured ? (
        <CenteredNote>
          Supabase isn&apos;t configured. Add your project keys to{" "}
          <code>.env.local</code> to use the admin panel.
        </CenteredNote>
      ) : loading ? (
        <CenteredNote>Loading…</CenteredNote>
      ) : session ? (
        <Dashboard email={session.user.email ?? "admin"} />
      ) : (
        <Login />
      )}
    </div>
  );
}

function CenteredNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center text-slate-500">
      <p className="max-w-sm text-sm">{children}</p>
    </div>
  );
}
