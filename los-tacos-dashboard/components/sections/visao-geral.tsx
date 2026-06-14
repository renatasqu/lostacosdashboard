import { KpiCards } from "@/components/kpi-cards"
import { RevenueChart } from "@/components/revenue-chart"
import { ChannelChart } from "@/components/channel-chart"

export function VisaoGeral() {
  return (
    <div className="flex flex-col gap-6">
      <KpiCards />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <ChannelChart />
        </div>
      </div>
    </div>
  )
}
