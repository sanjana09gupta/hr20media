import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WorkShowcase from "@/components/WorkShowcase";
import StudioSection from "@/components/StudioSection";
import Process from "@/components/Process";
import ContactSection from "@/components/ContactSection";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <Marquee />
      <WorkShowcase />
      <StudioSection />
      <Process />
      <ContactSection />
    </>
  );
}
