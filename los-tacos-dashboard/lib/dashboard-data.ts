export const navSections = [
  { id: "totem", label: "Totem", sub: "Pedido do cliente", icon: "Sandwich" },
  { id: "visao-geral", label: "Visão Geral", sub: "Overview", icon: "LayoutDashboard" },
  { id: "cozinha", label: "Cozinha", sub: "Kitchen", icon: "CookingPot" },
  { id: "clientes", label: "Clientes", sub: "Customers", icon: "Users" },
  { id: "cardapio", label: "Cardápio & CMV", sub: "Menu & costs", icon: "ClipboardList" },
  { id: "financeiro", label: "Financeiro", sub: "Financial", icon: "Wallet" },
  { id: "comunicacao", label: "Comunicação", sub: "Marketing", icon: "Megaphone" },
] as const

export type SectionId = (typeof navSections)[number]["id"]

export const kpis = [
  { label: "Receita Total", value: "R$ 16.112,70", delta: "+12,4%", trend: "up" as const, hint: "vs. quinzena anterior", accent: "gold" as const },
  { label: "Pedidos", value: "253", delta: "+8,1%", trend: "up" as const, hint: "13 dias de junho", accent: "pink" as const },
  { label: "Ticket Médio", value: "R$ 63,69", delta: "+3,9%", trend: "up" as const, hint: "por pedido", accent: "purple" as const },
  { label: "Melhor Dia", value: "Sábado", delta: "R$ 3.241", trend: "up" as const, hint: "08/06 · pico de vendas", accent: "cream" as const },
]

export const revenueByDay = [
  { dia: "01", label: "Dom 01", receita: 982 },
  { dia: "02", label: "Seg 02", receita: 745 },
  { dia: "03", label: "Ter 03", receita: 1120 },
  { dia: "04", label: "Qua 04", receita: 1340 },
  { dia: "05", label: "Qui 05", receita: 1190 },
  { dia: "06", label: "Sex 06", receita: 2010 },
  { dia: "07", label: "Sáb 07", receita: 2980 },
  { dia: "08", label: "Dom 08", receita: 3241 },
  { dia: "09", label: "Seg 09", receita: 870 },
  { dia: "10", label: "Ter 10", receita: 1015 },
  { dia: "11", label: "Qua 11", receita: 1180 },
  { dia: "12", label: "Qui 12", receita: 1260 },
  { dia: "13", label: "Sex 13", receita: 1979.7 },
]

export const ordersByChannel = [
  { canal: "Totem", pedidos: 112, fill: "var(--color-totem)" },
  { canal: "Balcão", pedidos: 68, fill: "var(--color-balcao)" },
  { canal: "iFood", pedidos: 49, fill: "var(--color-ifood)" },
  { canal: "Rappi", pedidos: 24, fill: "var(--color-rappi)" },
]

// ══════════════════════════════════════
// COZINHA
// ══════════════════════════════════════

export type KitchenStatus = "novos" | "andamento" | "prontos"
export type KitchenChannel = "totem" | "balcao" | "ifood" | "rappi"
export type KitchenTurno = "almoco" | "tarde" | "jantar"

export type KitchenOrder = {
  id: string
  numero: string
  hora: string
  turno: KitchenTurno
  canal: KitchenChannel
  tipo: "local" | "viagem"
  status: KitchenStatus
  itens: { qtd: number; nome: string }[]
}

export const channelMeta: Record<KitchenChannel, { label: string; badge: string }> = {
  totem: { label: "Totem", badge: "bg-gold/20 text-gold" },
  balcao: { label: "Balcão", badge: "bg-[#f97316]/20 text-[#fb923c]" },
  ifood: { label: "iFood", badge: "bg-[#22c55e]/20 text-[#4ade80]" },
  rappi: { label: "Rappi", badge: "bg-[#f43f5e]/20 text-[#fb7185]" },
}

export const turnoOptions: { id: KitchenTurno | "todos"; label: string }[] = [
  { id: "todos", label: "Todos os turnos" },
  { id: "almoco", label: "Almoço" },
  { id: "tarde", label: "Tarde" },
  { id: "jantar", label: "Jantar" },
]

