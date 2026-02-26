import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">
          Aqui acontece
        </h2>
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6">
          de verdade.
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
          Agora é pra valer! Conte com o melhor ecossistema para o seu negócio acontecer.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="font-bold text-base px-10"
        >
          Comece agora
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
