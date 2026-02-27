# Setup do Your Online Showcase com Stripe

## Instalação

1. **Clonar o repositório:**
```bash
git clone https://github.com/Drax-cry/your-online-showcase.git
cd your-online-showcase
```

2. **Instalar dependências:**
```bash
npm install
# ou
bun install
```

3. **Configurar variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o `.env` e adicione:
- `STRIPE_SECRET_KEY` — sua chave secreta do Stripe (sk_...)
- `VITE_STRIPE_PUBLIC_KEY` — sua chave pública do Stripe (pk_...)
- `STRIPE_PRICE_ID` — ID do produto/preço no Stripe (€5/mês)
- `FRONTEND_URL` — URL do seu site (ex: https://seu-site.hostingersite.com)

## Desenvolvimento Local

```bash
# Inicia o frontend (Vite) e backend (Express) simultaneamente
npm run dev

# Ou separadamente:
npm run dev:client  # Frontend em http://localhost:8080
npm run dev:server  # Backend em http://localhost:3001
```

## Endpoints de Pagamento

### `POST /api/create-checkout`
Cria uma sessão de checkout do Stripe.

**Request:**
```json
{
  "email": "user@example.com",
  "priceId": "price_1T5NdgFozY5OfncchXgROjUD"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/...",
  "sessionId": "cs_..."
}
```

### `GET /api/verify-subscription?email=user@example.com`
Verifica se um email tem subscrição ativa.

**Response:**
```json
{
  "paid": true,
  "expiresAt": "2026-03-25T10:00:00.000Z"
}
```

### `POST /api/webhook`
Recebe notificações do Stripe sobre mudanças de subscrição.

## Fluxo de Pagamento

1. Cliente clica em "Assinar agora"
2. Sistema chama `POST /api/create-checkout` com o email
3. Cliente é redirecionado para o Stripe Checkout
4. Após pagamento bem-sucedido, Stripe redireciona para `/success`
5. Página de sucesso verifica o pagamento com `GET /api/verify-subscription`
6. Cliente é redirecionado para o DropStore

## Integração com DropStore

Após pagamento, o cliente é redirecionado para:
```
https://dropstore-jdjmiuph.manus.space/auth
```

O DropStore verifica se o email tem subscrição ativa chamando:
```
GET https://seu-site.hostingersite.com/api/verify-subscription?email=...
```

## Build para Produção

```bash
npm run build
```

Isto gera:
- `dist/` — Frontend otimizado
- Backend Express continua em `server/index.js`

## Deployment na Hostinger

1. Faça upload dos ficheiros para a Hostinger
2. Configure as variáveis de ambiente no painel da Hostinger
3. Inicie o servidor com `npm run dev:server` ou configure um processo manager (PM2, Forever, etc.)

## Troubleshooting

**Erro: "Stripe key not found"**
- Verifique se `STRIPE_SECRET_KEY` está configurado no `.env`

**Erro: "Email ou senha incorretos"**
- O email deve estar registado no DropStore antes de fazer o pagamento

**Erro: "Pagamento não verificado"**
- Verifique se o endpoint `/api/verify-subscription` está respondendo corretamente
- Verifique os logs do servidor
