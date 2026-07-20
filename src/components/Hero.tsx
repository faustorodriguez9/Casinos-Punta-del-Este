"use client";

import { useEffect, useRef } from "react";
import { useConsultModal } from "./ConsultModalContext";
import { PlayIcon } from "./icons";

export default function Hero() {
  const { openModal } = useConsultModal();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reinforce autoplay: some browsers don't start a muted background video
  // until the element is ready or the tab becomes visible again. We retry on
  // mount, when the video can play, and on visibility changes.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero__left">
        <span className="eyebrow">Consultoría iGaming · Punta del Este, Uruguay</span>
        <h1 className="hero__title">
          Estrategia digital para la nueva generación del{" "}
          <span className="accent">iGaming</span>
        </h1>
        <p className="hero__text">
          Diseñamos, lanzamos y potenciamos operaciones de casino online de nivel
          internacional. Rigor institucional, ejecución premium y visión de mercado
          desde el corazón de la Riviera uruguaya.
        </p>
        <div className="hero__buttons">
          <div className="hero__buttons-row">
            <a className="btn-primary" href="#contacto">
              Contáctenos
            </a>
            <a className="btn-ghost" href="#servicios">
              Ver servicios
            </a>
          </div>
          <button type="button" className="btn-consult" onClick={openModal}>
            Solicitar una consultoría
          </button>
        </div>
      </div>

      <div className="hero__right">
        <div className="hero__video-fallback" aria-hidden>
          <div className="hero__play">
            <PlayIcon />
          </div>
        </div>
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/hero-poster.jpg"
        >
          <source src="/assets/0720.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
