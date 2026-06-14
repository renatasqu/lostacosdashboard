"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { revenueGrossNetByDay } from "@/lib/dashboard-data"

const chartConfig = {
  bruta: { label: "Receita Bruta", color: "#16a34a" },
  liquida: { label: "Receita Líquida", color: "#0d9488" },
} satisfies ChartConfig

export function GrossNetChart() {
  return (
    <Card className="gap-0 border-border bg-card p-0">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-heading text-lg uppercase tracking-wide text-[#16a34a]">Receita Bruta vs Líquida</h2>
        <p className="text-xs text-muted-foreground">Por dia · 13 dias de junho</p>
      </div>
      <div className="p-5">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={revenueGrossNetByDay} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="rgba(245,240,232,0.08)" />
            <XAxis
              dataKey="dia"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={44}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickFormatter={(v) => `${Number(v) / 1000}k`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                    name === "bruta" ? " Bruta" : " Líquida",
                  ]}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="bruta" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={24} isAnimationActive={false} />
            <Bar dataKey="liquida" fill="#0d9488" radius={[4, 4, 0, 0]} maxBarSize={24} isAnimationActive={false} />
          </BarChart>
        </ChartContainer>
      </div>
    </Card>
  )
}