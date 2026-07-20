import { promises as fs } from "fs";
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
  const dir = path.join(process.cwd(), ".data");
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(
    path.join(dir, "leads.jsonl"),
    JSON.stringify(lead) + "\n",
    "utf8"
  );
  console.log("[leads] new lead", { email: lead.email, empresa: lead.empresa });
}
