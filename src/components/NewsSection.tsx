import { getYogonetNews } from "@/lib/news";
import NewsCarousel from "./NewsCarousel";

export default async function NewsSection() {
  const news = await getYogonetNews();

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
            href="https://www.yogonet.com/latinoamerica/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver todo el feed →
          </a>
        </div>

        <NewsCarousel items={news} />
      </div>
    </section>
  );
}