export const canalOptions: { id: KitchenChannel | "delivery" | "todos"; label: string }[] = [
  { id: "todos", label: "Todos os canais" },
  { id: "totem", label: "Totem" },
  { id: "balcao", label: "Balcão" },
  { id: "delivery", label: "Delivery" },
]

export const kitchenColumns: {
  id: KitchenStatus
  label: string
  badge: string
  next: KitchenStatus | null
  cta: string
}[] = [
  { id: "novos", label: "Novos", badge: "bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/40", next: "andamento", cta: "Iniciar preparo" },
  { id: "andamento", label: "Em andamento", badge: "bg-gold/20 text-gold border-gold/40", next: "prontos", cta: "Marcar pronto" },
  { id: "prontos", label: "Prontos", badge: "bg-[#22c55e]/20 text-[#4ade80] border-[#22c55e]/40", next: null, cta: "Entregue" },
]

export const kitchenOrders: KitchenOrder[] = [
  { id: "k1", numero: "#1042", hora: "12:04", turno: "almoco", canal: "totem", tipo: "local", status: "novos", itens: [{ qtd: 2, nome: "Taco Carnitas" }, { qtd: 1, nome: "Guacamole" }, { qtd: 1, nome: "Refri Lata" }] },
  { id: "k2", numero: "#1043", hora: "12:07", turno: "almoco", canal: "ifood", tipo: "viagem", status: "novos", itens: [{ qtd: 3, nome: "Taco Birria" }, { qtd: 1, nome: "Nachos Supreme" }] },
  { id: "k3", numero: "#1044", hora: "12:09", turno: "almoco", canal: "balcao", tipo: "local", status: "novos", itens: [{ qtd: 1, nome: "Burrito Frango" }, { qtd: 1, nome: "Coentro Extra" }] },
  { id: "k4", numero: "#1039", hora: "11:58", turno: "almoco", canal: "rappi", tipo: "viagem", status: "andamento", itens: [{ qtd: 2, nome: "Quesadilla" }, { qtd: 2, nome: "Taco Veggie" }] },
  { id: "k5", numero: "#1040", hora: "12:01", turno: "almoco", canal: "totem", tipo: "local", status: "andamento", itens: [{ qtd: 4, nome: "Taco Carnitas" }, { qtd: 1, nome: "Pico de Gallo" }] },
  { id: "k6", numero: "#1035", hora: "11:49", turno: "almoco", canal: "balcao", tipo: "local", status: "prontos", itens: [{ qtd: 1, nome: "Burrito Carne" }, { qtd: 1, nome: "Churros" }] },
  { id: "k7", numero: "#1036", hora: "11:52", turno: "almoco", canal: "ifood", tipo: "viagem", status: "prontos", itens: [{ qtd: 2, nome: "Taco Birria" }, { qtd: 1, nome: "Refri Lata" }] },
  { id: "k8", numero: "#1101", hora: "20:14", turno: "jantar", canal: "totem", tipo: "local", status: "novos", itens: [{ qtd: 3, nome: "Taco Al Pastor" }, { qtd: 1, nome: "Margarita" }] },
  { id: "k9", numero: "#1098", hora: "16:32", turno: "tarde", canal: "rappi", tipo: "viagem", status: "andamento", itens: [{ qtd: 2, nome: "Nachos Supreme" }] },
]

// ══════════════════════════════════════
// CLIENTES
// ══════════════════════════════════════

export type CustomerTier = "vip" | "fiel" | "novo"

export type Customer = {
  id: string
  nome: string
  telefone: string
  whatsapp: string
  pedidos: number
  total: string
  ultimoPedido: string
  favorito: string
  tier: CustomerTier
}

export const customerKpis = [
  { label: "Total de Clientes", value: "1.284", hint: "base ativa", accent: "purple" as const },
  { label: "Clientes VIP", value: "86", hint: "+10 pedidos no mês", accent: "gold" as const },
  { label: "Novos no Mês", value: "142", hint: "junho 2026", accent: "pink" as const },
  { label: "Recompra", value: "63%", hint: "voltaram em 30 dias", accent: "cream" as const },
]

