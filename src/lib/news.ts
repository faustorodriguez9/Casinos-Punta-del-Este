import Parser from "rss-parser";

export type NewsItem = {
  source: string;
  logo: string;
  siteUrl: string;
  title: string;
  date: string; // formatted "20 Jul 2026"
  description: string;
  link: string;
};

type Source = {
  source: string;
  logo: string;
  siteUrl: string;
  feed: string;
  fallback: { title: string; description: string };
};

const SOURCES: Source[] = [
  {
    source: "SoloAzar",
    logo: "/assets/solo-azar.png",
    siteUrl: "https://www.soloazar.com/",
    feed: "https://www.soloazar.com/rss.xml",
    fallback: {
      title: "Novedades del sector del juego online en Latinoamérica",
      description:
        "SoloAzar reúne las últimas noticias de la industria del iGaming, regulación y operadores en la región. Visite el portal para ver la cobertura completa…",
    },
  },
  {
    source: "Yogonet",
    logo: "/assets/logo_central_180.png.webp",
    siteUrl: "https://www.yogonet.com/international/",
    feed: "https://www.yogonet.com/latinoamerica/rss.xml",
    fallback: {
      title: "Actualidad internacional de la industria del gaming",
      description:
        "Yogonet cubre las principales noticias de casinos, apuestas y iGaming a nivel global y regional. Visite el portal para leer más…",
    },
  },
  {
    source: "CodigoPoker",
    logo: "/assets/logo.webp",
    siteUrl: "https://codigopoker.com/",
    feed: "https://codigopoker.com/feed/",
    fallback: {
      title: "Poker, casinos y apuestas: la agenda de la industria",
      description:
        "CodigoPoker sigue de cerca la actualidad del poker y el juego online en Latinoamérica. Visite el portal para ver las últimas notas…",
    },
  },
];

const MONTHS_ES = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
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
  if (text.length <= 120) return text;
  return text.slice(0, 120).trimEnd() + "…";
}

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  },
});

async function fetchSource(src: Source): Promise<NewsItem> {
  try {
    const feed = await parser.parseURL(src.feed);
    const item = feed.items?.[0];
    if (item) {
      return {
        source: src.source,
        logo: src.logo,
        siteUrl: src.siteUrl,
        title: item.title?.trim() || src.fallback.title,
        date: formatDate(item.isoDate || item.pubDate),
        description:
          stripHtml(item.contentSnippet || item.content || (item as { description?: string }).description) ||
          src.fallback.description,
        link: item.link || src.siteUrl,
      };
    }
  } catch {
    // fall through to fallback
  }
  return {
    source: src.source,
    logo: src.logo,
    siteUrl: src.siteUrl,
    title: src.fallback.title,
    date: "",
    description: src.fallback.description,
    link: src.siteUrl,
  };
}

export async function getNews(): Promise<NewsItem[]> {
  return Promise.all(SOURCES.map(fetchSource));
}
