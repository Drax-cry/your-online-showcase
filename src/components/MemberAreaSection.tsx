import { Trophy, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const MemberAreaSection = () => {
  return (
    <section className="py-20 bg-section-warm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-4">
          <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Clientes satisfeitos sempre voltam
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground max-w-3xl mx-auto">
            Encante com nossa área de membros e aumente até{" "}
            <span className="text-gradient-primary">14% de recompra.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
          <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-card-hover transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">
              Gamificação e personalização
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Mais de 20 opções de identidade visual com gamificação, recompensas e progresso para motivar seus clientes.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-card-hover transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">
              Suporte de IA 24h que nunca dorme
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Nosso assistente inteligente oferece suporte em tempo real. Clientes atendidos com 99% de precisão e você reduz 50% de suporte.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button size="lg" className="font-bold text-base">
            Cadastre-se agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MemberAreaSection;
