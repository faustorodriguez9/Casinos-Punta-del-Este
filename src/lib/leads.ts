import { promises as fs } from "fs";
import os from "os";
import path from "path";

export type Lead = {
  nombre: string;
  email: string;
  empresa: string;
  mensaje: string;
  createdAt: string;
};

const TO_EMAIL = process.env.LEADS_EMAIL_TO || "contacto@casinospuntadeleste.com";
// The "from" must be an address on a domain verified in Resend. Until the
// domain is verified you can use Resend's shared sandbox sender.
const FROM_EMAIL =
  process.env.LEADS_EMAIL_FROM ||
  "Casinos Punta del Este <onboarding@resend.dev>";

/**
 * Handle a new lead: persist it (Postgres, with local/log fallback) and send a
 * notification email. Both steps are best-effort and independent — a failure in
 * one never blocks the other, and neither one throws, so the form always
 * responds successfully to the user even if a backend is not yet configured.
 */
export async function handleLead(lead: Lead): Promise<void> {
  // Never lose a lead: log it (visible in Vercel function logs) no matter what.
  console.log("[leads] new lead", JSON.stringify(lead));

  await Promise.allSettled([persistLead(lead), notifyLead(lead)]);
}

/* ----------------------------------------------------------- persistence */

async function persistLead(lead: Lead): Promise<void> {
  // Prefer a real database when a Postgres connection string is configured
  // (Vercel injects POSTGRES_URL when you attach a Postgres store).
  if (process.env.POSTGRES_URL) {
    try {
      const { sql } = await import("@vercel/postgres");
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id          BIGSERIAL PRIMARY KEY,
          nombre      TEXT NOT NULL,
          email       TEXT NOT NULL,
          empresa     TEXT,
          mensaje     TEXT,
          created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`
        INSERT INTO leads (nombre, email, empresa, mensaje, created_at)
        VALUES (${lead.nombre}, ${lead.email}, ${lead.empresa}, ${lead.mensaje}, ${lead.createdAt})
      `;
      return;
    } catch (err) {
      console.error("[leads] postgres insert failed", err);
      // fall through to the file fallback below
    }
  }

  // Fallback: append to a JSONL file. Writable in local dev; on read-only
  // hosts (e.g. Vercel) this uses the temp dir and never throws.
  try {
    const base =
      process.env.VERCEL || process.env.AWS_REGION
        ? os.tmpdir()
        : path.join(process.cwd(), ".data");
    await fs.mkdir(base, { recursive: true });
    await fs.appendFile(
      path.join(base, "leads.jsonl"),
      JSON.stringify(lead) + "\n",
      "utf8"
    );
  } catch (err) {
    console.warn("[leads] file append skipped", err);
  }
}

/* ------------------------------------------------------------ email */

async function notifyLead(lead: Lead): Promise<void> {
  if (!process.env.RESEND_API_KEY) return; // email not configured yet

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const esc = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: lead.email,
      subject: `Nueva consulta de ${lead.nombre}${lead.empresa ? ` (${lead.empresa})` : ""}`,
      html: `
        <h2 style="font-family:sans-serif;color:#0c1e3a;">Nueva consulta desde el sitio</h2>
        <table style="font-family:sans-serif;font-size:14px;color:#334d6e;border-collapse:collapse;">
          <tr><td style="padding:4px 12px 4px 0;"><strong>Nombre</strong></td><td>${esc(lead.nombre)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;"><strong>Email</strong></td><td>${esc(lead.email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;"><strong>Empresa</strong></td><td>${esc(lead.empresa) || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;vertical-align:top;"><strong>Mensaje</strong></td><td>${esc(lead.mensaje).replace(/\n/g, "<br>") || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;"><strong>Fecha</strong></td><td>${lead.createdAt}</td></tr>
        </table>
      `,
    });
  } catch (err) {
    console.error("[leads] email send failed", err);
  }
}
