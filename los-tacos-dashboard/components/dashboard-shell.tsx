"use client"

import { useState } from "react"
import { Menu, X, Calendar } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { VisaoGeral } from "@/components/sections/visao-geral"
import { PlaceholderSection } from "@/components/sections/placeholder-section"
import { navSections, type SectionId } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"
import { Cozinha } from "@/components/sections/cozinha"
import { Clientes } from "@/components/sections/clientes"
import { Cardapio } from "@/components/sections/cardapio"
import { Financeiro } from "@/components/sections/financeiro"
import { Totem } from "@/components/sections/totem"


const placeholders: Record<string, { title: string; description: string }> = {
  totem: {
    title: "Totem",
    description: "Fluxo de pedido do cliente no autoatendimento. Monte seu taco, escolha extras e finalize o pagamento.",
  },
  cozinha: {
    title: "Cozinha",
    description: "Painel de produção em tempo real com os pedidos na fila, em preparo e prontos para retirada.",
  },
  clientes: {
    title: "Clientes",
    description: "Base de clientes, histórico de pedidos e programa de fidelidade do Los Tacos.",
  },
  cardapio: {
    title: "Cardápio & CMV",
    description: "Gestão do cardápio, fichas técnicas e custo da mercadoria vendida por item.",
  },
  financeiro: {
    title: "Financeiro",
    description: "Fluxo de caixa, contas a pagar e a receber e DRE do restaurante.",
  },
  comunicacao: {
    title: "Comunicação",
    description: "Campanhas de marketing, redes sociais e a voz do Nacho Libre: Make Coentro Great Again.",
  },
}

export function DashboardShell() {
  const [active, setActive] = useState<SectionId>("visao-geral")
  const [mobileOpen, setMobileOpen] = useState(false)

  const current = navSections.find((s) => s.id === active)!

  const handleSelect = (id: SectionId) => {
    setActive(id)
    setMobileOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden w-72 shrink-0 border-r border-sidebar-border lg:block">
        <div className="sticky top-0 h-screen">
          <DashboardSidebar active={active} onSelect={handleSelect} />
        </div>
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 border-r border-sidebar-border">
            <DashboardSidebar active={active} onSelect={handleSelect} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-cream lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div>
              <h1 className="font-heading text-2xl uppercase tracking-wide text-cream sm:text-3xl">
                {current.label}
              </h1>
              <p className="text-xs text-pink">{current.sub}</p>
            </div>
          </div>
          <div
            className={cn(
              "hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-cream sm:inline-flex",
            )}
          >
            <Calendar className="h-4 w-4 text-gold" />
            01 – 13 Jun 2026
          </div>
        </header>

       <main className="flex-1 p-4 sm:p-6">
  {active === "totem" ? (
    <Totem />
  ) : active === "visao-geral" ? (
    <VisaoGeral />
  ) : active === "cozinha" ? (
    <Cozinha />
  ) : active === "clientes" ? (
    <Clientes />
  ) : active === "cardapio" ? (
    <Cardapio />
  ) : active === "financeiro" ? (
    <Financeiro />
  ) : (
    <PlaceholderSection
      title={placeholders[active].title}
      description={placeholders[active].description}
    />
  )}
</main>
</div>
</div>
  )
}