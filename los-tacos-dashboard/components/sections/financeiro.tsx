"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { GrossNetChart } from "@/components/gross-net-chart"
import { CouponChart } from "@/components/coupon-chart"
import { financeKpis, weeklyComparison } from "@/lib/dashboard-data"

export function Financeiro() {
  const { semana1, semana2, variacao } = weeklyComparison

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
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {financeKpis.map((kpi) => (
            <Card key={kpi.label} className="relative gap-0 overflow-hidden border-border bg-card p-0">
              <div className="h-1 w-full bg-[#16a34a]" />
              <div className="flex flex-col gap-2 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
                <p className="font-heading text-xl uppercase tracking-wide text-[#16a34a] xl:text-2xl">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.hint}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Chart 1: Gross vs Net */}
        <GrossNetChart />

        {/* Chart 2 + weekly comparison */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CouponChart />
          </div>

          {/* Comparativo semanal */}
          <Card className="gap-0 border-border bg-card p-0">
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-heading text-lg uppercase tracking-wide text-[#16a34a]">Comparativo Semanal</h2>
              <p className="text-xs text-muted-foreground">Receita por semana</p>
            </div>
            <div className="flex flex-col gap-4 p-5">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {semana1.label} · {semana1.periodo}
                </p>
                <p className="mt-1 font-heading text-2xl text-cream">{semana1.valor}</p>
              </div>
              <div className="rounded-xl border border-[#16a34a]/40 bg-[#16a34a]/10 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {semana2.label} · {semana2.periodo}
                </p>
                <p className="mt-1 font-heading text-2xl text-[#16a34a]">{semana2.valor}</p>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-xl bg-[#16a34a]/15 px-4 py-3">
                <ArrowUpRight className="h-5 w-5 text-[#16a34a]" />
                <span className="font-heading text-2xl uppercase tracking-wide text-[#16a34a]">{variacao}</span>
                <span className="text-xs text-muted-foreground">vs. semana anterior</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}