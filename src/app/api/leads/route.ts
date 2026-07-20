import { NextRequest, NextResponse } from "next/server";
import { handleLead } from "@/lib/leads";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { nombre, email, empresa, mensaje } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof nombre !== "string" ||
    typeof email !== "string" ||
    !nombre.trim() ||
    !EMAIL_RE.test(email.trim())
  ) {
    return NextResponse.json({ error: "validation_error" }, { status: 422 });
  }

  try {
    await handleLead({
      nombre: nombre.trim(),
      email: email.trim(),
      empresa: typeof empresa === "string" ? empresa.trim() : "",
      mensaje: typeof mensaje === "string" ? mensaje.trim() : "",
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[leads] failed to save", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
