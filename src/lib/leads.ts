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

/**
 * Persist a lead.
 *
 * This default implementation appends to a local JSONL file so the flow works
 * out of the box in development. For production, swap the body for your chosen
 * database. Two common options:
 *
 *  // --- Postgres / Supabase / Neon (via `@vercel/postgres` or `pg`) ---
 *  import { sql } from "@vercel/postgres";
 *  await sql`
 *    INSERT INTO leads (nombre, email, empresa, mensaje, created_at)
 *    VALUES (${lead.nombre}, ${lead.email}, ${lead.empresa}, ${lead.mensaje}, ${lead.createdAt})
 *  `;
 *
 *  // --- Supabase JS client ---
 *  import { createClient } from "@supabase/supabase-js";
 *  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
 *  await supabase.from("leads").insert(lead);
 *
 * Optionally, fire a notification email here (Resend / Postmark / SES).
 */
export async function saveLead(lead: Lead): Promise<void> {
  // Always record the lead in the server logs (visible in Vercel's function
  // logs) so it is never silently lost, whatever the storage backend does.
  console.log("[leads] new lead", JSON.stringify(lead));

  // Best-effort append to a JSONL file. On a writable filesystem (local dev)
  // this uses the project's .data folder; on a read-only host (e.g. Vercel)
  // it falls back to the OS temp dir, and if even that fails we don't throw —
  // the lead is still captured in the logs above.
  //
  // NOTE: this file-based store is a placeholder. For real, durable persistence
  // wire a database or email here (see the options documented above). On
  // serverless hosts the temp dir is ephemeral and NOT a source of truth.
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
    console.warn("[leads] file append skipped (read-only fs?)", err);
  }
}
