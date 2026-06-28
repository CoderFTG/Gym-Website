"use client";

import { useState } from "react";
import { Inbox, FileText, LogOut, Dumbbell } from "lucide-react";
import clsx from "clsx";
import { supabase } from "@/lib/supabase";
import { Inquiries } from "@/components/admin/Inquiries";
import { ContentView } from "@/components/admin/ContentView";

type View = "inquiries" | "content";

const NAV: { id: View; label: string; icon: typeof Inbox }[] = [
  { id: "inquiries", label: "Inquiries", icon: Inbox },
  { id: "content", label: "Content", icon: FileText },
];

/**
 * Admin shell: sidebar (desktop) / top selector (mobile) + main panel.
 * Inquiries opens by default — leads are the most time-sensitive content
 * (Brief §6.4).
 */
export function Dashboard({ email }: { email: string }) {
  const [view, setView] = useState<View>("inquiries");

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
          <Dumbbell className="text-admin-accent" size={22} aria-hidden />
          <span className="font-semibold tracking-tight">FitZone Admin</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition",
                view === item.id
                  ? "bg-admin-accent/10 text-admin-accent"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              <item.icon size={18} aria-hidden />
              {item.label}
            </button>
          ))}
        </nav>
        <SignOut email={email} />
      </aside>

      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-admin-accent" size={20} aria-hidden />
          <span className="font-semibold">FitZone Admin</span>
        </div>
        <select
          value={view}
          onChange={(e) => setView(e.target.value as View)}
          className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm"
          aria-label="Select section"
        >
          {NAV.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </header>

      {/* Main panel */}
      <main className="flex-1 p-4 md:p-8">
        {view === "inquiries" ? <Inquiries /> : <ContentView />}
      </main>
    </div>
  );
}

function SignOut({ email }: { email: string }) {
  return (
    <div className="border-t border-slate-200 p-3">
      <p className="truncate px-3 pb-2 text-xs text-slate-400" title={email}>
        {email}
      </p>
      <button
        type="button"
        onClick={() => supabase?.auth.signOut()}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100"
      >
        <LogOut size={18} aria-hidden />
        Sign out
      </button>
    </div>
  );
}
