import Hero from "@/components/Hero";
import HighlightsGrid from "@/components/HighlightsGrid";
import Marquee from "@/components/Marquee";
import WorkShowcase from "@/components/WorkShowcase";
import TeamSection from "@/components/TeamSection";
import StudioSection from "@/components/StudioSection";
import Process from "@/components/Process";
import ContactSection from "@/components/ContactSection";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <HighlightsGrid />
      <Marquee />
      <WorkShowcase />
      <TeamSection />
      <StudioSection />
      <Process />
      <ContactSection />
    </>
  );
}
