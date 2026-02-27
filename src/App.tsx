import { useState } from 'react';
import './App.css';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_51T5NSNFozY5Ofncc6Ploo834PmXBFVWOPh19Jv1497VLvC9220y2lG3uzBUZ6TjUIe5ofAFo0HbS3v7aRFOKM9Oo00fmxVLcOs';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
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

    // Store the signup data
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

  return (
    <div className="app">
      <div className="card">
        {step === 'signup' ? (
          <div className="form-container">
            <h1>Crie sua conta</h1>
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

            <p className="terms">
              Ao criar uma conta, você concorda com nossos Termos de Serviço
            </p>
          </div>
        ) : (
          <div className="payment-container">
            <h1>Confirme seu pagamento</h1>
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
  );
}

export default App;
