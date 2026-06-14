"use client"

import { useMemo, useState } from "react"
import { Clock, MapPin, ShoppingBag, ArrowRight, Timer, DollarSign, Flame, Receipt } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  kitchenOrders,
  kitchenColumns,
  channelMeta,
  turnoOptions,
  canalOptions,
  type KitchenOrder,
  type KitchenStatus,
  type KitchenTurno,
  type KitchenChannel,
} from "@/lib/dashboard-data"

const kpiAccent: Record<string, { bar: string; text: string }> = {
  pink: { bar: "bg-pink", text: "text-pink" },
  gold: { bar: "bg-gold", text: "text-gold" },
  purple: { bar: "bg-secondary", text: "text-[#b794f6]" },
  cream: { bar: "bg-cream", text: "text-cream" },
}

export function Cozinha() {
  const [orders, setOrders] = useState<KitchenOrder[]>(kitchenOrders)
  const [turno, setTurno] = useState<KitchenTurno | "todos">("todos")
  const [canal, setCanal] = useState<KitchenChannel | "delivery" | "todos">("todos")

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const turnoOk = turno === "todos" || o.turno === turno
      const canalOk =
        canal === "todos" ||
        (canal === "delivery" ? o.canal === "ifood" || o.canal === "rappi" : o.canal === canal)
      return turnoOk && canalOk
    })
  }, [orders, turno, canal])

  const moveNext = (id: string, next: KitchenStatus | null) => {
    if (!next) return
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: next } : o)))
  }

  const andamento = filtered.filter((o) => o.status === "andamento").length

  const kpis = [
    { label: "Pedidos Hoje", value: String(filtered.length), hint: "na fila ativa", accent: "pink", icon: Receipt },
    { label: "Receita do Dia", value: "R$ 1.979", hint: "13/06 parcial", accent: "gold", icon: DollarSign },
    { label: "Em Andamento", value: String(andamento), hint: "no fogão agora", accent: "purple", icon: Flame },
    { label: "Tempo Médio", value: "8m 32s", hint: "do pedido à entrega", accent: "cream", icon: Timer },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          const accent = kpiAccent[kpi.accent]
          return (
            <Card key={kpi.label} className="relative gap-0 overflow-hidden border-border bg-card p-0">
              <div className={cn("h-1 w-full", accent.bar)} />
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
                  <Icon className={cn("h-4 w-4", accent.text)} />
                </div>
                <p className={cn("font-heading text-3xl uppercase tracking-wide", accent.text)}>{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.hint}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterGroup
          label="Turno"
          value={turno}
          options={turnoOptions}
          onChange={(v) => setTurno(v as KitchenTurno | "todos")}
        />
        <FilterGroup
          label="Canal"
          value={canal}
          options={canalOptions}
          onChange={(v) => setCanal(v as KitchenChannel | "delivery" | "todos")}
        />
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {kitchenColumns.map((col) => {
          const colOrders = filtered.filter((o) => o.status === col.id)
          return (
            <div key={col.id} className="flex flex-col gap-3 rounded-xl border border-border bg-background/40 p-3">
              <div className="flex items-center justify-between px-1">
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-heading text-sm uppercase tracking-wide",
                    col.badge,
                  )}
                >
                  {col.label}
                </span>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-sm font-semibold text-cream">
                  {colOrders.length}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {colOrders.length === 0 && (
                  <p className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                    Nenhum pedido
                  </p>
                )}
                {colOrders.map((order) => (
                  <OrderCard key={order.id} order={order} cta={col.cta} next={col.next} onMove={moveNext} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { id: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-pink">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              value === opt.id
                ? "border-pink bg-pink text-accent-foreground"
                : "border-border bg-background text-muted-foreground hover:text-cream",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function OrderCard({
  order,
  cta,
  next,
  onMove,
}: {
  order: KitchenOrder
  cta: string
  next: KitchenStatus | null
  onMove: (id: string, next: KitchenStatus | null) => void
}) {
  const meta = channelMeta[order.canal]
  return (
    <Card className="gap-3 border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="font-heading text-lg uppercase tracking-wide text-cream">{order.numero}</span>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {order.hora}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", meta.badge)}>{meta.label}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-cream">
          {order.tipo === "local" ? <MapPin className="h-3 w-3" /> : <ShoppingBag className="h-3 w-3" />}
          {order.tipo === "local" ? "Local" : "Viagem"}
        </span>
      </div>

      <ul className="flex flex-col gap-1 border-t border-border pt-3 text-sm text-cream">
        {order.itens.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="font-heading text-pink">{item.qtd}x</span>
            <span className="text-muted-foreground">{item.nome}</span>
          </li>
        ))}
      </ul>

      {next ? (
        <button
          type="button"
          onClick={() => onMove(order.id, next)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-pink px-3 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <span className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#22c55e]/40 bg-[#22c55e]/10 px-3 py-2 text-sm font-semibold text-[#4ade80]">
          Pronto para retirada
        </span>
      )}
    </Card>
  )
}