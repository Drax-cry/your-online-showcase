import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const AISection = () => {
  return (
    <section className="py-20 bg-section-warm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Inteligência artificial
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground max-w-3xl mx-auto leading-tight">
            A primeira (e única no Brasil) integrada com inteligência artificial para negócios digitais.
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Do curso online ao ebook, da comunidade ao produto físico, criar seu produto em 60 segundos é só uma das coisas que podemos fazer juntos.
          </p>
        </div>

        {/* Video placeholder */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video bg-dark-surface rounded-2xl overflow-hidden shadow-warm group cursor-pointer">
            <div className="absolute inset-0 bg-hero-gradient opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-primary-foreground font-semibold text-lg">
                Veja como criar seu produto com IA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
