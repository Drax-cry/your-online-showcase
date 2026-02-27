import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader } from "lucide-react";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");
        const email = localStorage.getItem("userEmail");

        if (!email) {
          throw new Error("Email não encontrado");
        }

        // Verify subscription
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
        const response = await fetch(
          `${apiUrl}/api/verify-subscription?email=${encodeURIComponent(email)}`
        );
        const data = await response.json();

        if (data.paid) {
          setVerified(true);
          // Redirect to DropStore after 3 seconds
          setTimeout(() => {
            window.location.href = "https://dropstore-jdjmiuph.manus.space/auth";
          }, 3000);
        } else {
          throw new Error("Pagamento não verificado");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Verificando seu pagamento...
          </h1>
          <p className="text-muted-foreground">Aguarde um momento</p>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Pagamento confirmado!
          </h1>
          <p className="text-muted-foreground mb-6">
            Sua subscrição foi ativada com sucesso. Você será redirecionado para o DropStore em breve.
          </p>
          <Button
            onClick={() => {
              window.location.href = "https://dropstore-jdjmiuph.manus.space/auth";
            }}
            className="w-full"
          >
            Ir para DropStore agora
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Erro ao verificar pagamento
        </h1>
        <p className="text-muted-foreground mb-6">
          Houve um problema ao verificar seu pagamento. Por favor, tente novamente.
        </p>
        <Button onClick={() => navigate("/")} variant="outline" className="w-full">
          Voltar ao início
        </Button>
      </div>
    </div>
  );
};

export default Success;
