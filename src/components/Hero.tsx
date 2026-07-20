"use client";

import { useConsultModal } from "./ConsultModalContext";
import { PlayIcon } from "./icons";

export default function Hero() {
  const { openModal } = useConsultModal();

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
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/PHOTO-2026-07-20-16-56-52.jpg"
        >
          <source src="/assets/0720.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
