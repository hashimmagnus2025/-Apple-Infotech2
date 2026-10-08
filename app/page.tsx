import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import ImageStory from "@/components/ImageStory";
import Process from "@/components/Process";
import ROIExperience from "@/components/ROIExperience";
import ImpactStats from "@/components/ImpactStats";
import Solutions from "@/components/Solutions";
import WhyUs from "@/components/WhyUs";
import Projects from "@/components/Projects";
import FinalStatement from "@/components/FinalStatement";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { JsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main id="main">
        <Hero />
        <Statement />
        <Services />
        <ImageStory />
        <Process />
        <ROIExperience />
        <ImpactStats />
        <Solutions />
        <WhyUs />
        <Projects />
        <FinalStatement />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