export const tierMeta: Record<CustomerTier, { label: string; badge: string }> = {
  vip: { label: "VIP", badge: "bg-gold/20 text-gold" },
  fiel: { label: "Fiel", badge: "bg-[#7c3aed]/25 text-[#a78bfa]" },
  novo: { label: "Novo", badge: "bg-pink/20 text-pink" },
}

export const customers: Customer[] = [
  { id: "c1", nome: "Mariana Coentro", telefone: "(11) 98877-1020", whatsapp: "5511988771020", pedidos: 34, total: "R$ 2.180,40", ultimoPedido: "12/06/2026", favorito: "Taco Birria", tier: "vip" },
  { id: "c2", nome: "Diego Salsa", telefone: "(11) 99654-7781", whatsapp: "5511996547781", pedidos: 21, total: "R$ 1.310,90", ultimoPedido: "11/06/2026", favorito: "Burrito Carne", tier: "vip" },
  { id: "c3", nome: "Patrícia Lima", telefone: "(11) 98123-4455", whatsapp: "5511981234455", pedidos: 12, total: "R$ 742,00", ultimoPedido: "10/06/2026", favorito: "Quesadilla", tier: "fiel" },
  { id: "c4", nome: "Rafael Nacho", telefone: "(11) 99012-3322", whatsapp: "5511990123322", pedidos: 9, total: "R$ 528,70", ultimoPedido: "09/06/2026", favorito: "Taco Al Pastor", tier: "fiel" },
  { id: "c5", nome: "Camila Verde", telefone: "(11) 98456-9911", whatsapp: "5511984569911", pedidos: 3, total: "R$ 184,20", ultimoPedido: "13/06/2026", favorito: "Taco Veggie", tier: "novo" },
  { id: "c6", nome: "Bruno Guacamole", telefone: "(11) 99777-2210", whatsapp: "5511997772210", pedidos: 2, total: "R$ 119,80", ultimoPedido: "13/06/2026", favorito: "Nachos Supreme", tier: "novo" },
]

// ══════════════════════════════════════
// CARDÁPIO E CMV
// ══════════════════════════════════════

export type MenuCategoryId = "tacos" | "quesadillas" | "burritos" | "nachos" | "bebidas"

export type MenuCategory = {
  id: MenuCategoryId
  label: string
  image: string
  cmvFactor: number
}

export const menuCategories: MenuCategory[] = [
  { id: "tacos", label: "Tacos", image: "/cat-tacos.png", cmvFactor: 0.32 },
  { id: "quesadillas", label: "Quesadillas", image: "/cat-quesadillas.png", cmvFactor: 0.35 },
  { id: "burritos", label: "Burritos", image: "/cat-burritos.png", cmvFactor: 0.33 },
  { id: "nachos", label: "Nachos", image: "/cat-nachos.png", cmvFactor: 0.28 },
  { id: "bebidas", label: "Bebidas", image: "/cat-bebidas.png", cmvFactor: 0.22 },
]

type RawMenuItem = { nome: string; categoria: MenuCategoryId; preco: number; vendas: number }

const rawMenuItems: RawMenuItem[] = [
  { nome: "Taco Carnitas", categoria: "tacos", preco: 28, vendas: 38 },
  { nome: "Taco Frango", categoria: "tacos", preco: 24, vendas: 31 },
  { nome: "Taco Carne Assada", categoria: "tacos", preco: 32, vendas: 27 },
  { nome: "Taco Camarão", categoria: "tacos", preco: 38, vendas: 46 },
  { nome: "Taco Vegano", categoria: "tacos", preco: 22, vendas: 19 },
  { nome: "Quesadilla Queijo", categoria: "quesadillas", preco: 26, vendas: 24 },
  { nome: "Quesadilla Frango", categoria: "quesadillas", preco: 30, vendas: 22 },
  { nome: "Quesadilla Camarão", categoria: "quesadillas", preco: 42, vendas: 15 },
  { nome: "Burrito Completo", categoria: "burritos", preco: 36, vendas: 33 },
  { nome: "Burrito Vegetariano", categoria: "burritos", preco: 28, vendas: 17 },
  { nome: "Nachos Clássicos", categoria: "nachos", preco: 32, vendas: 29 },
  { nome: "Nachos Carnitas", categoria: "nachos", preco: 44, vendas: 21 },
  { nome: "Agua de Jamaica", categoria: "bebidas", preco: 12, vendas: 26 },
  { nome: "Limonada Mexicana", categoria: "bebidas", preco: 14, vendas: 28 },
  { nome: "Cerveja Artesanal", categoria: "bebidas", preco: 18, vendas: 34 },
  { nome: "Margarita Clássica", categoria: "bebidas", preco: 28, vendas: 23 },
  { nome: "Margarita Maracujá", categoria: "bebidas", preco: 32, vendas: 18 },
  { nome: "Água", categoria: "bebidas", preco: 6, vendas: 41 },
]

