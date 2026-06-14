import { Card } from "@/components/ui/card"
import { Construction } from "lucide-react"

export function PlaceholderSection({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Card className="flex min-h-[420px] flex-col items-center justify-center gap-4 border-border border-dashed bg-card p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-pink">
        <Construction className="h-8 w-8" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl uppercase text-cream">{title}</h2>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
      <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
        Em construção
      </span>
    </Card>
  )
}
