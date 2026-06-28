"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import clsx from "clsx";
import { supabase } from "@/lib/supabase";

type Status = "new" | "contacted" | "converted" | "closed";

type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string | null;
  source_page: string | null;
  status: Status;
  created_at: string;
};

const STATUSES: Status[] = ["new", "contacted", "converted", "closed"];

const STATUS_STYLE: Record<Status, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  converted: "bg-green-50 text-green-700 border-green-200",
  closed: "bg-slate-100 text-slate-500 border-slate-200",
};

export function Inquiries() {
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Status | "all">("all");

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setRows((data ?? []) as Inquiry[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const newCount = useMemo(() => rows.filter((r) => r.status === "new").length, [rows]);
  const visible = useMemo(
    () => (filter === "all" ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter],
  );

  async function updateStatus(id: string, status: Status) {
    if (!supabase) return;
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
    if (error) {
      setRows(prev); // revert on failure
      setError("Couldn't update status. Try again.");
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inquiries</h1>
          <p className="mt-1 text-sm text-slate-500">
            {newCount > 0 ? (
              <>
                <span className="font-medium text-admin-accent">{newCount} new</span> ·{" "}
                {rows.length} total
              </>
            ) : (
              <>{rows.length} total</>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} aria-hidden />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={clsx(
              "rounded-full border px-3 py-1 text-xs font-medium capitalize transition",
              filter === s
                ? "border-admin-accent bg-admin-accent/10 text-admin-accent"
                : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-medium">Lead</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="px-4 py-3 font-medium">Received</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map((r) => (
              <tr key={r.id} className={r.status === "new" ? "bg-blue-50/30" : undefined}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {r.status === "new" && (
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-admin-accent"
                        aria-label="Unread"
                      />
                    )}
                    <span className="font-medium text-slate-800">{r.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <a href={`tel:${r.phone}`} className="block text-slate-600 hover:text-admin-accent">
                    {r.phone}
                  </a>
                  <a
                    href={`mailto:${r.email}`}
                    className="block text-xs text-slate-400 hover:text-admin-accent"
                  >
                    {r.email}
                  </a>
                </td>
                <td className="max-w-xs px-4 py-3 text-slate-600">
                  <span className="line-clamp-2" title={r.message ?? ""}>
                    {r.message || <span className="text-slate-300">—</span>}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                  {new Date(r.created_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value as Status)}
                    aria-label={`Status for ${r.name}`}
                    className={clsx(
                      "rounded-full border px-3 py-1 text-xs font-medium capitalize outline-none",
                      STATUS_STYLE[r.status],
                    )}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {!loading && visible.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-slate-400">
                  No inquiries{filter !== "all" ? ` with status "${filter}"` : " yet"}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
