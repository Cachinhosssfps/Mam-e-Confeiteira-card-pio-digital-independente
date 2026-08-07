# Mamãe Confeiteira — cardápio digital independente

Sistema completo de pedidos para uma confeitaria: cardápio digital para o
cliente, painel administrativo para a loja, tela de venda no balcão e um
agente que imprime as notas automaticamente numa impressora térmica. Sem
mensalidade de plataforma, sem comissão por pedido.

## Estrutura do projeto

```
index.html          Cardápio — o cliente monta o pedido, escolhe delivery
                     ou retirada, paga (Pix ou dinheiro) e acompanha o status
painel.html          Painel administrativo da loja (protegido por senha)
balcao.html          Tela de venda presencial (pedido feito pelo atendente)
bio.html              Link na bio (Instagram/WhatsApp/iFood)
products.js           Catálogo base de produtos
assets/                Fotos dos produtos e identidade visual
functions/api/         Backend — Cloudflare Pages Functions
functions/_shared/      Código compartilhado entre as functions (auth, KV, Asaas)
print-agent/            Agente Node.js que roda no computador da loja e
                         manda as notas pra impressora térmica
```

## Como funciona

O front-end é HTML/CSS/JS puro, sem build — os três arquivos principais
(`index.html`, `painel.html`, `balcao.html`) são servidos como estão. O
backend é feito com **Cloudflare Pages Functions** (`functions/api/*.ts`),
com os dados guardados em **Cloudflare KV**. Tudo roda no mesmo projeto do
Cloudflare Pages, sem servidor separado.

| Endpoint (`functions/api/`) | Responsabilidade |
|---|---|
| `pedidos.ts` | Criar, listar e atualizar pedidos |
| `editar-pedido.ts` | Cliente edita o próprio pedido antes de ser impresso |
| `status-pedido.ts` | Cliente acompanha o status do pedido em tempo real |
| `produtos.ts` | Catálogo (preço, estoque, ativo/inativo) |
| `config.ts` | Configurações da loja (horários, formas de pagamento, Pix) |
| `caixa.ts` | Abertura e fechamento do caixa do balcão |
| `chat.ts` | Chat entre cliente e loja durante o pedido |
| `avaliacoes.ts` / `avaliacoes-publicas.ts` | Avaliação de produtos e entregadores |
| `distancia.ts` / `rota.ts` | Cálculo de distância e rota até o cliente |
| `asaas-webhook.ts` | Confirmação automática de pagamento Pix (Asaas) |

## Funcionalidades

**Cardápio (cliente)**
Pedido por delivery ou retirada, agendamento, Pix com QR code e
confirmação automática, pagamento em dinheiro com troco, chat com a loja,
avaliação do pedido e do entregador depois da entrega.

**Painel (loja)**
Visão geral com faturamento e pedidos do dia, gestão de pedidos ao vivo
(balcão e delivery separados), controle de caixa (abertura/fechamento com
conferência de diferença), cadastro de produtos com controle de estoque,
configurações da loja (horários, aceitar pedido automático, formas de
pagamento, chave Pix), tudo protegido por senha.

**Balcão**
Tela dedicada para o atendente lançar uma venda presencial sem passar
pelo cardápio do cliente.

**Impressão automática**
O agente em `print-agent/` roda no computador da loja, verifica pedidos
novos a cada poucos segundos e imprime a nota na impressora térmica (USB
ou rede) — sem precisar de WhatsApp ou compartilhamento de impressora.
Instruções completas em [`print-agent/README.md`](print-agent/README.md).

## Rodando e publicando

O deploy é feito direto pelo Cloudflare Pages, sem passo de build:

```bash
npx wrangler pages deploy . --project-name=mamae-confeiteira
```

Requer o KV namespace configurado em `wrangler.toml` (binding `DB`) já
criado no Cloudflare. A senha de acesso ao painel e a chave Pix da loja
são configuradas pelo próprio painel (`painel.html` → Configurações), não
ficam no código.

## Projeto privado

Feito sob medida para a Mamãe Confeiteira. Não é um template genérico.
