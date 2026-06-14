"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { revenueByDay } from "@/lib/dashboard-data"

const chartConfig = {
  receita: {
    label: "Receita",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-cream">Receita Diária</CardTitle>
        <CardDescription className="text-muted-foreground">
          Junho · 13 dias · R$ 16.112,70 no total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <LineChart data={revenueByDay} margin={{ left: 4, right: 12, top: 8 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
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
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <ChartTooltip
              cursor={{ stroke: "var(--pink)", strokeDasharray: "4 4" }}
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    `R$ ${Number(value).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`,
                    " Receita",
                  ]}
                />
              }
            />
            <Line
              dataKey="receita"
              type="monotone"
              stroke="var(--color-receita)"
              strokeWidth={3}
              dot={{ fill: "var(--color-receita)", r: 3 }}
              activeDot={{ r: 6, fill: "var(--gold)" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
