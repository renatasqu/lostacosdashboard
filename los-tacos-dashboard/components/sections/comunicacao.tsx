"use client"

import Image from "next/image"
import { Heart, MessageCircle, Eye, Mail, Plus, Phone, Ticket, Gift } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  newsletterPreview,
  socialPosts,
  libreTiers,
  libreClients,
  activeCoupons,
  couponsTotalSavedByClients,
} from "@/lib/dashboard-data"

function SectionTitle({ index, title, sub }: { index: number; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563eb] font-heading text-base text-white">
        {index}
      </span>
      <div>
        <h2 className="font-heading text-xl uppercase tracking-wide text-[#2563eb]">{title}</h2>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  )
}

export function Comunicacao() {
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

      <div className="relative z-10 flex flex-col gap-10">
        {/* ── SECTION 1: Newsletter ── */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle index={1} title="Newsletter" sub="E-mail marketing" />
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-2.5 font-heading text-sm uppercase tracking-wide text-white transition-transform active:scale-95"
            >
              <Plus className="h-4 w-4" /> Criar nova newsletter
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Email preview */}
            <Card className="overflow-hidden border-border bg-[#1b4332] p-0">
              <div className="flex items-center gap-2 border-b border-[#f5f0e8]/10 bg-[#111111] px-4 py-3">
                <Mail className="h-4 w-4 text-[#2563eb]" />
                <span className="text-xs text-muted-foreground">Pré-visualização do e-mail</span>
              </div>
              <div className="flex flex-col items-center gap-4 p-8 text-center">
                <span className="text-5xl">🌮</span>
                <h3 className="font-heading text-4xl tracking-wide text-gold">{newsletterPreview.titulo}</h3>
                <p className="font-heading text-lg uppercase tracking-wide text-pink">
                  {newsletterPreview.subtitulo}
                </p>
                <p className="text-sm leading-relaxed text-[#f5f0e8]/80">{newsletterPreview.corpo}</p>
                <div className="mt-2 rounded-xl border-2 border-dashed border-gold/60 bg-[#111111] px-6 py-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Seu cupom</p>
                  <p className="font-heading text-3xl tracking-widest text-gold">{newsletterPreview.cupom}</p>
                </div>
              </div>
            </Card>

            {/* Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {newsletterPreview.metricas.map((m) => (
                <Card key={m.label} className="relative gap-0 overflow-hidden border-border bg-card p-0">
                  <div className="h-1 w-full bg-[#2563eb]" />
                  <div className="flex flex-col gap-1 p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{m.label}</p>
                    <p className="font-heading text-3xl text-[#2563eb]">{m.value}</p>
                    <p className="text-xs text-muted-foreground">{m.hint}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 2: Social media ── */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle index={2} title="Mídia Social" sub="Instagram @lostacosdonacho" />
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-2.5 font-heading text-sm uppercase tracking-wide text-white transition-transform active:scale-95"
            >
              <Plus className="h-4 w-4" /> Gerar novo post
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {socialPosts.map((post) => (
              <Card key={post.id} className="gap-0 overflow-hidden border-border bg-card p-0">
                <div
                  className="relative flex aspect-square items-center justify-center"
                  style={{ backgroundColor: post.bg, color: post.fg }}
                >
                  <span className="text-6xl">{post.emoji}</span>
                  {post.badge && (
                    <span
                      className={`absolute right-3 top-3 rounded-full px-3 py-1 font-heading text-xs uppercase tracking-wide ${
                        post.badge === "VIRAL" ? "bg-pink text-white" : "bg-[#111111] text-gold"
                      }`}
                    >
                      {post.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-3 p-4">
                  <p className="line-clamp-2 text-sm text-cream">{post.legenda}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-pink" /> {post.curtidas}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4 text-[#2563eb]" /> {post.comentarios}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-gold" /> {post.alcance}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: Programa Libre ── */}
        <section className="flex flex-col gap-4">
          <SectionTitle index={3} title="Programa Libre" sub="Fidelidade" />

          <div className="grid grid-cols-3 gap-4">
            {libreTiers.map((tier) => (
              <Card key={tier.label} className="gap-0 border-border bg-card p-5 text-center">
                <p className={`font-heading text-4xl ${tier.cls}`}>{tier.count}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{tier.label}</p>
              </Card>
            ))}
          </div>

          <Card className="gap-0 border-border bg-card p-0">
            <div className="flex items-center gap-2 border-b border-border px-5 py-4">
              <Gift className="h-4 w-4 text-[#2563eb]" />
              <h3 className="font-heading text-base uppercase tracking-wide text-cream">
                Clientes com tacos grátis disponíveis
              </h3>
            </div>
            <ul className="flex flex-col">
              {libreClients.map((client) => (
                <li
                  key={client.nome}
                  className="flex items-center gap-3 border-b border-border/60 px-5 py-4 last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-cream">{client.nome}</p>
                    <p className="text-xs text-muted-foreground">{client.tier}</p>
                  </div>
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">
                    {client.tacos} taco{client.tacos > 1 ? "s" : ""} grátis
                  </span>
                  <a
                    href={`https://wa.me/${client.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Enviar WhatsApp para ${client.nome}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform active:scale-90"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* ── SECTION 4: Cupons Ativos ── */}
        <section className="flex flex-col gap-4">
          <SectionTitle index={4} title="Cupons Ativos" sub="Campanhas em andamento" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {activeCoupons.map((c) => (
              <Card key={c.codigo} className="gap-0 overflow-hidden border-border bg-card p-0">
                <div
                  className="flex items-center justify-between px-5 py-4"
                  style={{ backgroundColor: c.cor, color: c.txt }}
                >
                  <span className="font-heading text-2xl tracking-widest">{c.codigo}</span>
                  <Ticket className="h-6 w-6" />
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="font-heading text-2xl text-cream">{c.usos}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">usos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-xl text-[#2563eb]">{c.valor}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">economizado</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="flex flex-row items-center justify-between border-border bg-[#2563eb]/10 p-5">
            <span className="font-heading text-base uppercase tracking-wide text-cream">
              Total economizado pelos clientes
            </span>
            <span className="font-heading text-3xl text-[#2563eb]">{couponsTotalSavedByClients}</span>
          </Card>
        </section>
      </div>
    </div>
  )
}