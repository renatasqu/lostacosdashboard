"use client"

import Image from "next/image"
import { MessageCircle, Phone, ShoppingBag, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { customerKpis, customers, tierMeta } from "@/lib/dashboard-data"

const kpiAccent: Record<string, { bar: string; text: string }> = {
  pink: { bar: "bg-pink", text: "text-pink" },
  gold: { bar: "bg-gold", text: "text-gold" },
  purple: { bar: "bg-[#7c3aed]", text: "text-[#a78bfa]" },
  cream: { bar: "bg-cream", text: "text-cream" },
}

export function Clientes() {
  return (
    <div className="relative">
      {/* Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-0 z-0 select-none opacity-10"
      >
        <Image
          src="/logo_transperent_watermark.png"
          alt=""
          width={200}
          height={200}
          className="h-[200px] w-[200px] object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {customerKpis.map((kpi) => {
            const accent = kpiAccent[kpi.accent]
            return (
              <Card key={kpi.label} className="relative gap-0 overflow-hidden border-border bg-card p-0">
                <div className={cn("h-1 w-full", accent.bar)} />
                <div className="flex flex-col gap-3 p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
                  <p className={cn("font-heading text-3xl uppercase tracking-wide", accent.text)}>{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.hint}</p>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Customer list */}
        <Card className="gap-0 border-border bg-card p-0">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-heading text-xl uppercase tracking-wide text-cream">Base de Clientes</h2>
              <p className="text-xs text-[#a78bfa]">Histórico e fidelidade</p>
            </div>
            <span className="rounded-full bg-[#7c3aed]/20 px-3 py-1 text-xs font-semibold text-[#a78bfa]">
              {customers.length} exibidos
            </span>
          </div>

          <ul className="divide-y divide-border">
            {customers.map((customer) => {
              const tier = tierMeta[customer.tier]
              return (
                <li
                  key={customer.id}
                  className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/20 font-heading text-lg uppercase text-[#a78bfa]">
                      {customer.nome.charAt(0)}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-base uppercase tracking-wide text-cream">
                          {customer.nome}
                        </span>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", tier.badge)}>
                          {tier.label}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {customer.telefone}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 text-gold" />
                        Favorito: {customer.favorito}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pl-15 sm:pl-0">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <ShoppingBag className="h-3 w-3" />
                        Pedidos
                      </span>
                      <span className="font-heading text-lg text-cream">{customer.pedidos}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Total gasto</span>
                      <span className="font-heading text-lg text-gold">{customer.total}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Último pedido</span>
                      <span className="text-sm text-cream">{customer.ultimoPedido}</span>
                    </div>

                    <a
                      href={`https://wa.me/${customer.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      <MessageCircle className="h-4 w-4 fill-white" />
                      WhatsApp
                    </a>
                  </div>
                </li>
              )
            })}
          </ul>
        </Card>
      </div>
    </div>
  )
}