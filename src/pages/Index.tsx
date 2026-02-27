import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div>
        <Navbar />
        <HeroSection />
        <PricingSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
