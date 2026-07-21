import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import ConsultModal from "@/components/ConsultModal";
import { ConsultModalProvider } from "@/components/ConsultModalContext";
import { Metrics, Servicios, Equipo, Cta, Footer } from "@/components/Sections";

// Revalidate the RSS-backed news section every 3 hours (ISR).
export const revalidate = 10800;

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
        <Cta />
      </main>
      <Footer />
      <ConsultModal />
    </ConsultModalProvider>
  );
}
