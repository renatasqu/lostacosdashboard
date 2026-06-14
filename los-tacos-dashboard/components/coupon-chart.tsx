"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { couponUsage, couponTotalSaved } from "@/lib/dashboard-data"

const chartConfig = {
  usos: { label: "Usos", color: "#16a34a" },
} satisfies ChartConfig

export function CouponChart() {
  return (
    <Card className="gap-0 border-border bg-card p-0">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="font-heading text-lg uppercase tracking-wide text-[#16a34a]">Uso de Cupons</h2>
          <p className="text-xs text-muted-foreground">Quantidade de usos por campanha</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Total economizado</p>
          <p className="font-heading text-lg text-[#16a34a]">{couponTotalSaved}</p>
        </div>
      </div>
      <div className="p-5">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart data={couponUsage} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="rgba(245,240,232,0.08)" />
            <XAxis
              dataKey="cupom"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => [
                    `${value} usos · R$ ${Number(item?.payload?.economizado).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                    "",
                  ]}
                />
              }
            />
            <Bar dataKey="usos" fill="#16a34a" radius={[6, 6, 0, 0]} maxBarSize={72} isAnimationActive={false} />
          </BarChart>
        </ChartContainer>
        <ul className="mt-4 flex flex-col gap-2">
          {couponUsage.map((c) => (
            <li key={c.cupom} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm">
              <span className="font-heading uppercase tracking-wide text-cream">{c.cupom}</span>
              <span className="text-muted-foreground">
                {c.usos} usos ·{" "}
                <span className="font-semibold text-[#16a34a]">
                  R$ {c.economizado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}