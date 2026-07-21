import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import ConsultModal from "@/components/ConsultModal";
import { ConsultModalProvider } from "@/components/ConsultModalContext";
import { Metrics, Servicios, Equipo, IndustriaLocal, Cta, Footer } from "@/components/Sections";

// Revalidate the RSS-backed news section every hour (ISR) so Yogonet's
// latest articles get incorporated automatically.
export const revalidate = 3600;

export default function Home() {
  return (
    <ConsultModalProvider>
      <Header />
      <main>
        <Hero />
        <Metrics />
        <Servicios />
        <NewsSection />
        <Equipo />
        <IndustriaLocal />
        <Cta />
      </main>
      <Footer />
      <ConsultModal />
    </ConsultModalProvider>
  );
}
