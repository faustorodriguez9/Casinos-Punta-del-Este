"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [animating, setAnimating] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <Image
            src="/assets/logo-casinos.png"
            alt="Casinos Punta del Este"
            width={148}
            height={148}
            priority
            className={`header__logo${animating ? " is-animating" : ""}`}
            onClick={() => {
              setAnimating(true);
              window.setTimeout(() => setAnimating(false), 600);
            }}
          />
          <span className="header__name">Casinos Punta del Este</span>
        </div>
        <nav className="header__nav">
          <a className="nav-link" href="#servicios">
            Servicios
          </a>
          <a className="nav-link" href="#clientes">
            Clientes
          </a>
          <a className="nav-link" href="#blog">
            Actualidad
          </a>
          <a className="nav-cta" href="#contacto">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
