import Parser from "rss-parser";

export type NewsItem = {
  id: string;
  source: string;
  logo: string;
  siteUrl: string;
  title: string;
  date: string; // formatted "20 Jul 2026"
  isoDate: string; // for sorting
  description: string;
  link: string;
};

const YOGONET = {
  source: "Yogonet",
  logo: "/assets/logo_central_180.png.webp",
  siteUrl: "https://www.yogonet.com/latinoamerica/uruguay/",
  // Feed específico de Uruguay (solo noticias del país).
  feed: "https://www.yogonet.com/latinoamerica/uruguay/rss.xml",
};

/**
 * Semilla / respaldo: las 6 notas con las que arranca hoy. Si el feed en vivo
 * responde, las notas más nuevas se incorporan automáticamente y estas van
 * quedando desplazadas por fecha; si el feed falla, se muestran estas 6.
 */
type SeedItem = Omit<NewsItem, "source" | "logo" | "siteUrl">;

const SEED: SeedItem[] = [
  {
    id: "109839",
    title:
      "El gobierno confirma que evalúa una iniciativa privada para el Hotel Casino Carmelo desde diciembre de 2025",
    date: "21 Jul 2026",
    isoDate: "2026-07-21",
    description:
      "El Ejecutivo analiza una propuesta privada para reactivar el Hotel Casino de Carmelo. Toque para leer la nota completa en Yogonet.",
    link: "https://www.yogonet.com/latinoamerica/noticias/2026/07/21/109839-el-gobierno-confirma-que-evalua-una-iniciativa-privada-para-el-hotel-casino-carmelo-desde-diciembre-de-2025",
  },
  {
    id: "109819",
    title:
      "Uruguay: la Intendencia de Colonia se suma al análisis de la licitación del Hotel Casino Carmelo",
    date: "20 Jul 2026",
    isoDate: "2026-07-20",
    description:
      "La Intendencia de Colonia participa del análisis de la licitación del complejo. Toque para leer la nota completa en Yogonet.",
    link: "https://www.yogonet.com/latinoamerica/noticias/2026/07/20/109819-uruguay-la-intendencia-de-colonia-se-suma-al-analisis-de-la-licitacion-del-hotel-casino-carmelo",
  },
  {
    id: "109781",
    title:
      "Uruguay: Loterías y Quinielas bloqueó cerca de 2000 plataformas online de apuestas ilegales",
    date: "16 Jul 2026",
    isoDate: "2026-07-16",
    description:
      "El organismo estatal reforzó el bloqueo de plataformas de apuestas ilegales. Toque para leer la nota completa en Yogonet.",
    link: "https://www.yogonet.com/latinoamerica/noticias/2026/07/16/109781-uruguay-loterias-y-quinielas-bloqueo-cerca-de-2000-plataformas-online-de-apuestas-ilegales",
  },
  {
    id: "109756",
    title:
      "El Banco Central del Uruguay aprueba la venta de Enjoy Punta del Este y JHSF asume el control del complejo",
    date: "15 Jul 2026",
    isoDate: "2026-07-15",
    description:
      "El BCU aprobó la operación y JHSF toma el control del complejo de Punta del Este. Toque para leer la nota completa en Yogonet.",
    link: "https://www.yogonet.com/latinoamerica/noticias/2026/07/15/109756-el-banco-central-del-uruguay-aprueba-la-venta-de-enjoy-punta-del-este-y-jhsf-asume-el-control-del-complejo",
  },
  {
    id: "109632",
    title:
      "El Casino Parque Hotel de Montevideo da un balance negativo por sexto año consecutivo",
    date: "06 Jul 2026",
    isoDate: "2026-07-06",
    description:
      "El histórico casino montevideano cerró otro ejercicio en rojo. Toque para leer la nota completa en Yogonet.",
    link: "https://www.yogonet.com/latinoamerica/noticias/2026/07/06/109632-el-casino-parque-hotel-de-montevideo-da-un-balance-negativo-por-sexto-ano-consecutivo",
  },
  {
    id: "109283",
    title:
      "El Grupo Cipriani inició la formación de crupieres para su nuevo casino y proyecta su apertura para diciembre",
    date: "09 Jun 2026",
    isoDate: "2026-06-09",
    description:
      "Cipriani comenzó a capacitar crupieres y apunta a inaugurar su casino en diciembre. Toque para leer la nota completa en Yogonet.",
    link: "https://www.yogonet.com/latinoamerica/noticias/2026/06/09/109283-el-grupo-cipriani-inicio-la-formacion-de-crupieres-para-su-nuevo-casino-y-proyecta-su-apertura-para-diciembre",
  },
];

const MONTHS_ES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

function formatDate(input?: string): string {
  if (!input) return "";
  const d = new Date(input);
  if (isNaN(d.getTime())) return "";
  return `${d.getDate()} ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`;
}

function stripHtml(html?: string): string {
  if (!html) return "";
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8230;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 140) return text;
  return text.slice(0, 140).trimEnd() + "…";
}

function idFromLink(link?: string): string {
  const m = (link || "").match(/\/(\d{4,})-/);
  return m ? m[1] : link || Math.random().toString(36).slice(2);
}

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  },
});

/**
 * Devuelve SIEMPRE 6 notas de Yogonet, más nuevas primero: mezcla las últimas
 * del feed en vivo con la semilla, deduplicando por id (gana la versión del
 * feed) y ordenando por fecha.
 */
export async function getYogonetNews(): Promise<NewsItem[]> {
  const byId = new Map<string, NewsItem>();

  try {
    const feed = await parser.parseURL(YOGONET.feed);
    for (const item of feed.items || []) {
      if (!item.link || !item.title) continue;
      const id = idFromLink(item.link);
      byId.set(id, {
        id,
        source: YOGONET.source,
        logo: YOGONET.logo,
        siteUrl: YOGONET.siteUrl,
        title: item.title.trim(),
        date: formatDate(item.isoDate || item.pubDate),
        isoDate: item.isoDate || item.pubDate || "",
        description:
          stripHtml(
            item.contentSnippet ||
              item.content ||
              (item as { description?: string }).description
          ) || "Toque para leer la nota completa en Yogonet.",
        link: item.link,
      });
    }
  } catch {
    // el feed falló: seguimos solo con la semilla
  }

  // Completar con la semilla las que no vinieron del feed.
  for (const s of SEED) {
    if (!byId.has(s.id)) {
      byId.set(s.id, {
        ...s,
        source: YOGONET.source,
        logo: YOGONET.logo,
        siteUrl: YOGONET.siteUrl,
      });
    }
  }

  return Array.from(byId.values())
    .sort((a, b) => (b.isoDate || "").localeCompare(a.isoDate || ""))
    .slice(0, 6);
}
