"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { NewsItem } from "@/lib/news";

export default function NewsCarousel({ items }: { items: NewsItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const recompute = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length < 1) return;
    const cards = track.children;
    const first = cards[0].getBoundingClientRect();
    // distance between two cards (card width + gap); fall back to card width
    const s =
      cards.length > 1
        ? cards[1].getBoundingClientRect().left - first.left
        : first.width;
    const container = track.parentElement;
    const visible = container
      ? Math.max(1, Math.round(container.clientWidth / s))
      : 1;
    setStep(s);
    setMaxIndex(Math.max(0, cards.length - visible));
    setIndex((i) => Math.min(i, Math.max(0, cards.length - visible)));
  }, []);

  useEffect(() => {
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [recompute, items.length]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <div className="news-carousel">
      <button
        type="button"
        className="news-arrow news-arrow--prev"
        onClick={prev}
        disabled={index === 0}
        aria-label="Noticias anteriores"
      >
        <Arrow dir="left" />
      </button>

      <div className="news-viewport">
        <div
          className="news-track"
          ref={trackRef}
          style={{ transform: `translateX(-${index * step}px)` }}
        >
          {items.map((n) => (
            <a
              className="news-card"
              key={n.id}
              href={n.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="news-card__media">
                <Image
                  src={n.logo}
                  alt={n.source}
                  width={180}
                  height={90}
                  style={{ objectFit: "contain", width: "auto", height: "auto" }}
                />
              </div>
              <div className="news-card__body">
                <div className="news-card__meta">
                  <span className="news-card__source">{n.source}</span>
                  {n.date && <span className="news-card__date">· {n.date}</span>}
                </div>
                <h3 className="news-card__title">{n.title}</h3>
                <p className="news-card__desc">{n.description}</p>
                <span className="news-card__cta">Leer más →</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="news-arrow news-arrow--next"
        onClick={next}
        disabled={index >= maxIndex}
        aria-label="Noticias siguientes"
      >
        <Arrow dir="right" />
      </button>

      <div className="news-dots" role="tablist" aria-label="Posición del carrusel">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`news-dot${i === index ? " is-active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir a la posición ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
