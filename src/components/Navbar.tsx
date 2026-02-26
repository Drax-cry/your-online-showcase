import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-card/70 backdrop-blur-md rounded-2xl shadow-lg w-auto">
      <div className="px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">🔥</span>
            </div>
            <span className="text-xl font-bold text-foreground">katail</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#produto" className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1">
              Produto <ChevronDown className="w-3 h-3" />
            </a>
            <a href="#solucoes" className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1">
              Soluções <ChevronDown className="w-3 h-3" />
            </a>
            <a href="#taxa" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Taxa
            </a>
            <a href="#cursos" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Comprar um curso
            </a>
            <a href="#ajuda" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Ajuda
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" className="font-semibold">
              Entrar <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            <Button size="sm" className="font-semibold">
              Comece gratuitamente
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-card border-t border-border p-4 space-y-3">
          <a href="#produto" className="block text-sm font-semibold text-foreground py-2">Produto</a>
          <a href="#solucoes" className="block text-sm font-semibold text-foreground py-2">Soluções</a>
          <a href="#taxa" className="block text-sm font-semibold text-foreground py-2">Taxa</a>
          <a href="#cursos" className="block text-sm font-semibold text-foreground py-2">Comprar um curso</a>
          <a href="#ajuda" className="block text-sm font-semibold text-foreground py-2">Ajuda</a>
          <div className="pt-3 space-y-2">
            <Button variant="outline" className="w-full font-semibold">Entrar</Button>
            <Button className="w-full font-semibold">Comece gratuitamente</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
