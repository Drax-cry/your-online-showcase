import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PRICE_ID = "price_1T5NdgFozY5OfncchXgROjUD";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const PricingSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // Get email from user
      const email = prompt("Por favor, insira seu email:");
      if (!email) {
        setLoading(false);
        return;
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
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Comece agora por €5/mês
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Acesso completo à plataforma. Sem taxas escondidas. Cancele quando quiser.
        </p>

        <Button
          size="lg"
          onClick={handleSubscribe}
          disabled={loading}
          className="text-lg px-8 py-6"
        >
          {loading ? "Carregando..." : "Assinar agora"}
        </Button>
      </div>
    </section>
  );
};

export default PricingSection;
