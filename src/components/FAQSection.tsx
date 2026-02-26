import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Qual a melhor plataforma para vender cursos online?",
    answer: "A Hotmart se destaca como uma excelente opção, consolidada no mercado e com recursos robustos para impulsionar suas vendas. Seja qual for o tipo de curso ou público, aqui você tem um ecossistema completo.",
  },
  {
    question: "O que é a Hotmart e como funciona?",
    answer: "A Hotmart é uma plataforma global completa, líder na América Latina para a venda online de produtos digitais e físicos. Com um catálogo de mais de 500 mil produtos e vendas em mais de 188 países.",
  },
  {
    question: "É possível ganhar dinheiro na Hotmart?",
    answer: "É totalmente possível! A plataforma é um ótimo jeito de vender produtos digitais e físicos. Seus lucros ficam protegidos em uma conta de pagamento segura.",
  },
  {
    question: "Hotmart: quanto custa? É gratuita?",
    answer: "Você pode criar sua conta e registrar produtos digitais gratuitamente. As taxas são aplicadas apenas sobre vendas aprovadas, descontadas no momento da transação.",
  },
  {
    question: "Como criar um produto digital do zero?",
    answer: "Comece identificando uma necessidade de mercado e validando sua ideia. Nosso onboarding com Inteligência Artificial sugere formato, módulos, assuntos e precificação.",
  },
  {
    question: "Quanto a Hotmart cobra por venda?",
    answer: "A taxa é transparente e progressiva. Quanto mais você fatura, menos você paga! Até 5 dígitos de faturamento, a taxa é de 9,9% + R$1 por venda aprovada.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-card" id="ajuda">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
          Dúvidas? Nós temos as respostas.
        </h2>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-secondary rounded-xl border-none px-6"
            >
              <AccordionTrigger className="text-left font-bold text-foreground hover:no-underline py-5">
                <span className="flex items-center gap-3">
                  <span className="text-primary font-extrabold text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
