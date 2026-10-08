import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import Services from "@/components/Services";
import Transformation from "@/components/Transformation";
import ROIExperience from "@/components/ROIExperience";
import ImpactStats from "@/components/ImpactStats";
import Solutions from "@/components/Solutions";
import ImageStory from "@/components/ImageStory";
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
        <BrandStatement />
        <Services />
        <Transformation />
        <ROIExperience />
        <ImpactStats />
        <Solutions />
        <ImageStory />
        <WhyUs />
        <Projects />
        <FinalStatement />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
