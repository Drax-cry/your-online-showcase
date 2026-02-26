const Footer = () => {
  return (
    <footer className="bg-dark-surface py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">🔥</span>
              </div>
              <span className="text-xl font-bold text-dark-surface-foreground">katail</span>
            </div>
            <p className="text-dark-surface-foreground/60 text-sm">
              A maior plataforma de produtos digitais do mundo.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-dark-surface-foreground mb-4">Produto</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Checkout</a></li>
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Área de Membros</a></li>
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Afiliados</a></li>
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Inteligência Artificial</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark-surface-foreground mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Sobre nós</a></li>
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Carreiras</a></li>
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Imprensa</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark-surface-foreground mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-dark-surface-foreground/60 text-sm hover:text-primary transition-colors">Taxas</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-surface-foreground/10 mt-12 pt-8 text-center">
          <p className="text-dark-surface-foreground/40 text-sm">
            © 2025 Katail. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
