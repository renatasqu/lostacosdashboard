"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { avgPriceByCategory } from "@/lib/dashboard-data"

const chartConfig = {
  preco: { label: "Preço médio", color: "var(--teal)" },
} satisfies ChartConfig

export function AvgPriceChart() {
  return (
    <Card className="gap-0 border-border bg-card p-0">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-heading text-lg uppercase tracking-wide text-[#0d9488]">Preço Médio por Categoria</h2>
        <p className="text-xs text-muted-foreground">Ticket médio de cada grupo do cardápio</p>
      </div>
      <div className="p-5">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart data={avgPriceByCategory} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="rgba(245,240,232,0.08)" />
            <XAxis
              dataKey="categoria"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickFormatter={(v) => `R$${v}`}
            />
            <ChartTooltip content={<ChartTooltipContent formatter={(v) => `R$ ${Number(v).toFixed(2)}`} />} />
            <Bar dataKey="preco" fill="#0d9488" radius={[6, 6, 0, 0]} maxBarSize={64} isAnimationActive={false} />
          </BarChart>
        </ChartContainer>
      </div>
    </Card>
  )
}