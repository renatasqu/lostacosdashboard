import { ArrowUpRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { kpis } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

const accentBar: Record<string, string> = {
  gold: "bg-gold",
  pink: "bg-pink",
  purple: "bg-secondary",
  cream: "bg-cream",
}

const accentText: Record<string, string> = {
  gold: "text-gold",
  pink: "text-pink",
  purple: "text-[#b794f6]",
  cream: "text-cream",
}

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <Card
          key={kpi.label}
          className="relative gap-0 overflow-hidden border-border bg-card p-0"
        >
          <div className={cn("h-1 w-full", accentBar[kpi.accent])} />
          <div className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {kpi.label}
              </p>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-gold">
                <ArrowUpRight className="h-3 w-3" />
                {kpi.delta}
              </span>
            </div>
            <p
              className={cn(
                "font-heading text-3xl uppercase tracking-wide",
                accentText[kpi.accent],
              )}
            >
              {kpi.value}
            </p>
            <p className="text-xs text-muted-foreground">{kpi.hint}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