const cmvFactorByCategory = Object.fromEntries(
  menuCategories.map((c) => [c.id, c.cmvFactor]),
) as Record<MenuCategoryId, number>

const categoryLabelById = Object.fromEntries(
  menuCategories.map((c) => [c.id, c.label]),
) as Record<MenuCategoryId, string>

export const menuItems = rawMenuItems.map((item) => {
  const factor = cmvFactorByCategory[item.categoria]
  const custo = item.preco * factor
  return {
    nome: item.nome,
    categoria: item.categoria,
    categoriaLabel: categoryLabelById[item.categoria],
    preco: item.preco,
    custo,
    cmv: factor * 100,
    margem: item.preco - custo,
    vendas: item.vendas,
  }
})

export const menuKpis = [
  { label: "Total de Itens", value: "21", hint: "no cardápio ativo" },
  { label: "CMV Médio", value: "28,3%", hint: "média ponderada" },
  { label: "Mais Vendido", value: "Taco Camarão", hint: "46 vendas" },
  { label: "Itens em Alerta", value: "0", hint: "CMV acima de 40%" },
]

export const avgPriceByCategory = menuCategories.map((cat) => {
  const items = menuItems.filter((i) => i.categoria === cat.id)
  const avg = items.reduce((sum, i) => sum + i.preco, 0) / items.length
  return { categoria: cat.label, preco: Math.round(avg * 100) / 100 }
})

// ══════════════════════════════════════
// FINANCEIRO
// ══════════════════════════════════════

export const financeKpis = [
  { label: "Receita Bruta", value: "R$ 16.112,70", hint: "01 – 13 jun" },
  { label: "Receita Líquida", value: "R$ 15.363,42", hint: "após taxas e cupons" },
  { label: "Descontos Cupons", value: "R$ 2.349,00", hint: "campanhas ativas" },
  { label: "Taxas Delivery", value: "R$ 749,28", hint: "iFood + Rappi" },
  { label: "Projeção do Mês", value: "R$ 37.183,00", hint: "estimativa junho" },
]

export const revenueGrossNetByDay = [
  { dia: "01", bruta: 982, liquida: 936 },
  { dia: "02", bruta: 745, liquida: 712 },
  { dia: "03", bruta: 1120, liquida: 1068 },
  { dia: "04", bruta: 1340, liquida: 1279 },
  { dia: "05", bruta: 1190, liquida: 1135 },
  { dia: "06", bruta: 2010, liquida: 1918 },
  { dia: "07", bruta: 2980, liquida: 2843 },
  { dia: "08", bruta: 3241, liquida: 3092 },
  { dia: "09", bruta: 870, liquida: 830 },
  { dia: "10", bruta: 1015, liquida: 968 },
  { dia: "11", bruta: 1180, liquida: 1126 },
  { dia: "12", bruta: 1260, liquida: 1202 },
  { dia: "13", bruta: 1979.7, liquida: 1888 },
]

export const couponUsage = [
  { cupom: "NACHO15", usos: 25, economizado: 266.7 },
  { cupom: "LIBRE10", usos: 33, economizado: 220.6 },
  { cupom: "COMBO29", usos: 36, economizado: 1344.0 },
]

