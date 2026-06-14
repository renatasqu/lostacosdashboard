"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { AvgPriceChart } from "@/components/avg-price-chart"
import { menuKpis, menuCategories, menuItems, type MenuCategoryId } from "@/lib/dashboard-data"

const BRL = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`

function cmvClass(cmv: number) {
  if (cmv > 40) return "text-[#f87171] bg-[#ef4444]/15"
  if (cmv < 35) return "text-[#4ade80] bg-[#22c55e]/15"
  return "text-cream bg-muted"
}

export function Cardapio() {
  const [activeCat, setActiveCat] = useState<MenuCategoryId | "todos">("todos")

  const visibleCategories =
    activeCat === "todos" ? menuCategories : menuCategories.filter((c) => c.id === activeCat)

  return (
    <div className="relative">
      {/* Watermark */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-6 right-0 z-0 select-none opacity-[0.08]">
        <Image
          src="/cardapio-watermark.png"
          alt=""
          width={220}
          height={220}
          className="h-auto w-[220px] object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {menuKpis.map((kpi) => (
            <Card key={kpi.label} className="relative gap-0 overflow-hidden border-border bg-card p-0">
              <div className="h-1 w-full bg-[#0d9488]" />
              <div className="flex flex-col gap-3 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
                <p className="font-heading text-2xl uppercase tracking-wide text-[#0d9488] sm:text-3xl">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.hint}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCat("todos")}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
              activeCat === "todos"
                ? "border-[#0d9488] bg-[#0d9488] text-white"
                : "border-border bg-card text-muted-foreground hover:text-cream",
            )}
          >
            Todos
          </button>
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCat(cat.id)}
              className={cn(
                "flex h-10 items-center rounded-full border px-4 transition-colors",
                activeCat === cat.id
                  ? "border-[#0d9488] bg-[#0d9488]/10"
                  : "border-border bg-card hover:border-[#0d9488]/50",
              )}
            >
              <span className="relative block h-6 w-24 overflow-hidden">
                <Image src={cat.image || "/placeholder.svg"} alt={cat.label} fill className="object-cover" />
              </span>
            </button>
          ))}
        </div>

        {/* Full table */}
        <Card className="gap-0 border-border bg-card p-0">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-heading text-lg uppercase tracking-wide text-[#0d9488]">Tabela de Itens & CMV</h2>
            <p className="text-xs text-muted-foreground">
              CMV acima de 40% em vermelho, abaixo de 35% em verde
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Nome</th>
                  <th className="px-5 py-3 font-medium">Categoria</th>
                  <th className="px-5 py-3 text-right font-medium">Preço</th>
                  <th className="px-5 py-3 text-right font-medium">Custo</th>
                  <th className="px-5 py-3 text-center font-medium">CMV%</th>
                  <th className="px-5 py-3 text-right font-medium">Margem</th>
                  <th className="px-5 py-3 text-right font-medium">Vendas</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.nome} className="border-b border-border/60 transition-colors hover:bg-muted/30">
                    <td className="px-5 py-3 font-medium text-cream">{item.nome}</td>
                    <td className="px-5 py-3 text-muted-foreground">{item.categoriaLabel}</td>
                    <td className="px-5 py-3 text-right font-semibold text-[#0d9488]">{BRL(item.preco)}</td>
                    <td className="px-5 py-3 text-right text-muted-foreground">{BRL(item.custo)}</td>
                    <td className="px-5 py-3 text-center">
                      <span
                        className={cn(
                          "inline-block rounded-full px-2.5 py-0.5 text-xs font-bold",
                          cmvClass(item.cmv),
                        )}
                      >
                        {item.cmv.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-gold">{BRL(item.margem)}</td>
                    <td className="px-5 py-3 text-right text-cream">{item.vendas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Bar chart */}
        <AvgPriceChart />

        {/* Category sections with label dividers */}
        <div className="flex flex-col gap-8">
          {visibleCategories.map((cat) => {
            const items = menuItems.filter((i) => i.categoria === cat.id)
            return (
              <section key={cat.id} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="relative block h-12 w-64 shrink-0 overflow-hidden sm:h-14 sm:w-80">
                    <Image src={cat.image || "/placeholder.svg"} alt={cat.label} fill className="object-cover" />
                  </span>
                  <div className="h-px flex-1 bg-border" />
                  <span className="rounded-full bg-[#0d9488]/15 px-3 py-1 text-xs font-semibold text-[#0d9488]">
                    {items.length} itens
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <Card key={item.nome} className="gap-3 border-border bg-card p-4">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-heading text-base uppercase tracking-wide text-cream">{item.nome}</span>
                        <span className="font-heading text-lg text-[#0d9488]">{BRL(item.preco)}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
                        <span className="text-muted-foreground">Custo {BRL(item.custo)}</span>
                        <span className={cn("rounded-full px-2 py-0.5 font-bold", cmvClass(item.cmv))}>
                          CMV {item.cmv.toFixed(1)}%
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}