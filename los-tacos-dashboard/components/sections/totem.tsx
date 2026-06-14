"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { ArrowLeft, Check, Camera, Mail, Minus, Phone, Plus, ShoppingBag, Store, Bike } from "lucide-react"
import { cn } from "@/lib/utils"
import { menuCategories, menuItems, type MenuCategoryId } from "@/lib/dashboard-data"

/* ---------- helpers ---------- */

const BRL = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`

const emojiByCategory: Record<MenuCategoryId, string> = {
  tacos: "🌮",
  quesadillas: "🫓",
  burritos: "🌯",
  nachos: "🧀",
  bebidas: "🥤",
}

const descByCategory: Record<MenuCategoryId, string> = {
  tacos: "Tortilla artesanal, coentro fresco e molho da casa",
  quesadillas: "Queijo derretido grelhado na chapa quente",
  burritos: "Recheio generoso enrolado na tortilla de trigo",
  nachos: "Crocante com cobertura caprichada",
  bebidas: "Geladinha pra acompanhar",
}

type Step = "welcome" | "cpf" | "menu" | "cart" | "payment" | "confirm"
type Tier = { label: string; cls: string } | null
type PayMethod = "pix" | "debito" | "credito" | null

const STEP_ORDER: Step[] = ["welcome", "cpf", "menu", "cart", "payment", "confirm"]

const coupons: Record<string, { type: "percent" | "fixed"; value: number; label: string }> = {
  NACHO15: { type: "percent", value: 0.15, label: "15% OFF" },
  LIBRE10: { type: "percent", value: 0.1, label: "10% OFF" },
  COMBO29: { type: "fixed", value: 29, label: "R$ 29 OFF" },
}

const cardBrands = ["VISA", "ELO", "HIPERCARD", "AMEX", "CABAL"]

const tickerItems = ["TACOS", "QUESADILLAS", "BURRITOS", "NACHOS", "BEBIDAS", "FEITO AQUI TODO DIA"]

export function Totem() {
  const [step, setStep] = useState<Step>("welcome")
  const [tier, setTier] = useState<Tier>(null)
  const [cpf, setCpf] = useState("")
  const [activeCat, setActiveCat] = useState<MenuCategoryId>("tacos")
  const [cart, setCart] = useState<Record<string, number>>({})
  const [couponInput, setCouponInput] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [mode, setMode] = useState<"local" | "viagem">("local")
  const [payMethod, setPayMethod] = useState<PayMethod>(null)
  const [brand, setBrand] = useState<string | null>(null)
  const [beerUpsell, setBeerUpsell] = useState<boolean | null>(null)
  const [orderNum] = useState(() => "P" + Math.floor(1000 + Math.random() * 9000))

  /* derived */
  const itemByName = useMemo(() => {
    const m: Record<string, (typeof menuItems)[number]> = {}
    for (const it of menuItems) m[it.nome] = it
    return m
  }, [])

  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const subtotal = Object.entries(cart).reduce(
    (sum, [name, qty]) => sum + (itemByName[name]?.preco ?? 0) * qty,
    0,
  )
  const beerPrice = beerUpsell ? 18 : 0

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0
    const c = coupons[appliedCoupon]
    if (!c) return 0
    if (c.type === "percent") return subtotal * c.value
    return Math.min(c.value, subtotal)
  }, [appliedCoupon, subtotal])

  const total = Math.max(0, subtotal - discount) + beerPrice

  /* actions */
  const add = (name: string) => setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }))
  const remove = (name: string) =>
    setCart((c) => {
      const next = { ...c }
      const q = (next[name] ?? 0) - 1
      if (q <= 0) delete next[name]
      else next[name] = q
      return next
    })

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase()
    if (coupons[code]) setAppliedCoupon(code)
    else setAppliedCoupon(null)
  }

  const identify = () => {
    const digits = cpf.replace(/\D/g, "")
    if (digits.length >= 3) {
      const sum = digits.split("").reduce((a, d) => a + Number(d), 0)
      const t = sum % 3
      setTier(
        t === 0
          ? { label: "Novo", cls: "bg-[#f97316]/20 text-[#fb923c] border-[#f97316]/50" }
          : t === 1
            ? { label: "Libre", cls: "bg-[#16a34a]/20 text-[#4ade80] border-[#16a34a]/50" }
            : { label: "Libre Gold", cls: "bg-[#f7c948]/20 text-[#f7c948] border-[#f7c948]/50" },
      )
    }
    setStep("menu")
  }

  const reset = () => {
    setStep("welcome")
    setTier(null)
    setCpf("")
    setActiveCat("tacos")
    setCart({})
    setCouponInput("")
    setAppliedCoupon(null)
    setMode("local")
    setPayMethod(null)
    setBrand(null)
    setBeerUpsell(null)
  }

  const stepIndex = STEP_ORDER.indexOf(step)

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center bg-background py-6">
      {/* Phone frame */}
      <div className="relative flex h-[860px] w-full max-w-[430px] flex-col overflow-hidden rounded-[2rem] border border-[#f7c948]/20 bg-[#111111] font-body text-[#f5f0e8] shadow-2xl">
        {/* Progress indicator */}
        {step !== "welcome" && (
          <div className="flex shrink-0 items-center gap-1.5 bg-[#1b4332] px-5 py-3">
            {STEP_ORDER.slice(1).map((s, i) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  i <= stepIndex - 1 ? "bg-[#f7c948]" : "bg-[#f5f0e8]/15",
                )}
              />
            ))}
          </div>
        )}

        {/* ── STEP 1: WELCOME ── */}
        {step === "welcome" && (
          <button
            type="button"
            onClick={() => setStep("cpf")}
            className="relative flex flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#1b4332] p-8 text-center"
          >
            {/* top ticker */}
            <div className="absolute inset-x-0 top-0 overflow-hidden bg-[#e91e8c] py-2">
              <div className="flex animate-[marquee_18s_linear_infinite] gap-6 whitespace-nowrap">
                {[...tickerItems, ...tickerItems].map((t, i) => (
                  <span key={i} className="font-display text-base tracking-widest text-[#f7c948]">
                    {t} <span className="text-[#f5f0e8]">✦</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-10">
              <div className="relative h-40 w-40 overflow-hidden rounded-full bg-[#f5f0e8] ring-4 ring-[#e91e8c]/60">
                <Image src="/los-tacos-logo.jpeg" alt="Los Tacos" fill className="object-cover" sizes="160px" />
              </div>
              <span className="animate-[ctaBounce_2s_ease-in-out_infinite] rounded-full bg-[#f7c948] px-12 py-5 font-display text-2xl tracking-[0.15em] text-[#111111] shadow-xl">
                TOQUE PARA COMEÇAR
              </span>
              <p className="font-display text-sm tracking-[0.2em] text-[#f5f0e8]/80">
                ★ MERCADO NOVO · BELO HORIZONTE ★
              </p>
            </div>
          </button>
        )}

        {/* ── STEP 2: CPF ── */}
        {step === "cpf" && (
          <div
            key="cpf"
            className="flex flex-1 animate-in fade-in slide-in-from-right-4 flex-col bg-[#1b4332] duration-300"
          >
            <ScreenHeader title="Identifique-se" onBack={() => setStep("welcome")} />
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
              <p className="font-body text-sm text-[#f5f0e8]/70">
                Informe seu CPF para acumular pontos no fidelidade, ou continue sem cadastro.
              </p>
              <input
                inputMode="numeric"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full rounded-xl border border-[#f5f0e8]/15 bg-[#111111] px-5 py-4 font-display text-2xl tracking-widest text-[#f5f0e8] outline-none placeholder:text-[#f5f0e8]/30 focus:border-[#f7c948]"
              />
              {tier && (
                <div className={cn("flex items-center justify-between rounded-xl border px-5 py-4", tier.cls)}>
                  <span className="font-display text-lg tracking-wide">Fidelidade {tier.label}</span>
                  <Check className="h-5 w-5" />
                </div>
              )}
              <button
                type="button"
                onClick={identify}
                disabled={cpf.replace(/\D/g, "").length < 3}
                className="rounded-xl bg-[#f7c948] py-4 font-display text-xl tracking-widest text-[#111111] transition-transform active:scale-95 disabled:opacity-40"
              >
                IDENTIFICAR
              </button>
              <button
                type="button"
                onClick={() => {
                  setTier(null)
                  setStep("menu")
                }}
                className="rounded-xl border border-[#f5f0e8]/20 py-4 font-display text-lg tracking-widest text-[#f5f0e8]/70 transition-colors active:bg-[#f5f0e8]/5"
              >
                CONTINUAR SEM CADASTRO
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: MENU ── */}
        {step === "menu" && (
          <div
            key="menu"
            className="flex flex-1 animate-in fade-in slide-in-from-right-4 flex-col overflow-hidden bg-[#1b4332] duration-300"
          >
            <ScreenHeader title="Monte seu pedido" onBack={() => setStep("cpf")} />

            {/* category tabs with label images */}
            <div className="flex shrink-0 gap-2 overflow-x-auto bg-[#111111] px-4 py-3">
              {menuCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCat(cat.id)}
                  className={cn(
                    "flex h-9 shrink-0 items-center rounded-full border px-3 transition-colors",
                    activeCat === cat.id ? "border-[#f7c948] bg-[#f7c948]/10" : "border-[#f5f0e8]/15 bg-[#1b4332]",
                  )}
                >
                  <span className="relative block h-5 w-20 overflow-hidden">
                    <Image src={cat.image || "/placeholder.svg"} alt={cat.label} fill className="object-cover" />
                  </span>
                </button>
              ))}
            </div>

            {/* items */}
            <div className="flex-1 overflow-y-auto p-4 pb-28">
              <div className="grid grid-cols-1 gap-3">
                {menuItems
                  .filter((i) => i.categoria === activeCat)
                  .map((item) => {
                    const qty = cart[item.nome] ?? 0
                    return (
                      <div
                        key={item.nome}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border bg-[#111111] p-3 transition-colors",
                          qty > 0 ? "border-[#16a34a]" : "border-transparent",
                        )}
                      >
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#1b4332] text-3xl">
                          {emojiByCategory[item.categoria]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-lg leading-tight tracking-wide text-[#f5f0e8]">
                            {item.nome}
                          </p>
                          <p className="line-clamp-2 text-xs text-[#f5f0e8]/50">{descByCategory[item.categoria]}</p>
                          <p className="mt-1 font-display text-lg text-[#f7c948]">{BRL(item.preco)}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-center gap-1">
                          {qty > 0 && (
                            <button
                              type="button"
                              onClick={() => remove(item.nome)}
                              aria-label={`Remover ${item.nome}`}
                              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f0e8]/10 text-[#f5f0e8] active:scale-90"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          )}
                          {qty > 0 && <span className="font-display text-lg text-[#f5f0e8]">{qty}</span>}
                          <button
                            type="button"
                            onClick={() => add(item.nome)}
                            aria-label={`Adicionar ${item.nome}`}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e91e8c] text-white shadow-lg active:scale-90"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* floating cart bar */}
            {itemCount > 0 && (
              <button
                type="button"
                onClick={() => setStep("cart")}
                className="absolute inset-x-4 bottom-4 flex animate-in slide-in-from-bottom-4 items-center justify-between rounded-2xl bg-[#e91e8c] px-5 py-4 shadow-2xl"
              >
                <span className="flex items-center gap-2 font-display text-lg tracking-wide text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25 text-sm">
                    {itemCount}
                  </span>
                  Ver carrinho
                </span>
                <span className="font-display text-xl text-[#f7c948]">{BRL(subtotal)}</span>
              </button>
            )}
          </div>
        )}

        {/* ── STEP 4: CART & COUPON ── */}
        {step === "cart" && (
          <div
            key="cart"
            className="flex flex-1 animate-in fade-in slide-in-from-right-4 flex-col bg-[#1b4332] duration-300"
          >
            <ScreenHeader title="Seu carrinho" onBack={() => setStep("menu")} />
            <div className="flex-1 overflow-y-auto p-5">
              {itemCount === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-[#f5f0e8]/40">
                  <ShoppingBag className="h-16 w-16" />
                  <p className="font-display text-2xl tracking-wide">Carrinho vazio</p>
                </div>
              ) : (
                <>
                  <ul className="flex flex-col">
                    {Object.entries(cart).map(([name, qty]) => {
                      const it = itemByName[name]
                      return (
                        <li key={name} className="flex items-center gap-3 border-b border-[#f5f0e8]/10 py-4">
                          <span className="text-2xl">{emojiByCategory[it.categoria]}</span>
                          <div className="min-w-0 flex-1">
                            <p className="font-display text-base tracking-wide text-[#f5f0e8]">{name}</p>
                            <p className="text-xs text-[#f5f0e8]/50">{BRL(it.preco)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => remove(name)}
                              aria-label={`Remover ${name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f0e8]/10 active:scale-90"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center font-display text-lg">{qty}</span>
                            <button
                              type="button"
                              onClick={() => add(name)}
                              aria-label={`Adicionar ${name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e91e8c] text-white active:scale-90"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="w-16 text-right font-display text-base text-[#f7c948]">
                            {BRL(it.preco * qty)}
                          </span>
                        </li>
                      )
                    })}
                  </ul>

                  {/* coupon */}
                  <div className="mt-5 flex gap-2">
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Cupom (NACHO15, LIBRE10, COMBO29)"
                      className="min-w-0 flex-1 rounded-xl border border-[#f5f0e8]/15 bg-[#111111] px-4 py-3 text-sm uppercase tracking-wide text-[#f5f0e8] outline-none placeholder:text-[#f5f0e8]/30 placeholder:normal-case focus:border-[#f7c948]"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="rounded-xl bg-[#f7c948] px-5 font-display text-base tracking-wide text-[#111111] active:scale-95"
                    >
                      OK
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#4ade80]">
                      <Check className="h-4 w-4" /> Cupom {appliedCoupon} aplicado · {coupons[appliedCoupon].label}
                    </p>
                  )}

                  {/* local / viagem */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {(["local", "viagem"] as const).map((m) => {
                      const Icon = m === "local" ? Store : Bike
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMode(m)}
                          className={cn(
                            "flex items-center justify-center gap-2 rounded-xl border py-4 font-display text-lg tracking-wide transition-colors",
                            mode === m
                              ? "border-[#f7c948] bg-[#f7c948]/10 text-[#f7c948]"
                              : "border-[#f5f0e8]/15 text-[#f5f0e8]/70",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {m === "local" ? "Comer aqui" : "Viagem"}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>

            {/* totals + checkout */}
            {itemCount > 0 && (
              <div className="shrink-0 border-t border-[#f5f0e8]/10 bg-[#111111] p-5">
                <div className="mb-1 flex justify-between text-sm text-[#f5f0e8]/70">
                  <span>Subtotal</span>
                  <span>{BRL(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="mb-1 flex justify-between text-sm text-[#4ade80]">
                    <span>Desconto</span>
                    <span>- {BRL(discount)}</span>
                  </div>
                )}
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="font-display text-lg tracking-widest text-[#f5f0e8]/80">TOTAL</span>
                  <span className="font-display text-3xl text-[#f7c948]">{BRL(total)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("payment")}
                  className="w-full rounded-xl bg-[#e91e8c] py-4 font-display text-xl tracking-widest text-[#f7c948] active:scale-[0.98]"
                >
                  IR PARA PAGAMENTO
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 5: PAYMENT ── */}
        {step === "payment" && (
          <div
            key="payment"
            className="flex flex-1 animate-in fade-in slide-in-from-right-4 flex-col bg-[#1b4332] duration-300"
          >
            <ScreenHeader
              title="Pagamento"
              onBack={() => {
                if (payMethod) {
                  setPayMethod(null)
                  setBrand(null)
                  setBeerUpsell(null)
                } else {
                  setStep("cart")
                }
              }}
            />
            <div className="flex-1 overflow-y-auto p-5">
              {/* method choice */}
              {!payMethod && (
                <div className="flex flex-col gap-3">
                  <p className="text-center font-display text-2xl tracking-wide text-[#f7c948]">{BRL(total)}</p>
                  <p className="mb-2 text-center text-sm text-[#f5f0e8]/60">Escolha a forma de pagamento</p>
                  {(
                    [
                      { id: "pix", label: "PIX", desc: "Aprovação na hora" },
                      { id: "debito", label: "Débito", desc: "Insira ou aproxime" },
                      { id: "credito", label: "Crédito", desc: "Em até 1x sem juros" },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPayMethod(m.id)}
                      className="flex items-center justify-between rounded-2xl border border-[#f5f0e8]/15 bg-[#111111] px-5 py-5 text-left transition-colors active:border-[#f7c948]"
                    >
                      <div>
                        <p className="font-display text-2xl tracking-wide text-[#f5f0e8]">{m.label}</p>
                        <p className="text-xs text-[#f5f0e8]/50">{m.desc}</p>
                      </div>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e91e8c] text-white">
                        <Plus className="h-4 w-4 rotate-45" />
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* PIX */}
              {payMethod === "pix" && (
                <div className="flex flex-col items-center gap-5">
                  <QrPlaceholder />
                  <p className="font-display text-3xl text-[#f7c948]">{BRL(total)}</p>
                  <p className="text-center text-sm text-[#f5f0e8]/70">Escaneie o QR Code no app do seu banco</p>

                  {/* beer upsell */}
                  {beerUpsell === null && (
                    <div className="w-full rounded-2xl border border-[#f7c948]/40 bg-[#111111] p-5 text-center">
                      <p className="font-display text-xl tracking-wide text-[#f5f0e8]">🍺 Adicionar Cerveja Artesanal?</p>
                      <p className="mb-4 text-sm text-[#f5f0e8]/60">Apenas + R$ 18,00 no seu pedido</p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setBeerUpsell(true)}
                          className="flex-1 rounded-xl bg-[#16a34a] py-3 font-display text-lg tracking-widest text-white active:scale-95"
                        >
                          SIM
                        </button>
                        <button
                          type="button"
                          onClick={() => setBeerUpsell(false)}
                          className="flex-1 rounded-xl border border-[#f5f0e8]/20 py-3 font-display text-lg tracking-widest text-[#f5f0e8]/70 active:scale-95"
                        >
                          NÃO
                        </button>
                      </div>
                    </div>
                  )}
                  {beerUpsell === true && (
                    <p className="flex items-center gap-2 text-sm text-[#4ade80]">
                      <Check className="h-4 w-4" /> Cerveja adicionada · novo total {BRL(total)}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => setStep("confirm")}
                    className="w-full rounded-xl bg-[#f7c948] py-4 font-display text-xl tracking-widest text-[#111111] active:scale-95"
                  >
                    JÁ PAGUEI
                  </button>
                </div>
              )}

              {/* DÉBITO / CRÉDITO */}
              {(payMethod === "debito" || payMethod === "credito") && (
                <div className="flex flex-col gap-5">
                  {!brand ? (
                    <>
                      <p className="text-center font-display text-xl tracking-wide text-[#f5f0e8]">
                        Selecione a bandeira
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {cardBrands.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBrand(b)}
                            className="flex h-20 items-center justify-center rounded-xl border border-[#f5f0e8]/15 bg-[#111111] font-display text-lg tracking-wide text-[#f5f0e8] transition-colors active:border-[#f7c948]"
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-5">
                      <p className="font-display text-xl tracking-wide text-[#f5f0e8]">
                        {brand} · {payMethod === "debito" ? "Débito" : "Crédito"}
                      </p>
                      {/* card machine */}
                      <div className="flex w-52 flex-col items-center gap-3 rounded-2xl bg-[#1a1a1a] p-5 shadow-2xl">
                        <div className="w-full rounded-lg border-2 border-[#333] bg-[#2a2a2a] px-4 py-3 text-center">
                          <p className="font-display text-2xl text-[#f7c948]">{BRL(total)}</p>
                          <p className="mt-1 animate-pulse font-display text-[0.6rem] tracking-[0.15em] text-[#888]">
                            AGUARDANDO CARTÃO
                          </p>
                        </div>
                        <div className="w-full rounded border-2 border-dashed border-[#444] bg-[#111] px-4 py-3 text-center font-display text-xs tracking-widest text-[#f7c948]">
                          INSIRA OU APROXIME
                        </div>
                        <p className="animate-pulse font-display tracking-[0.25em] text-[#4AABAB]">• • •</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep("confirm")}
                        className="w-full rounded-xl bg-[#16a34a] py-4 font-display text-xl tracking-widest text-white active:scale-95"
                      >
                        CONFIRMAR PAGAMENTO
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 6: CONFIRMATION ── */}
        {step === "confirm" && (
          <div
            key="confirm"
            className="flex flex-1 animate-in fade-in zoom-in-95 flex-col overflow-y-auto bg-[#1b4332] p-7 text-center duration-300"
          >
            <span className="mt-2 animate-in zoom-in text-7xl duration-500">🌮</span>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-[#f7c948]">PEDIDO CONFIRMADO!</h2>
            <p className="mt-3 font-display text-6xl leading-none text-[#f5f0e8]">{orderNum}</p>
            <p className="mt-3 font-display text-lg tracking-[0.15em] text-[#f5f0e8]/70">PRONTO EM 8 MINUTOS</p>

            <div className="my-6 h-px w-full bg-[#f5f0e8]/15" />

            <p className="font-display text-2xl tracking-wide text-[#e91e8c]">Siga a gente enquanto espera!</p>

            <div className="mt-5 flex items-center justify-center gap-4 rounded-2xl bg-[#111111] p-4">
              <Camera className="h-8 w-8 shrink-0 text-[#e91e8c]" />
              <span className="font-display text-xl tracking-wide text-[#f5f0e8]">@lostacosdonacho</span>
              <div className="ml-auto">
                <QrPlaceholder small />
              </div>
            </div>

            {/* newsletter */}
            <div className="mt-4 rounded-2xl bg-[#111111] p-5 text-left">
              <p className="flex items-center gap-2 font-display text-lg tracking-wide text-[#f7c948]">
                <Mail className="h-5 w-5" /> Receba ofertas exclusivas
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="min-w-0 flex-1 rounded-xl border border-[#f5f0e8]/15 bg-[#1b4332] px-4 py-3 text-sm text-[#f5f0e8] outline-none placeholder:text-[#f5f0e8]/30 focus:border-[#f7c948]"
                />
                <button
                  type="button"
                  className="rounded-xl bg-[#f7c948] px-5 font-display text-base tracking-widest text-[#111111] active:scale-95"
                >
                  ASSINAR
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-[#111111] p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]">
                <Phone className="h-4 w-4 text-white" />
              </span>
              <span className="font-display text-xl tracking-wide text-[#f5f0e8]">(31) 9000-0000</span>
            </div>

            <button
              type="button"
              onClick={reset}
              className="mt-6 rounded-xl border border-[#f5f0e8]/20 py-3 font-display text-base tracking-[0.2em] text-[#f5f0e8]/60 active:bg-[#f5f0e8]/5"
            >
              NOVO PEDIDO
            </button>

            <p className="mt-6 text-xs tracking-[0.2em] text-[#f5f0e8]/40">MAKE COENTRO GREAT AGAIN</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- sub-components ---------- */

function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-[#f5f0e8]/10 bg-[#111111] px-5 py-4">
      <button
        type="button"
        onClick={onBack}
        aria-label="Voltar"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f0e8]/10 text-[#f7c948] active:scale-90"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h2 className="font-display text-2xl tracking-wide text-[#f7c948]">{title}</h2>
    </div>
  )
}

function QrPlaceholder({ small = false }: { small?: boolean }) {
  // deterministic pseudo-QR pattern
  const cells = Array.from({ length: 49 }, (_, i) => (i * 7 + (i % 3) + (i % 5)) % 2 === 0)
  return (
    <div className={cn("rounded-xl bg-white p-2", small ? "h-20 w-20" : "h-44 w-44")}>
      <div className="grid h-full w-full grid-cols-7 gap-[2px]">
        {cells.map((on, i) => (
          <div key={i} className={cn("rounded-[1px]", on ? "bg-[#111111]" : "bg-white")} />
        ))}
      </div>
    </div>
  )
}