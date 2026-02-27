const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Criar sessão de checkout
app.post('/api/create-checkout', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    // Cria a sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price: 'price_1T5NdgFozY5OfncchXgROjUD', // €5/mês
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL || 'https://steelblue-panther-922996.hostingersite.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'https://steelblue-panther-922996.hostingersite.com'}`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verificar subscrição
app.get('/api/verify-subscription', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    // Busca o cliente pelo email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      return res.json({ paid: false });
    }

    const customer = customers.data[0];

    // Busca as subscrições ativas
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1,
    });

    const paid = subscriptions.data.length > 0;
    const subscription = subscriptions.data[0];

    res.json({
      paid,
      customerId: customer.id,
      subscriptionId: subscription?.id,
      currentPeriodEnd: subscription?.current_period_end,
    });
  } catch (error) {
    console.error('Erro ao verificar subscrição:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook do Stripe
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Processa eventos
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Pagamento concluído:', event.data.object);
        break;
      case 'customer.subscription.created':
        console.log('Subscrição criada:', event.data.object);
        break;
      case 'customer.subscription.updated':
        console.log('Subscrição atualizada:', event.data.object);
        break;
      case 'customer.subscription.deleted':
        console.log('Subscrição cancelada:', event.data.object);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
