import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const PRICE_ID = "price_1T5NdgFozY5OfncchXgROjUD";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const features = [
  "Acesso completo à plataforma",
  "Área de membros personalizada",
  "Suporte por IA 24h",
  "Gamificação e recompensas",
  "Checkout de alta conversão",
  "Relatórios e analytics",
];

const PricingSection = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // Get email from localStorage or prompt user
      let email = localStorage.getItem("userEmail");
      
      if (!email) {
        email = prompt("Por favor, insira seu email para continuar:");
        if (!email) {
          setLoading(false);
          return;
        }
        localStorage.setItem("userEmail", email);
      }

      // Create checkout session
      const response = await fetch(`${API_URL}/api/create-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          priceId: PRICE_ID,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar sessão de checkout");
      }

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout não recebida");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error(err.message || "Erro ao iniciar checkout. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-section-warm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Plano simples, sem surpresas
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground max-w-3xl mx-auto">
            Tudo que você precisa por{" "}
            <span className="text-gradient-primary">€5/mês</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Sem taxas escondidas. Cancele quando quiser.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-card rounded-2xl p-8 shadow-sm hover:shadow-card-hover transition-all duration-300 border-2 border-primary/40">
          <div className="text-center mb-6">
            <p className="text-5xl font-extrabold text-foreground">
              €5
              <span className="text-lg font-medium text-muted-foreground">/mês</span>
            </p>
          </div>

          <ul className="space-y-3 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            className="w-full font-bold text-base"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Assinar agora"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
