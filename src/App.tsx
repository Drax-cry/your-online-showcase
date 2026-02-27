import { useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [step, setStep] = useState<'signup' | 'payment'>('signup');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Email inválido');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    localStorage.setItem('pendingSignup', JSON.stringify(formData));
    setStep('payment');
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/create-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          priceId: 'price_1T5NdgFozY5OfncchXgROjUD',
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar sessão de checkout');
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de checkout não recebida');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao iniciar pagamento');
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowSignup(false);
    setStep('signup');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
  };

  return (
    <div className="app">
      {/* Landing Page */}
      <div className="landing">
        <nav className="navbar">
          <div className="container">
            <h1>Your Online Showcase</h1>
            <button 
              onClick={() => setShowSignup(true)}
              className="btn btn-primary-outline"
            >
              Começar agora
            </button>
          </div>
        </nav>

        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h2>Crie sua loja online em minutos</h2>
              <p>Plataforma completa para gerenciar sua loja, produtos e vendas. Sem complicações.</p>
              <button 
                onClick={() => setShowSignup(true)}
                className="btn btn-primary"
              >
                Começar agora - €5/mês
              </button>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h3>Por que escolher?</h3>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">✨</div>
                <h4>Fácil de usar</h4>
                <p>Interface intuitiva, sem necessidade de conhecimentos técnicos</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h4>Rápido</h4>
                <p>Deploy em minutos, não em dias</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h4>Acessível</h4>
                <p>Planos simples e transparentes</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing">
          <div className="container">
            <h3>Preços simples</h3>
            <div className="pricing-card">
              <h4>Plano Premium</h4>
              <div className="price">€5<span>/mês</span></div>
              <ul className="features-list">
                <li>✓ Acesso completo à plataforma</li>
                <li>✓ Gerenciamento de lojas</li>
                <li>✓ Até 100 produtos</li>
                <li>✓ Suporte por email</li>
                <li>✓ Relatórios e analytics</li>
              </ul>
              <button 
                onClick={() => setShowSignup(true)}
                className="btn btn-primary"
              >
                Assinar agora
              </button>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2026 Your Online Showcase. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>

      {/* Modal de Signup */}
      {showSignup && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>✕</button>

            {step === 'signup' ? (
              <div className="form-container">
                <h2>Crie sua conta</h2>
                <p className="subtitle">Comece sua jornada agora</p>

                <form onSubmit={handleSignup}>
                  <div className="form-group">
                    <label>Nome completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="João Silva"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Senha</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirmar senha</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••"
                      required
                    />
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <button type="submit" className="btn btn-primary">
                    Continuar para pagamento
                  </button>
                </form>
              </div>
            ) : (
              <div className="payment-container">
                <h2>Confirme seu pagamento</h2>
                <p className="subtitle">€5/mês - Acesso completo</p>

                <div className="summary">
                  <div className="summary-item">
                    <span>Nome:</span>
                    <strong>{formData.name}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Email:</span>
                    <strong>{formData.email}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Plano:</span>
                    <strong>Premium - €5/mês</strong>
                  </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Processando...' : 'Pagar agora com Stripe'}
                </button>

                <button
                  onClick={() => {
                    setStep('signup');
                    setError('');
                  }}
                  className="btn btn-secondary"
                >
                  Voltar
                </button>

                <p className="security">
                  🔒 Pagamento seguro com Stripe
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
