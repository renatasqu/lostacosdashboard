# 🌮 LOS TACOS — Prompts para o Lovable
### Cole os prompts abaixo em ordem no chat do Lovable

---

## Antes de começar

Faça upload destes arquivos no Lovable antes de colar qualquer prompt:

- `lostacos_cliente.py`
- `lostacos_gerencia.py`
- `cardapio-los-tacos.csv`
- `pedidos_mock.csv`
- `clientes_mock.csv`
- `financeiro_mock.csv`
- `logo_lostacos.png` (sua logo)

---

## PROMPT 1 — Estrutura base e identidade visual

> Cole este primeiro. Ele cria a navegação e a identidade da marca.

```
Crie a estrutura base de um dashboard chamado Los Tacos.

IDENTIDADE DA MARCA:
- Nome: Los Tacos
- Personagem: Nacho Libre, aposentado que virou empreendedor
- Slogan: Make Coentro Great Again
- Local: Mercado Novo, Belo Horizonte

CORES (use exatamente essas):
- Verde escuro: #1b4332 (fundo principal)
- Verde médio: #2d6a4f (secundário)
- Amarelo ouro: #f7c948 (botões e destaques)
- Laranja: #e07b39 (badges e alertas)
- Creme: #f5f0e8 (texto sobre fundo escuro)
- Preto: #111111 (fundo alternativo)

TIPOGRAFIA (Google Fonts):
- Títulos: Bebas Neue
- Labels: Barlow Condensed
- Corpo: Barlow

NAVEGAÇÃO LATERAL com 2 seções:
1. CLIENTE (ícone de taco)
   - Totem
2. GERÊNCIA (ícone de gráfico)
   - Visão Geral
   - Cozinha
   - Clientes
   - Cardápio e CMV
   - Financeiro
   - Comunicação

ESTÉTICA: street food mexicano, carimbo artesanal, dark mode, irreverente.
Use Tailwind CSS. Fundo da sidebar: #1b4332. Texto ativo: #f7c948.
```

---

## PROMPT 2 — Totem do Cliente (6 etapas)

> Cole após o Prompt 1 estar pronto.

```
Agora crie a tela do Totem do Cliente com 6 etapas em sequência.
Use os dados do arquivo lostacos_cliente.py como referência de lógica.

ETAPA 1 — Tela Inicial:
- Fundo: #1b4332
- Logo Los Tacos em destaque (usar arquivo logo_lostacos.png)
- Ticker animado no topo com: TACOS · QUESADILLAS · BURRITOS · NACHOS · BEBIDAS
- Botão grande pulsando em #f7c948: TOQUE PARA COMEÇAR
- Texto pequeno: Mercado Novo · Belo Horizonte

ETAPA 2 — Identificação:
- Pergunta: "Quer se identificar?"
- Dois botões: INSERIR CPF / CONTINUAR SEM CADASTRO
- Campo CPF com máscara (000.000.000-00)
- Se CPF encontrado no clientes_mock.csv: mostrar nome, nível de fidelidade
  com badge colorido (Novo=laranja, Libre=verde, Libre Gold=amarelo)
  e mensagem de tacos grátis se disponível
- Benefício: "Acumule visitas e ganhe tacos grátis!"

ETAPA 3 — Cardápio:
- Carregar dados do cardapio-los-tacos.csv
- Abas por categoria: Tacos / Quesadillas / Burritos / Nachos / Bebidas
- Cards com nome, descrição e preço em #f7c948
- Botão + para adicionar (contador de itens no canto superior direito)
- Barra inferior fixa com total e botão VER PEDIDO em #f7c948

ETAPA 4 — Resumo do Pedido:
- Lista dos itens com quantidade e preço
- Campo para cupom (NACHO15=15% off, LIBRE10=10% off, COMBO29=R$29 fixo)
- Desconto aparece em verde quando cupom válido, erro em vermelho se inválido
- Seleção: 🪑 Comer aqui / 🛍️ Para viagem
- Subtotal, desconto e total em destaque

ETAPA 5 — Pagamento:
- 3 opções com ícones: PIX (recomendado) / Débito / Crédito
- Se PIX: QR code simulado + "AGUARDANDO PAGAMENTO..."
- Banner de upsell: "Adicione uma Cerveja Artesanal por +R$ 18? 🍺" com botões SIM / NÃO
- Se cartão: instrução "INSIRA OU APROXIME"

ETAPA 6 — Confirmação:
- Emoji 🌮 grande centralizado
- "PEDIDO CONFIRMADO!" em Bebas Neue, cor #f7c948
- Número do pedido gerado (P + 4 dígitos)
- Tempo estimado entre 8 e 15 minutos
- Resumo dos itens pedidos
- QR codes de redes sociais: @lostacosdonacho
- Slogan: Make Coentro Great Again

Todas as telas com fundo #1b4332 ou #111111. Botões principais em #f7c948.
```

