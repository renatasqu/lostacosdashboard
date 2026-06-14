"use client"

import Image from "next/image"
import {
  Sandwich,
  LayoutDashboard,
  CookingPot,
  Users,
  ClipboardList,
  Wallet,
  Megaphone,
  type LucideIcon,
} from "lucide-react"
import { navSections, type SectionId } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

const icons: Record<string, LucideIcon> = {
  Sandwich,
  LayoutDashboard,
  CookingPot,
  Users,
  ClipboardList,
  Wallet,
  Megaphone,
}

export function DashboardSidebar({
  active,
  onSelect,
}: {
  active: SectionId
  onSelect: (id: SectionId) => void
}) {
  return (
    <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-cream ring-2 ring-pink/60">
          <Image
            src="/los-tacos-logo.jpeg"
            alt="Logo Los Tacos"
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div className="leading-tight">
          <p className="font-heading text-lg uppercase tracking-wider text-cream">
            Los Tacos
          </p>
          <p className="text-xs font-medium text-pink">Belo Horizonte · MG</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        {navSections.map((item) => {
          const Icon = icons[item.icon]
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground shadow-[0_0_0_1px_rgba(247,201,72,0.35)]"
                  : "text-cream/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-accent-foreground" : "text-pink",
                )}
              />
              <span className="flex flex-col">
                <span className="font-heading text-sm uppercase tracking-wide">
                  {item.label}
                </span>
                <span
                  className={cn(
                    "text-[11px]",
                    isActive ? "text-accent-foreground/80" : "text-cream/40",
                  )}
                >
                  {item.sub}
                </span>
              </span>
            </button>
          )
        })}
      </nav>

      {/* Mascot footer */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-cream ring-2 ring-gold/70">
            <Image
              src="/make-coentro-great-again.jpeg"
              alt="Nacho Libre"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="leading-tight">
            <p className="font-heading text-sm uppercase text-gold">Nacho Libre</p>
            <p className="text-[11px] text-cream/60">
              {'"Make Coentro Great Again"'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
