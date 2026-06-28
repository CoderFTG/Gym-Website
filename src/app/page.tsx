import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTABar } from "@/components/layout/StickyCTABar";
import { Hero } from "@/components/sections/Hero";
import { TornTape } from "@/components/ui/TornTape";
import { About } from "@/components/sections/About";
import { Trainers } from "@/components/sections/Trainers";
import { Gallery } from "@/components/sections/Gallery";
import { Plans } from "@/components/sections/Plans";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

/**
 * FitZone single-page, long-scroll layout. The torn-tape signature appears
 * exactly once, between Hero and About. Section order: Plans now follows the
 * Gallery (Classes section removed).
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="scroll-mt-20">
        <Hero />
        <TornTape />
        <About />
        <Trainers />
        <Gallery />
        <Plans />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyCTABar />
    </>
  );
}