---

## PROMPT 3 — Login da Gerência

> Cole para criar a tela de login.

```
Crie a tela de login da gerência do Los Tacos.

LAYOUT:
- Fundo: #1b4332
- Logo Los Tacos centralizada
- Título: ÁREA DA GERÊNCIA em Bebas Neue cor #f7c948
- Subtítulo: Mercado Novo · Belo Horizonte em #f5f0e8
- Campo email com placeholder: seu@email.com
- Campo senha com mostrar/ocultar
- Botão ENTRAR em #f7c948 com texto #1b4332
- Rodapé: Make Coentro Great Again

CREDENCIAIS DE TESTE (mostrar discretamente abaixo do botão):
- Email: nacho@nacholibre.com.br
- Senha: lostacos2026

Após login bem-sucedido, mostrar o dashboard com saudação:
"Olá, Nacho! Fundador & Chef"
com resumo do dia em cards pequenos no topo.
```

---

## PROMPT 4 — Aba Visão Geral

> Cole para criar o dashboard principal.

```
Crie a aba Visão Geral do dashboard usando os dados do financeiro_mock.csv e pedidos_mock.csv.

CARDS DE KPI (linha no topo, 4 cards):
- Receita Total: R$ 16.112,70 (ícone de cifrão, cor #f7c948)
- Total de Pedidos: 253 (ícone de lista)
- Ticket Médio: R$ 63,69 (ícone de tag)
- Melhor Dia: Sábado / R$ 2.210,50 (ícone de troféu, cor #f7c948)

GRÁFICO 1 — Linha dupla (receita por dia, 13 dias de junho):
- Linha 1: Receita Bruta em #f7c948
- Linha 2: Receita Líquida em #2d6a4f
- Usar dados reais do financeiro_mock.csv
- Destacar visualmente sexta e sábado como picos

GRÁFICO 2 — Pizza (pedidos por canal):
- totem: #f7c948
- balcão: #e07b39
- ifood: #2d6a4f
- rappi: #ff6b00
- Mostrar percentual de cada canal

GRÁFICO 3 — Barras (vendas por turno):
- Almoço / Tarde / Jantar
- Cores: verde / laranja / amarelo
- Mostrar quantidade de pedidos e receita

DESTAQUES (cards menores):
- Top 3 dias de maior receita
- Item mais vendido: Taco Camarão (46 vendas)
- Variação semana 1 → semana 2

Use recharts. Fundo dos cards: #1b4332. Bordas sutis em #2d6a4f.
```

---

## PROMPT 5 — Aba Cozinha

> Cole para criar o painel da cozinha.

```
Crie a aba Cozinha usando pedidos_mock.csv.

LAYOUT: 3 colunas kanban lado a lado

COLUNA 1 — NOVOS (badge vermelho):
- Fundo do header: vermelho suave
- Pedidos recém chegados

COLUNA 2 — EM ANDAMENTO (badge amarelo #f7c948):
- Fundo do header: amarelo suave
- Pedidos sendo preparados

COLUNA 3 — PRONTOS (badge verde):
- Fundo do header: verde suave
- Pedidos finalizados

CADA CARD DE PEDIDO mostra:
- Número do pedido (ex: P0042) em destaque
- Horário do pedido
- Lista de itens
- Badge do canal colorido:
  totem=#f7c948 / balcão=#e07b39 / ifood=#2d6a4f / rappi=#ff6b00
- Local: 🪑 Local ou 🛍️ Viagem
- Tempo decorrido
- Botão → para mover para próxima coluna

KPIs NO TOPO (4 cards pequenos):
- Pedidos hoje: 37
- Em andamento: 5
- Receita do dia: R$ 2.210,50
- Tempo médio: 10 min

FILTROS:
- Por turno: Almoço / Tarde / Jantar (botões toggle)
- Por canal: Todos / Totem / Balcão / Delivery (botões toggle)
- Por data (default: hoje — 13/06/2026)

Use dados reais do pedidos_mock.csv filtrando pela data mais recente.
```

---

## PROMPT 6 — Aba Clientes

> Cole para criar a aba de clientes.

