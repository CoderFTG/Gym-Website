import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/AdminApp";

export const metadata: Metadata = {
  title: "Admin — FitZone",
  // Keep the admin out of search engines.
  robots: { index: false, follow: false },
};

/**
 * Admin dashboard route. The page shell is static; all auth and data access
 * happen client-side against Supabase (RLS-protected), so it works on static
 * hosting without a server.
 */
export default function AdminPage() {
  return <AdminApp />;
}
