import Image from "next/image";
import { InstagramIcon, LinkedInIcon } from "./icons";

/* ---------------------------------------------------------------- Metrics */
const METRICS = [
  { num: "+30", label: "Años en gestión de juego" },
  { num: "+10", label: "Operadores asesorados" },
  { num: "LatAm", label: "Foco regional & regulatorio" },
  { num: "24/7", label: "Acompañamiento operativo" },
];

export function Metrics() {
  return (
    <section className="metrics">
      {METRICS.map((m) => (
        <div className="metric" key={m.label}>
          <div className="metric__num">{m.num}</div>
          <div className="metric__label">{m.label}</div>
        </div>
      ))}
    </section>
  );
}

/* -------------------------------------------------------------- Servicios */
const SERVICES = [
  {
    num: "01",
    title: "Diseño de Estrategia Online",
    text: "Definimos el rumbo digital de su operación: mercado objetivo, modelo de negocio, roadmap tecnológico y hoja de ruta regulatoria.",
    bullets: [
      "Análisis de mercado y competencia",
      "Modelo de monetización y KPIs",
      "Estrategia de licencias y compliance",
    ],
  },
  {
    num: "02",
    title: "Gestión de Casinos",
    text: "Operamos y optimizamos su casino online día a día, con foco en retención, rentabilidad y experiencia del jugador.",
    bullets: [
      "Gestión de proveedores y contenidos",
      "CRM, bonos y programas VIP",
      "Reporting y optimización de márgenes",
    ],
  },
  {
    num: "03",
    title: "Marketing e Identidad Visual",
    text: "Construimos marcas de casino memorables y campañas de adquisición que convierten, con estándar visual premium.",
    bullets: [
      "Branding e identidad visual",
      "Performance & adquisición de jugadores",
      "Contenido, SEO y afiliación",
    ],
  },
];