```
Crie a aba Clientes usando clientes_mock.csv.

CARDS DE RESUMO (linha no topo):
- Total de clientes: 30
- Novos: badge laranja
- Libre: badge verde
- Libre Gold: badge amarelo #f7c948
- Com taco grátis disponível: destaque especial

TABELA DE CLIENTES (todos os 30):
Colunas: Nome / Nível (badge colorido) / Visitas / Gasto Total / Último Pedido / Item Favorito / Tacos Grátis

- Clientes com tacos_gratis_disponiveis > 0: destacar linha em #f7c948 com emoji 🎁
- Nível Libre Gold: ícone 🏆
- Nível Libre: ícone ⭐
- Nível Novo: ícone 🌮

FILTROS:
- Por nível: Todos / Novo / Libre / Libre Gold (tabs)
- Busca por nome

TOP 5 CLIENTES:
- Card lateral com os 5 maiores gastadores
- Nome, gasto total e nível

SEÇÃO TACO GRÁTIS:
- Lista dos clientes com taco disponível
- Nome, quantidade de tacos e botão "Notificar via WhatsApp" (simulado)

Use dados reais do clientes_mock.csv.
```

---

## PROMPT 7 — Aba Cardápio e CMV

> Cole para criar a aba de gestão do cardápio.

```
Crie a aba Cardápio e CMV usando cardapio-los-tacos.csv e pedidos_mock.csv.

CARDS DE KPI:
- Total de itens: 21
- CMV médio geral: 28,3%
- Item mais vendido: Taco Camarão
- Itens com CMV alto: destacar em vermelho

TABELA DE ITENS (todos os 21 itens):
Colunas: Nome / Categoria / Preço de Venda / Custo de Produção / CMV% / Margem / Vendas no Período

- CMV% calculado automaticamente (custo / preço * 100)
- CMV acima de 40%: fundo da célula vermelho, ícone de alerta ⚠️
- CMV abaixo de 35%: fundo verde suave
- Custo de produção: campo editável (mockado como % do preço)
- Ordenar por CMV decrescente por padrão

GRÁFICO DE BARRAS (preço médio por categoria):
- Tacos / Quesadillas / Burritos / Nachos / Extras / Bebidas
- Cor: #f7c948

GRÁFICO DE BARRAS (vendas por item — top 10):
- Itens mais vendidos no período
- Cor: #2d6a4f

DESTAQUE:
- Item mais rentável: badge verde
- Item que precisa atenção no CMV: badge vermelho

Use os dados reais dos CSVs.
```

---

## PROMPT 8 — Aba Financeiro

> Cole para criar a aba financeira.

```
Crie a aba Financeiro usando financeiro_mock.csv e pedidos_mock.csv.

CARDS DE KPI (linha no topo):
- Receita Bruta: R$ 16.112,70 (cor #f7c948)
- Receita Líquida: R$ 15.363,42 (cor verde)
- Descontos Cupons: R$ 2.349,00 (cor laranja)
- Taxas Delivery: R$ 749,28 (cor vermelha)
- Projeção do Mês: R$ 37.183,00 (destaque especial)

GRÁFICO 1 — Barras agrupadas (receita por dia):
- Barra 1: Receita Bruta (#f7c948)
- Barra 2: Receita Líquida (#2d6a4f)
- Eixo X: dias de junho (1 a 13)
- Tooltip mostrando todos os valores ao passar o mouse

GRÁFICO 2 — Pizza (receita por canal):
- Mostrar % de cada canal no total
- Cores: totem=#f7c948 / balcão=#e07b39 / ifood=#2d6a4f / rappi=#ff6b00

GRÁFICO 3 — Barras (uso de cupons):
- NACHO15: 25 usos / R$ 266,70
- LIBRE10: 33 usos / R$ 220,60
- COMBO29: 36 usos / R$ 1.344,00
- Total economizado pelos clientes: R$ 1.831,30

COMPARATIVO SEMANAL (2 cards lado a lado):
- Semana 1 (1-7 jun) vs Semana 2 (8-13 jun)
- Variação percentual com seta ↑ verde ou ↓ vermelho

Use recharts. Dados reais dos CSVs.
```

---

## PROMPT 9 — Aba Comunicação

> Cole para criar a aba de marketing.

