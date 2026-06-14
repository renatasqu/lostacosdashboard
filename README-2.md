# 🌮 LOS TACOS — Sistema de Gestão
### Make Coentro Great Again

---

## O que é esse projeto

Dashboard completo de um restaurante mexicano fictício chamado **Los Tacos**, localizado no Mercado Novo, Belo Horizonte. Criado como projeto de portfólio para demonstrar integração de dados, lógica Python e design de produto.

O sistema é dividido em duas frentes:
- **Totem do Cliente** — fluxo de pedido do início ao pagamento
- **Dashboard da Gerência** — visão completa de pedidos, clientes, financeiro e marketing

---

## Estrutura de arquivos

```
projeto_lostacos/
│
├── lostacos_cliente.py       ← Script 1: lógica do totem do cliente
├── lostacos_gerencia.py      ← Script 2: lógica do dashboard da gerência
│
├── cardapio-los-tacos.csv    ← 22 itens do cardápio com preço e categoria
├── pedidos_mock.csv          ← 315 pedidos simulados (1 a 13 de junho 2026)
├── clientes_mock.csv         ← 30 clientes com CPF, fidelidade e histórico
├── financeiro_mock.csv       ← 13 dias de receita, descontos e taxas
│
├── logo_lostacos.png         ← ⚠️ COLOQUE SUA LOGO AQUI
├── nacho_avatar.png          ← ⚠️ COLOQUE A FOTO DO NACHO AQUI (opcional)
├── qr_instagram.png          ← ⚠️ COLOQUE O QR DO INSTAGRAM AQUI (opcional)
├── qr_whatsapp.png           ← ⚠️ COLOQUE O QR DO WHATSAPP AQUI (opcional)
│
├── README.md                 ← este arquivo
└── PROMPTS.md                ← prompts prontos para o Lovable
```

---

## Como rodar os scripts

### Pré-requisitos
- Python 3.11 ou superior
- Todos os CSVs na mesma pasta que os scripts

### Instalação
```bash
# Nenhuma biblioteca externa necessária
# Usa apenas csv e datetime do Python padrão
```

### Rodar o Script 1 — Cliente
```bash
python3 lostacos_cliente.py
```
Simula o fluxo completo do cliente: tela inicial → CPF → cardápio → pedido → pagamento → confirmação.

### Rodar o Script 2 — Gerência
```bash
python3 lostacos_gerencia.py
```
Simula todas as abas do dashboard: login → visão geral → cozinha → clientes → cardápio/CMV → financeiro → comunicação.

---

## O que cada script faz

### lostacos_cliente.py

| Função | O que faz |
|---|---|
| `tela_inicial()` | Dados da tela de boas-vindas |
| `carregar_clientes()` | Lê clientes_mock.csv e indexa por CPF |
| `buscar_cliente_por_cpf()` | Identifica o cliente pelo CPF digitado |
| `tela_cpf()` | Saudação personalizada ou cadastro |
| `carregar_cardapio()` | Lê cardapio-los-tacos.csv por categoria |
| `tela_cardapio()` | Monta abas e cards do cardápio |
| `calcular_pedido()` | Aplica cupons e calcula total |
| `tela_pagamento()` | PIX, débito, crédito + upsell de cerveja |
| `tela_confirmacao()` | Número do pedido, tempo e redes sociais |
| `simular_fluxo_completo()` | Roda tudo em sequência para testar |

### lostacos_gerencia.py

| Função | O que faz |
|---|---|
| `tela_login()` | Dados da tela de login |
| `verificar_login()` | Valida email e senha |
| `aba_visao_geral()` | KPIs, gráficos de receita, canal e turno |
| `aba_cozinha()` | Pedidos em 3 colunas: novos / andamento / prontos |
| `aba_clientes()` | Tabela de clientes, fidelidade e tacos grátis |
| `aba_cardapio_cmv()` | Cardápio com CMV calculado e alertas |
| `aba_financeiro()` | Receita, descontos, taxas, comparativo semanal |
| `aba_comunicacao()` | Newsletter, posts, cupons, programa Libre |
| `simular_dashboard_completo()` | Roda tudo em sequência para testar |

---

## Credenciais de acesso (mockadas)

```
Email: nacho@nacholibre.com.br
Senha: lostacos2026
```

---

## Cupons disponíveis para teste

| Cupom | Desconto | Validade |
|---|---|---|
| NACHO15 | 15% off no primeiro pedido | junho/2026 |
| LIBRE10 | 10% off para clientes Libres | junho/2026 |
| COMBO29 | 2 Tacos + Bebida por R$29 | junho/2026 |

---

## Cores da marca

```
Verde escuro:  #1b4332   (fundo principal)
Verde médio:   #2d6a4f   (secundário)
Amarelo ouro:  #f7c948   (destaque, botões)
Laranja:       #e07b39   (badges, alertas)
Creme:         #f5f0e8   (texto claro, cards)
Preto:         #111111   (fundo alternativo)
```

---

## Tipografia

```
Títulos:   Bebas Neue
Labels:    Barlow Condensed
Corpo:     Barlow
```
Todas disponíveis gratuitamente no Google Fonts.

---

## Dados simulados — resumo

| Arquivo | Conteúdo |
|---|---|
| cardapio-los-tacos.csv | 22 itens em 6 categorias |
| pedidos_mock.csv | 315 pedidos — 1 a 13 de junho 2026 |
| clientes_mock.csv | 30 clientes com níveis Novo / Libre / Libre Gold |
| financeiro_mock.csv | 13 dias — sexta e sábado como dias de pico |

**Receita total simulada: R$ 16.112,70**
**Ticket médio: R$ 63,69**
**Melhor dia: Sábado (R$ 2.210,50)**

---

## Como usar com o Lovable

1. Crie um novo projeto no [lovable.dev](https://lovable.dev)
2. Faça upload dos 4 CSVs
3. Faça upload dos 2 scripts Python
4. Abra o arquivo `PROMPTS.md` e cole os prompts em ordem
5. Ajuste o design no Lovable livremente — os scripts não interferem no visual

---

## Tecnologias

- **Python 3.11+** — lógica e processamento de dados
- **CSV** — dados mockados sem banco de dados real
- **Lovable / v0 / Bolt** — geração do frontend
- **React + Tailwind** — frontend gerado
- **Recharts / Chart.js** — gráficos do dashboard

---

*Los Tacos — Mercado Novo, Belo Horizonte*
*Make Coentro Great Again · @lostacosdonacho*