export function Servicios() {
  return (
    <section className="section-light" id="servicios">
      <div className="container">
        <div className="services__head">
          <div>
            <span className="eyebrow-light">Servicios</span>
            <h2 className="services__title">Todo lo que su operación necesita</h2>
          </div>
          <p className="services__intro">
            Cubrimos el ciclo completo: de la estrategia y la licencia a la marca y la
            gestión diaria del casino.
          </p>
        </div>
        <div className="services__grid">
          {SERVICES.map((s) => (
            <article className="service-card" key={s.num}>
              <div className="service-card__num">{s.num}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__text">{s.text}</p>
              <ul className="service-card__list">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Clientes */
export function Clientes() {
  return (
    <section className="section-dark" id="clientes">
      <div className="container">
        <div className="clientes__head">
          <span className="eyebrow-dark eyebrow--center" style={{ display: "block" }}>
            Clientes &amp; Confianza
          </span>
          <h2 className="clientes__title">Acompañamos a marcas legendarias</h2>
        </div>

        <div className="cipriani-card">
          <div className="cipriani-card__body">
            <div className="cipriani-card__top">
              <a
                href="https://www.cipriani.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Sitio de Cipriani"
              >
                <Image
                  src="/assets/cipriani-logo-transparent.png"
                  alt="Cipriani"
                  width={140}
                  height={38}
                  className="cipriani-card__logo"
                />
              </a>
              <span className="cipriani-tag">Cliente destacado</span>
              <a
                href="https://www.instagram.com/cipriani?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram de Cipriani"
                className="cipriani-ig"
              >
                <InstagramIcon />
                @cipriani
              </a>
            </div>

            <p>
              Cipriani es una de las marcas internacionales más legendarias en
              hospitalidad, gastronomía y lujo. Fundada en Venecia en 1931 con el célebre{" "}
              <em>Harry&apos;s Bar</em> —cuna del Bellini y del carpaccio—, la firma familiar
              ha crecido durante cuatro generaciones hasta convertirse en un imperio global
              de restaurantes, residencias y hoteles boutique.
            </p>
            <p>
              Bajo el nombre <strong>Cipriani Resort, Residences &amp; Casino</strong>, la
              marca desarrolla en Punta del Este el complejo turístico e inmobiliario más
              ambicioso del Cono Sur, en el predio del mítico Hotel San Rafael, sobre la
              Playa Brava.
            </p>

            <div className="cipriani-data">
              <div>
                <div className="cipriani-data__label">Inversión</div>
                <div className="cipriani-data__value">USD 450–500M</div>
              </div>
              <div>
                <div className="cipriani-data__label">Torre principal</div>
                <div className="cipriani-data__value">320 metros</div>
              </div>
              <div>
                <div className="cipriani-data__label">Masterplan</div>
                <div className="cipriani-data__value">Rafael Viñoly</div>
              </div>
              <div>
                <div className="cipriani-data__label">Foco estratégico</div>
                <div className="cipriani-data__value">Casino online</div>
              </div>
            </div>
          </div>

          <div className="cipriani-card__media">
            <figure className="cipriani-shot">
              <Image
                src="/assets/PHOTO-2026-07-20-16-56-52.jpg"
                alt="Render del casino del complejo Cipriani"
                width={1600}
                height={1014}
                quality={90}
                sizes="(max-width: 1024px) 100vw, 460px"
                style={{ width: "100%", height: "auto" }}
              />
              <figcaption>Casa Cipriani · Casino, predio del Hotel San Rafael</figcaption>
            </figure>
            <figure className="cipriani-shot">
              <Image
                src="/assets/PHOTO-2026-07-20-16-57-15.jpg"
                alt="Vista aérea de las torres del complejo Cipriani"
                width={1600}
                height={794}
                quality={90}
                sizes="(max-width: 1024px) 100vw, 460px"
                style={{ width: "100%", height: "auto" }}
              />
              <figcaption>Las torres sobre la Playa Brava · Punta del Este</figcaption>
            </figure>
          </div>
        </div>

        <p className="clientes__note">
          Con la confianza de operadores y grupos de hospitalidad en toda la región
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Equipo */
const TEAM = [
  {
    name: "Fausto Rodríguez Delgado",
    url: "https://www.linkedin.com/in/fausto-rodriguez-delgado-6aa257236",
  },
  {
    name: "Elbio Rodríguez",
    url: "https://www.linkedin.com/in/elbio-rodriguez?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    name: "Hiara Virginia Prieto Silva",
    url: "https://www.linkedin.com/in/hiara-virginia-prieto-silva-078214128?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
];

export function Equipo() {
  return (
    <section className="equipo" id="equipo">
      <div className="container">
        <div className="equipo__head">
          <span className="eyebrow-light">Equipo</span>
          <h2 className="equipo__title">Conozca a nuestros profesionales</h2>
        </div>
        <div className="equipo__grid">
          {TEAM.map((p) => (
            <a
              className="team-card"
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="team-card__icon">
                <LinkedInIcon />
              </div>
              <div>
                <div className="team-card__name">{p.name}</div>
                <div className="team-card__role">Casinos Punta del Este</div>
              </div>
              <span className="team-card__pill">Ver perfil</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- CTA */
export function Cta() {
  return (
    <section className="cta" id="contacto">
      <div className="cta__inner">
        <span className="eyebrow-dark">Contacto</span>
        <h2 className="cta__title">
          Construyamos la próxima gran operación de iGaming
        </h2>
        <p className="cta__text">
          Cuéntenos sobre su proyecto. Le respondemos con una propuesta a medida en 48
          horas.
        </p>
        <div className="cta__buttons">
          <a className="btn-primary" href="mailto:contacto@casinospuntadeleste.com">
            Contáctenos
          </a>
          <a className="btn-ghost" href="#servicios">
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Footer */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-row">
              <Image
                src="/assets/logo-casinos.png"
                alt="Casinos Punta del Este"
                width={52}
                height={52}
                className="footer__logo"
              />
              <span className="footer__name">Casinos Punta del Este</span>
            </div>
            <p className="footer__desc">
              Consultoría de estrategia digital para la industria del iGaming.
            </p>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <div className="footer__col-title">Servicios</div>
              <ul>
                <li>Estrategia Online</li>
                <li>Gestión de Casinos</li>
                <li>Marketing &amp; Identidad</li>
              </ul>
            </div>
            <div className="footer__col">
              <div className="footer__col-title">Oficina</div>
              <ul>
                <li>Punta del Este</li>
                <li>Maldonado, Uruguay</li>
                <li>contacto@casinospuntadeleste.com</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Casinos Punta del Este. Todos los derechos reservados.</span>
          <span>Juego responsable · +18</span>
        </div>
      </div>
    </footer>
  );
}
