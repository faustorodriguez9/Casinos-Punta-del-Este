import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-jost",
  display: "swap",
});

const SITE_URL = "https://www.casinospuntadeleste.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Casinos Punta del Este · Consultoría de iGaming",
  description:
    "Consultoría de estrategia digital para la industria del iGaming. Diseñamos, lanzamos y potenciamos operaciones de casino online de nivel internacional desde Punta del Este, Uruguay.",
  keywords: [
    "iGaming",
    "consultoría casino online",
    "estrategia digital iGaming",
    "Punta del Este",
    "Uruguay",
    "gestión de casinos",
  ],
  authors: [{ name: "Casinos Punta del Este" }],
  icons: {
    icon: "/assets/logo-casinos.png",
    apple: "/assets/logo-casinos.png",
  },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: SITE_URL,
    siteName: "Casinos Punta del Este",
    title: "Casinos Punta del Este · Consultoría de iGaming",
    description:
      "Estrategia digital para la nueva generación del iGaming. Rigor institucional, ejecución premium y visión de mercado desde Punta del Este.",
    images: [
      {
        url: "/assets/PHOTO-2026-07-20-16-56-52.jpg",
        width: 1200,
        height: 630,
        alt: "Casinos Punta del Este",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casinos Punta del Este · Consultoría de iGaming",
    description:
      "Estrategia digital para la nueva generación del iGaming, desde Punta del Este, Uruguay.",
    images: ["/assets/PHOTO-2026-07-20-16-56-52.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={jost.variable}>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