```
Crie a aba Comunicação com 4 seções.

SEÇÃO 1 — NEWSLETTER:
- Preview visual da newsletter de inauguração (fundo #1b4332, título em #f7c948)
- Métricas em cards: 847 enviados / 312 abertos (36,8%) / 89 cliques (28,5%)
- Cupom destaque: NACHO15
- Botão: + CRIAR NOVA NEWSLETTER (abre modal com campo de tema)

SEÇÃO 2 — MÍDIA SOCIAL:
- Grade 3x2 de posts simulados
- Cada card com: imagem placeholder nas cores da marca + legenda + métricas
  Post 1: 847 curtidas / 43 comentários / 3.200 alcance (fundo #1b4332)
  Post 2: 1.203 curtidas / 87 comentários / 5.800 alcance (fundo #f7c948 — Reels)
  Post 3: 412 curtidas / 19 comentários / 1.900 alcance (fundo #e07b39)
  Post 4: 934 curtidas / 56 comentários / 4.100 alcance (fundo #2d6a4f)
  Post 5: 678 curtidas / 31 comentários / 2.700 alcance (fundo #111111)
  Post 6: 1.567 curtidas / 134 comentários / 7.300 alcance (fundo #1b4332 — viral)
- Botão: + GERAR NOVO POST

SEÇÃO 3 — PROGRAMA LIBRE (fidelidade):
- Cards de resumo: 3 Novos / 11 Libres / 16 Libre Gold
- Lista de clientes com taco grátis disponível (24 clientes)
- Cada linha: nome + nível + quantidade de tacos + botão "📱 WhatsApp" (simulado)

SEÇÃO 4 — CUPONS ATIVOS:
- 3 cards de cupom:
  NACHO15: amarelo, 25 usos, R$ 266,70 em descontos
  LIBRE10: verde, 33 usos, R$ 220,60 em descontos
  COMBO29: laranja, 36 usos, R$ 1.344,00 em descontos
- Total economizado pelos clientes: R$ 1.831,30 (destaque)
- Status: ATIVO com badge verde

Use dados reais dos CSVs. Manter estética da marca em toda a aba.
```

---

## PROMPT 10 — Ajustes finais de design

> Cole no final para refinar o visual geral.

```
Revise o design geral do dashboard Los Tacos e aplique os seguintes ajustes:

1. Certifique que todas as telas usam as cores corretas da marca:
   - Fundo principal: #1b4332
   - Fundo secundário/cards: #111111 ou #0a2318
   - Destaques e botões principais: #f7c948
   - Texto sobre fundo escuro: #f5f0e8

2. Todos os títulos de seção em Bebas Neue maiúsculo

3. Cards de KPI com:
   - Fundo levemente mais claro que o fundo principal
   - Valor em destaque (#f7c948 ou branco)
   - Label pequeno em #f5f0e8 com opacidade 70%
   - Borda sutil em #2d6a4f

4. Tabelas com:
   - Cabeçalho em #2d6a4f
   - Linhas alternadas entre #1b4332 e #0a2318
   - Hover em #2d6a4f

5. Badges de nível de fidelidade:
   - Novo: #e07b39
   - Libre: #2d6a4f
   - Libre Gold: #f7c948 com texto #1b4332

6. Sidebar com logo Los Tacos no topo,
   item ativo com fundo #f7c948 e texto #1b4332,
   itens inativos com texto #f5f0e8 e hover em #2d6a4f

7. Adicionar o slogan "Make Coentro Great Again" no rodapé
   em tipografia pequena e discreta

Mantenha toda a lógica de dados funcionando.
```

---

## Dicas para quando travar no Lovable

**Se o design sair feio ou genérico:**
> "Refaça esta seção mantendo a lógica de dados mas aplicando as cores #1b4332 e #f7c948 com a fonte Bebas Neue nos títulos"

**Se perder a identidade da marca:**
> "Lembre: este é o Los Tacos — dark mode, verde escuro #1b4332, amarelo #f7c948, estética de street food mexicano irreverente. Ajuste o visual desta tela para isso."

**Se um gráfico quebrar:**
> "Mantenha o layout atual e apenas corrija o gráfico [nome] para usar os dados do [arquivo.csv] com as cores da marca"

**Se quiser adicionar algo novo:**
> "Adicione [componente] nesta tela mantendo a identidade visual do Los Tacos — fundo #1b4332, destaque #f7c948, fonte Bebas Neue nos títulos"

**Se quiser mudar só o design sem mexer nos dados:**
> "Mude apenas o visual desta tela. Não altere nenhuma lógica de dados ou imports."

---

*Los Tacos — Mercado Novo, Belo Horizonte*
*Make Coentro Great Again · @lostacosdonacho*
