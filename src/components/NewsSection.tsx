import Image from "next/image";
import { getNews } from "@/lib/news";

export default async function NewsSection() {
  const news = await getNews();

  return (
    <section className="section-dark" id="blog">
      <div className="container">
        <div className="blog__head">
          <div>
            <span className="eyebrow-dark">Actualidad</span>
            <h2 className="blog__title">Últimas noticias del sector</h2>
          </div>
          <a
            className="blog__viewall"
            href="https://www.yogonet.com/international/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver todo el feed →
          </a>
        </div>

        <div className="blog__grid">
          {news.map((n) => (
            <a
              className="news-card"
              key={n.source}
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
    </section>
  );
}
