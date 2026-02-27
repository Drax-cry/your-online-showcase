import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AISection from "@/components/AISection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div>
        <Navbar />
        <HeroSection />
        <StatsSection />
        <AISection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
