import { ShoppingCart, Globe, Sparkles, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ShoppingCart,
    title: "+7% em vendas com preenchimento automático",
    description: "Seu cliente compra rápido com o nosso checkout que preenche tudo automaticamente. E você aumenta suas vendas sem esforço.",
  },
  {
    icon: BarChart3,
    title: "A gente recomenda, você fatura",
    description: "Recomendações automáticas: seu cliente compra um produto e já indicamos o próximo. Ticket médio até 48% maior, no piloto automático.",
  },
  {
    icon: Sparkles,
    title: 'Checkout "antidesistência"',
    description: "Venda muito mais e o tempo todo. Nosso checkout suporta milhões de transações simultâneas e carrega em 1 segundo.",
  },
  {
    icon: Globe,
    title: "Seu produto fala várias línguas",
    description: "Venda para o mundo todo com traduções e conversões automáticas para 22 moedas. Mais de 40 meios de pagamento locais.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-card" id="produto">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-4">
          <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
            Você foca no conteúdo.
          </h3>
          <h3 className="text-2xl md:text-3xl font-extrabold text-gradient-primary">
            E a Katail aumenta suas conversões.
          </h3>
        </div>

        <div className="text-center mb-12">
          <Button size="lg" className="font-bold text-base mt-4">
            Vender mais agora
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-secondary rounded-2xl p-8 hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">{feature.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
