import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Middleware
app.use(cors());
app.use(express.json());

// In-memory store for subscriptions (em produção, usar BD)
const subscriptions = new Map();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create checkout session
app.post('/api/create-checkout', async (req, res) => {
  try {
    const { email, priceId } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Use default price ID if not provided (€5/mês)
    const finalPriceId = priceId || process.env.STRIPE_PRICE_ID || 'price_1T5NdgFozY5OfncchXgROjUD';

    // Find or create customer
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price: finalPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/`,
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify subscription
app.get('/api/verify-subscription', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email is required', paid: false });
    }

    // Check in-memory store first (para testes rápidos)
    if (subscriptions.has(email)) {
      const sub = subscriptions.get(email);
      const isActive = new Date(sub.expiresAt) > new Date();
      return res.json({ paid: isActive, expiresAt: sub.expiresAt });
    }

    // Check Stripe for active subscriptions
    const customers = await stripe.customers.list({ email, limit: 1 });
    if (customers.data.length === 0) {
      return res.json({ paid: false });
    }

    const customerId = customers.data[0].id;
    const subscriptions_list = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    if (subscriptions_list.data.length > 0) {
      const subscription = subscriptions_list.data[0];
      const expiresAt = new Date(subscription.current_period_end * 1000).toISOString();
      return res.json({ paid: true, expiresAt });
    }

    res.json({ paid: false });
  } catch (error) {
    console.error('Verify subscription error:', error);
    res.status(500).json({ error: error.message, paid: false });
  }
});

// Webhook para atualizar subscriptions quando Stripe notifica
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(400).json({ error: 'Webhook secret not configured' });
  }

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created') {
      const subscription = event.data.object;
      const customer = await stripe.customers.retrieve(subscription.customer);

      if (customer.email) {
        subscriptions.set(customer.email, {
          subscriptionId: subscription.id,
          expiresAt: new Date(subscription.current_period_end * 1000).toISOString(),
          status: subscription.status,
        });
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      const customer = await stripe.customers.retrieve(subscription.customer);

      if (customer.email) {
        subscriptions.delete(customer.email);
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Manual subscription activation (para testes)
app.post('/api/test-subscription', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 dias

  subscriptions.set(email, {
    subscriptionId: 'test_' + Date.now(),
    expiresAt: expiresAt.toISOString(),
    status: 'active',
  });

  res.json({ paid: true, expiresAt: expiresAt.toISOString(), message: 'Test subscription activated' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
