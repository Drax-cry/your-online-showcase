import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AISection from "@/components/AISection";
import FeaturesSection from "@/components/FeaturesSection";
import MemberAreaSection from "@/components/MemberAreaSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <div className="pt-10">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <AISection />
        <FeaturesSection />
        <MemberAreaSection />
        <CTASection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
