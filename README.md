# Casinos Punta del Este — Landing

Landing page premium para **Casinos Punta del Este**, consultora de iGaming con sede en Punta del Este, Uruguay. Recreación en **Next.js (App Router) + React + TypeScript** del handoff de diseño hifi.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS (base/reset) + CSS global con los design tokens exactos (`src/app/globals.css`)
- Fuente **Jost** vía `next/font/google`
- `rss-parser` para las noticias del sector (server-side, con ISR y fallback)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # producción
```

## Estructura

```
src/
  app/
    layout.tsx            # metadata/SEO, OpenGraph, favicon, lang="es", fuente Jost
    page.tsx             # composición de la página (revalidate ISR de noticias)
    globals.css          # todos los estilos (design tokens exactos)
    api/leads/route.ts   # POST /api/leads — persiste leads del formulario
  components/
    Header.tsx           # nav sticky + animación del logo al click
    Hero.tsx             # hero split 50/50 con video nativo autoplay
    Sections.tsx         # métricas, servicios, clientes/Cipriani, equipo, CTA, footer
    NewsSection.tsx      # server component: 3 tarjetas RSS en vivo
    ConsultModal.tsx     # modal de consultoría (form + estados)
    ConsultModalContext  # estado compartido del modal
    icons.tsx            # SVGs LinkedIn / Instagram / Play
  lib/
    news.ts              # fetch RSS server-side + formato ES + fallback por fuente
    leads.ts             # persistencia de leads (swap a Postgres/Supabase en prod)
public/assets/           # logos, imágenes y video del hero
```

## Qué está implementado de verdad (no simulado)

1. **Formulario de leads** → `POST /api/leads` con validación y estados
   (loading / success / error). Por defecto persiste a `.data/leads.jsonl`;
   ver `src/lib/leads.ts` para conectar Postgres/Supabase y (opcional) email de aviso.
2. **RSS del lado del servidor** (`src/lib/news.ts`) con `rss-parser`, formateo de
   fechas en español, strip de HTML + recorte a 120 chars, **fallback por fuente**
   (SoloAzar / Yogonet / CodigoPoker) e **ISR** cada 3 h (`revalidate` en `page.tsx`).
3. **Video del hero**: `<video autoPlay muted loop playsInline>` nativo servido
   desde `/public` (sin el hack de blob del prototipo), con poster de respaldo.
4. **SEO/meta**: título, descripción, OpenGraph, Twitter card, favicon de marca, `lang="es"`.

## Deploy

Deploy en **Vercel** (`vercel` o import del repo). Apuntar el dominio de GoDaddy
a Vercel vía DNS. Configurar las variables de entorno de la base de datos si se
conecta una (ver `.env.example`).

> Nota: el proyecto no incluye `node_modules`. Ejecutar `npm install` antes de
> `npm run dev` / `npm run build`.
