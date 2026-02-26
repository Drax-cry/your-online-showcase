const TopBanner = () => {
  return (
    <div className="bg-dark-surface overflow-hidden fixed top-0 left-0 right-0 z-[60] h-10 flex items-center">
      <div className="animate-ticker flex whitespace-nowrap">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-8 text-dark-surface-foreground text-sm">
            <span className="font-bold">FAZ + DE R$10 MIL/MÊS?</span>
            <span className="text-dark-surface-foreground/70">
              Descubra como faturar R$ 1 milhão por ano.
            </span>
            <a href="#" className="font-bold text-primary hover:underline">
              FALAR COM ESPECIALISTA
            </a>
            <span className="text-dark-surface-foreground/30">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopBanner;
