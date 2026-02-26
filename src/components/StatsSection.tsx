const stats = [
  { value: "+ 50 Bilhões", label: "De reais em vendas" },
  { value: "+ 25 Milhões", label: "De compradores" },
  { value: "+ 200 Mil", label: "Produtores vendendo aqui" },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-16">
          Entre agora para a maior plataforma de{" "}
          <span className="text-gradient-primary">produtos digitais</span> do mundo.
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center animate-count-up"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <p className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
