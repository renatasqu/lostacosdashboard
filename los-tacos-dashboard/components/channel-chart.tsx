"use client"

import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { ordersByChannel } from "@/lib/dashboard-data"

const chartConfig = {
  pedidos: { label: "Pedidos" },
  totem: { label: "Totem", color: "var(--chart-1)" },
  balcao: { label: "Balcão", color: "var(--chart-2)" },
  ifood: { label: "iFood", color: "var(--chart-3)" },
  rappi: { label: "Rappi", color: "var(--chart-4)" },
} satisfies ChartConfig

export function ChannelChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-cream">Pedidos por Canal</CardTitle>
        <CardDescription className="text-muted-foreground">
          253 pedidos · distribuição por origem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={ordersByChannel}
              dataKey="pedidos"
              nameKey="canal"
              innerRadius={58}
              outerRadius={100}
              paddingAngle={2}
              strokeWidth={2}
              stroke="var(--card)"
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="canal" />}
              className="flex-wrap gap-x-4 text-cream"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
