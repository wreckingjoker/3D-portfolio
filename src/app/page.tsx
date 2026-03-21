import HeroTriptych from "@/components/HeroTriptych";
import HeroGradient from "@/components/HeroGradient";
import AboutSection from "@/components/AboutSection";
import AutomationSection from "@/components/AutomationSection";
import VideoSection from "@/components/VideoSection";
import ThreeDSection from "@/components/ThreeDSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", position: "relative" }}>
      <HeroTriptych />
      <HeroGradient />
      <AboutSection />
      <AutomationSection />
      <VideoSection />
      <ThreeDSection />
      <ContactSection />
    </main>
  );
}