export const couponTotalSaved = "R$ 1.831,30"

export const weeklyComparison = {
  semana1: { label: "Semana 1", periodo: "1 – 7 jun", valor: "R$ 7.089,20", valorNum: 7089.2 },
  semana2: { label: "Semana 2", periodo: "8 – 13 jun", valor: "R$ 9.023,50", valorNum: 9023.5 },
  variacao: "+27,3%",
}

// ══════════════════════════════════════
// COMUNICAÇÃO
// ══════════════════════════════════════

export const newsletterPreview = {
  titulo: "LOS TACOS",
  subtitulo: "Inauguração no Mercado Novo!",
  corpo: "Chegou o dia, mi amigo! O Nacho Libre abriu as portas no Mercado Novo. Tacos artesanais, coentro fresquinho e muito sabor te esperam. Use o cupom abaixo na sua primeira visita.",
  cupom: "NACHO15",
  metricas: [
    { label: "Enviados", value: "847", hint: "lista ativa" },
    { label: "Abertos", value: "312", hint: "36,8% de abertura" },
    { label: "Cliques", value: "89", hint: "28,5% de cliques" },
  ],
}

export type SocialPost = {
  id: string
  legenda: string
  curtidas: string
  comentarios: string
  alcance: string
  bg: string
  fg: string
  emoji: string
  badge?: "Reels" | "VIRAL"
}

export const socialPosts: SocialPost[] = [
  { id: "p1", legenda: "Taco Carnitas saindo da chapa 🌮", curtidas: "847", comentarios: "43", alcance: "4.2k", bg: "#1b4332", fg: "#f5f0e8", emoji: "🌮" },
  { id: "p2", legenda: "O segredo está no coentro fresco", curtidas: "1.203", comentarios: "87", alcance: "12.8k", bg: "#f7c948", fg: "#111111", emoji: "🌿", badge: "Reels" },
  { id: "p3", legenda: "Margarita de maracujá pra fechar a noite", curtidas: "412", comentarios: "19", alcance: "2.1k", bg: "#e07b39", fg: "#111111", emoji: "🍹" },
  { id: "p4", legenda: "Nacho Libre aprovou esse nachos", curtidas: "934", comentarios: "56", alcance: "6.7k", bg: "#2d6a4f", fg: "#f5f0e8", emoji: "🧀" },
  { id: "p5", legenda: "Bastidores da cozinha às 18h", curtidas: "678", comentarios: "31", alcance: "3.9k", bg: "#111111", fg: "#f5f0e8", emoji: "🔥" },
  { id: "p6", legenda: "MAKE COENTRO GREAT AGAIN 🚀", curtidas: "1.567", comentarios: "134", alcance: "28.4k", bg: "#1b4332", fg: "#f5f0e8", emoji: "🚀", badge: "VIRAL" },
]

export const libreTiers = [
  { label: "Novos", count: 3, cls: "text-[#fb923c]" },
  { label: "Libre", count: 11, cls: "text-[#4ade80]" },
  { label: "Libre Gold", count: 16, cls: "text-gold" },
]

export const libreClients = [
  { nome: "Mariana Coentro", tier: "Libre Gold", tacos: 2, whatsapp: "5511988771020" },
  { nome: "Diego Salsa", tier: "Libre Gold", tacos: 1, whatsapp: "5511996547781" },
  { nome: "Patrícia Lima", tier: "Libre", tacos: 1, whatsapp: "5511981234455" },
  { nome: "Rafael Nacho", tier: "Libre", tacos: 1, whatsapp: "5511990123322" },
]

export const activeCoupons = [
  { codigo: "NACHO15", cor: "#f7c948", txt: "#111111", usos: 25, valor: "R$ 266,70" },
  { codigo: "LIBRE10", cor: "#16a34a", txt: "#f5f0e8", usos: 33, valor: "R$ 220,60" },
  { codigo: "COMBO29", cor: "#e07b39", txt: "#111111", usos: 36, valor: "R$ 1.344,00" },
]

export const couponsTotalSavedByClients = "R$ 1.831,30"
