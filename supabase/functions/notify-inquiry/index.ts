// Supabase Edge Function: notify-inquiry
// Sends the gym owner an email when a new inquiry row is inserted.
//
// Trigger: a Supabase Database Webhook on INSERT of public.inquiries (configure
// in Dashboard → Database → Webhooks), pointing at this function's URL with a
// header `x-webhook-secret: <WEBHOOK_SECRET>`.
//
// Required secrets (Dashboard → Edge Functions → Secrets, or `supabase secrets set`):
//   RESEND_API_KEY   — Resend API key
//   NOTIFY_TO        — owner email to alert (e.g. owner@fitzonegym.com)
//   NOTIFY_FROM      — verified Resend sender (e.g. alerts@yourdomain.com)
//   WEBHOOK_SECRET   — shared secret matching the webhook header
//
// Deploy:
//   supabase functions deploy notify-inquiry --no-verify-jwt

interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string | null;
  source_page: string | null;
  created_at: string;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Verify the shared secret so only the configured webhook can trigger email.
  const secret = Deno.env.get("WEBHOOK_SECRET");
  if (secret && req.headers.get("x-webhook-secret") !== secret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = await req.json().catch(() => null);
  const record = payload?.record as InquiryRecord | undefined;
  if (!record) {
    return new Response("Bad payload", { status: 400 });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("NOTIFY_TO");
  const from = Deno.env.get("NOTIFY_FROM");
  if (!apiKey || !to || !from) {
    return new Response("Email not configured", { status: 500 });
  }

  const html = `
    <h2>New FitZone inquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(record.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(record.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(record.email)}</p>
    <p><strong>Message:</strong> ${escapeHtml(record.message ?? "—")}</p>
    <p><strong>From page:</strong> ${escapeHtml(record.source_page ?? "—")}</p>
    <p style="color:#888">Received ${escapeHtml(record.created_at)}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: record.email,
      subject: `New inquiry from ${record.name}`,
      html,
    }),
  });

  if (!res.ok) {
    return new Response(`Email failed: ${await res.text()}`, { status: 502 });
  }
  return new Response("ok", { status: 200 });
});

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
