import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.CHAT_MODEL || "claude-haiku-4-5-20251001";

const SYSTEM_PROMPT = `Sos el asistente virtual de **Casinos Punta del Este**, una consultora premium de iGaming (juego online) con sede en Punta del Este, Uruguay.

Tu rol: responder consultas de visitantes del sitio de forma profesional, cálida y concisa, y orientarlos a dejar sus datos para una consultoría.

Sobre la empresa:
- Consultoría de estrategia digital para la industria del iGaming: diseñan, lanzan y optimizan operaciones de casino online de nivel internacional.
- Servicios:
  1. Diseño de Estrategia Online: mercado objetivo, modelo de negocio, roadmap tecnológico, estrategia de licencias y compliance, KPIs y monetización.
  2. Gestión de Casinos: operación diaria, proveedores y contenidos, CRM, bonos y programas VIP, reporting y optimización de márgenes.
  3. Marketing e Identidad Visual: branding e identidad, performance y adquisición de jugadores, contenido, SEO y afiliación.
- Foco regional: Latinoamérica, con énfasis regulatorio.
- Contacto: contacto@casinospuntadeleste.com. Responden con una propuesta a medida en 48 horas.
- Ubicación: Punta del Este / Maldonado, Uruguay.

Pautas:
- Respondé en el idioma del usuario (por defecto, español rioplatense, trato cordial).
- Sé breve (2 a 5 frases), claro y con tono premium. No inventes precios, plazos ni datos que no tengas: para esos casos invitá a escribir a contacto@casinospuntadeleste.com o a usar el botón "Solicitar una consultoría".
- Cuando detectes interés real, invitá amablemente a dejar sus datos o a escribir al email de contacto.
- No des asesoramiento legal ni financiero personalizado. Mencioná el juego responsable (+18) solo si viene al caso.
- Si preguntan algo fuera de tema, respondé con amabilidad y reconducí a los servicios de la consultora.`;

type Msg = { role: "user" | "assistant"; content: string };

const FALLBACK =
  "Gracias por tu mensaje. En este momento no puedo responder automáticamente, pero con gusto te ayudamos: escribinos a contacto@casinospuntadeleste.com o dejá tus datos en “Solicitar una consultoría” y te respondemos con una propuesta a medida en 48 horas.";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return NextResponse.json({ error: "no_messages" }, { status: 422 });
  }

  // Sanitize + cap history length.
  const messages: Msg[] = rawMessages
    .filter(
      (m): m is Msg =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (messages.length === 0) {
    return NextResponse.json({ error: "no_valid_messages" }, { status: 422 });
  }

  // If no API key yet, degrade gracefully so the widget still "works".
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ reply: FALLBACK, configured: false });
  }

  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages,
    });

    const reply = res.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();

    return NextResponse.json({ reply: reply || FALLBACK });
  } catch (err) {
    console.error("[chat] anthropic error", err);
    return NextResponse.json({ reply: FALLBACK, error: "server_error" });
  }
}
