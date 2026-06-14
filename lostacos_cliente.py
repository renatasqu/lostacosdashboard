# ═══════════════════════════════════════════════════════════════
# LOS TACOS — SCRIPT 1: FLUXO DO CLIENTE
# Make Coentro Great Again
# ═══════════════════════════════════════════════════════════════
#
# Este script contém toda a lógica do fluxo do cliente no totem.
# Passe este arquivo para o Lovable junto com os CSVs e a logo
# para ele montar o design em cima desta estrutura.
#
# ARQUIVOS NECESSÁRIOS (coloque na mesma pasta que este script):
#   - cardapio-los-tacos.csv
#   - clientes_mock.csv
#   - logo_lostacos.png     ← sua logo aqui
#   - nacho_avatar.png      ← imagem do Nacho (opcional)
#
# ═══════════════════════════════════════════════════════════════

import csv
import random
from datetime import datetime

# ══════════════════════════════════════════════════════════════
# CONFIGURAÇÕES DA MARCA
# ══════════════════════════════════════════════════════════════

MARCA = {
    "nome": "Los Tacos",
    "slogan": "Make Coentro Great Again",
    "personagem": "Nacho Libre",
    "local": "Mercado Novo · Belo Horizonte",
    "instagram": "@lostacosdonacho",
    "whatsapp": "(31) 9000-0000",
    "email": "nacho@nacholibre.com.br",
}

CORES = {
    "verde_escuro":  "#1b4332",
    "verde_medio":   "#2d6a4f",
    "amarelo":       "#f7c948",
    "laranja":       "#e07b39",
    "creme":         "#f5f0e8",
    "preto":         "#111111",
    "branco":        "#ffffff",
}

TIPOGRAFIA = {
    "titulo":   "Bebas Neue",
    "label":    "Barlow Condensed",
    "corpo":    "Barlow",
}

CUPONS_VALIDOS = {
    "NACHO15": {"desconto_pct": 15, "descricao": "15% off no primeiro pedido"},
    "LIBRE10": {"desconto_pct": 10, "descricao": "10% off para clientes Libres"},
    "COMBO29": {"desconto_fixo": True, "valor_fixo": 29, "descricao": "2 Tacos + Bebida por R$29"},
}

# ══════════════════════════════════════════════════════════════
# CAMINHOS DOS ARQUIVOS
# ══════════════════════════════════════════════════════════════

# ↓ COLOQUE O CAMINHO DO SEU CSV DE CARDÁPIO AQUI
CARDAPIO_CSV = "cardapio-los-tacos.csv"

# ↓ COLOQUE O CAMINHO DO SEU CSV DE CLIENTES AQUI
CLIENTES_CSV = "clientes_mock.csv"

# ↓ COLOQUE O CAMINHO DA LOGO AQUI (PNG ou SVG)
LOGO = "logo_lostacos.png"

# ↓ COLOQUE O CAMINHO DA IMAGEM DO NACHO AQUI (opcional)
IMAGEM_NACHO = "nacho_avatar.png"

# ↓ COLOQUE O CAMINHO DO QR CODE DO INSTAGRAM AQUI (opcional)
QR_INSTAGRAM = "qr_instagram.png"

# ↓ COLOQUE O CAMINHO DO QR CODE DO WHATSAPP AQUI (opcional)
QR_WHATSAPP = "qr_whatsapp.png"


# ══════════════════════════════════════════════════════════════
# TELA 1 — TELA INICIAL
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Fundo: verde escuro #1b4332
#   - Logo Los Tacos centralizada (arquivo: LOGO)
#   - Ticker animado no topo com categorias do cardápio
#   - Texto grande: "TOQUE PARA COMEÇAR"
#   - Texto pequeno: Mercado Novo · Belo Horizonte
#   - Botão pulsando em amarelo #f7c948
#
# ═══════════════════════════════════════════════════════════════

def tela_inicial():
    """Retorna os dados necessários para montar a tela inicial."""

    # Ticker animado com categorias
    ticker_items = [
        "TACOS", "QUESADILLAS", "BURRITOS",
        "NACHOS", "BEBIDAS", "DRINKS",
        "FEITO AQUI TODO DIA"
    ]

    return {
        "tela": "inicial",
        "fundo": CORES["verde_escuro"],
        "logo": LOGO,                        # ← arquivo da logo
        "imagem_nacho": IMAGEM_NACHO,        # ← imagem do Nacho (opcional)
        "ticker": ticker_items,
        "titulo": "TOQUE PARA COMEÇAR",
        "subtitulo": MARCA["local"],
        "cor_botao": CORES["amarelo"],
        "cor_titulo": CORES["amarelo"],
        "fonte_titulo": TIPOGRAFIA["titulo"],
        "animacao_botao": "pulse",
    }


# ══════════════════════════════════════════════════════════════
# TELA 2 — CPF E IDENTIFICAÇÃO
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Pergunta: "Quer se identificar?"
#   - Opção 1: Inserir CPF (campo de texto com máscara)
#   - Opção 2: Continuar sem cadastro
#   - Se CPF encontrado: saudação personalizada com nível de fidelidade
#   - Se CPF não encontrado: oferecer cadastro
#
# ══════════════════════════════════════════════════════════════

def carregar_clientes():
    """Carrega todos os clientes do CSV."""
    clientes = {}
    try:
        with open(CLIENTES_CSV, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Indexa por CPF para busca rápida
                cpf_limpo = row["cpf"].replace(".", "").replace("-", "")
                clientes[cpf_limpo] = {
                    "id": row["cliente_id"],
                    "nome": row["nome"],
                    "cpf": row["cpf"],
                    "nivel": row["nivel_fidelidade"],
                    "visitas": int(row["total_visitas"]),
                    "gasto_total": float(row["gasto_total"]),
                    "item_favorito": row["item_favorito"],
                    "tacos_gratis": int(row["tacos_gratis_disponiveis"]),
                    "ultimo_pedido": row["ultimo_pedido"],
                }
    except FileNotFoundError:
        print(f"AVISO: arquivo {CLIENTES_CSV} nao encontrado.")
    return clientes


def buscar_cliente_por_cpf(cpf_digitado, clientes):
    """Busca cliente pelo CPF digitado."""
    cpf_limpo = cpf_digitado.replace(".", "").replace("-", "").replace(" ", "")
    return clientes.get(cpf_limpo, None)


def tela_cpf(cliente=None):
    """
    Retorna dados para a tela de CPF.
    Se cliente encontrado, retorna saudação personalizada.
    """

    if cliente:
        # Cliente encontrado — saudação personalizada
        badges_nivel = {
            "Novo":        {"cor": CORES["laranja"],      "emoji": "🌮"},
            "Libre":       {"cor": CORES["verde_medio"],  "emoji": "⭐"},
            "Libre Gold":  {"cor": CORES["amarelo"],      "emoji": "🏆"},
        }
        badge = badges_nivel.get(cliente["nivel"], badges_nivel["Novo"])

        mensagem_taco = ""
        if cliente["tacos_gratis"] > 0:
            mensagem_taco = f"Voce tem {cliente['tacos_gratis']} taco(s) gratis disponivel!"

        return {
            "tela": "cpf_encontrado",
            "cliente_encontrado": True,
            "nome": cliente["nome"].split()[0],   # primeiro nome
            "nivel": cliente["nivel"],
            "badge_cor": badge["cor"],
            "badge_emoji": badge["emoji"],
            "visitas": cliente["visitas"],
            "item_favorito": cliente["item_favorito"],
            "mensagem_taco_gratis": mensagem_taco,
            "saudacao": f"Ola, {cliente['nome'].split()[0]}!",
            "subtexto": f"Visita numero {cliente['visitas'] + 1} · Nivel {cliente['nivel']}",
        }
    else:
        # Cliente não encontrado ou sem CPF
        return {
            "tela": "cpf_nao_encontrado",
            "cliente_encontrado": False,
            "opcoes": [
                {"id": "cadastrar", "texto": "Quero me cadastrar", "cor": CORES["amarelo"]},
                {"id": "continuar", "texto": "Continuar sem cadastro", "cor": CORES["creme"]},
            ],
            "pergunta": "Quer se identificar?",
            "beneficio": "Acumule visitas e ganhe tacos gratis!",
        }


# ══════════════════════════════════════════════════════════════
# TELA 3 — CARDÁPIO
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Abas por categoria: Tacos / Quesadillas / Burritos / Nachos / Bebidas
#   - Cards dos itens com nome, descrição e preço
#   - Botão + para adicionar
#   - Contador de itens no canto superior direito
#   - Barra inferior com total e botão "Ver Pedido"
#
# ══════════════════════════════════════════════════════════════

def carregar_cardapio():
    """Carrega o cardápio do CSV e organiza por categoria."""
    categorias = {}
    try:
        with open(CARDAPIO_CSV, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                cat = row["categoria"]
                if cat not in categorias:
                    categorias[cat] = []
                categorias[cat].append({
                    "id": row["id"],
                    "nome": row["nome"],
                    "descricao": row["descricao"],
                    "preco": float(row["preco"]),
                    "preco_formatado": f"R$ {float(row['preco']):.2f}",
                })
    except FileNotFoundError:
        print(f"AVISO: arquivo {CARDAPIO_CSV} nao encontrado.")
    return categorias


def tela_cardapio(cardapio, item_favorito=None):
    """
    Retorna dados para a tela do cardápio.
    Se item_favorito informado, destaca o item do cliente.
    """

    # Ordem das abas
    ordem_categorias = ["Tacos", "Quesadillas", "Burritos", "Nachos", "Extras", "Bebidas"]
    abas = [cat for cat in ordem_categorias if cat in cardapio]

    # Destaque para item favorito do cliente
    destaques = []
    if item_favorito:
        destaques.append(item_favorito)

    return {
        "tela": "cardapio",
        "abas": abas,
        "itens_por_categoria": cardapio,
        "item_favorito_cliente": item_favorito,
        "destaques": destaques,
        "cor_aba_ativa": CORES["amarelo"],
        "cor_aba_inativa": CORES["verde_medio"],
        "cor_botao_adicionar": CORES["amarelo"],
        "cor_fundo": CORES["preto"],
        "cor_card": CORES["verde_escuro"],
        "texto_vazio": "Selecione os itens que voce quer pedir",
        "botao_ver_pedido": "Ver Pedido",
    }


# ══════════════════════════════════════════════════════════════
# TELA 4 — RESUMO DO PEDIDO
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Lista dos itens com quantidade, nome e preço
#   - Campo para digitar cupom de desconto
#   - Seleção: comer no local / viagem
#   - Subtotal, desconto e total
#   - Botão "Finalizar Pedido"
#
# ══════════════════════════════════════════════════════════════

def calcular_pedido(itens_selecionados, cupom=None, cliente=None):
    """
    Calcula o total do pedido com desconto.

    itens_selecionados: lista de dicts com {id, nome, preco, quantidade}
    cupom: string do cupom digitado (ex: "NACHO15")
    cliente: dict do cliente (para verificar taco grátis)
    """

    subtotal = sum(item["preco"] * item["quantidade"] for item in itens_selecionados)
    desconto = 0
    desconto_descricao = ""
    cupom_valido = False

    # Verifica cupom
    if cupom and cupom.upper() in CUPONS_VALIDOS:
        cupom_info = CUPONS_VALIDOS[cupom.upper()]
        cupom_valido = True

        if "desconto_pct" in cupom_info:
            desconto = round(subtotal * cupom_info["desconto_pct"] / 100, 2)
            desconto_descricao = f"{cupom_info['desconto_pct']}% de desconto aplicado"
        elif cupom_info.get("desconto_fixo"):
            desconto = max(0, subtotal - cupom_info["valor_fixo"])
            desconto_descricao = f"Combo especial — R$ {cupom_info['valor_fixo']:.2f}"

    # Verifica taco grátis
    taco_gratis_aplicado = False
    if cliente and cliente.get("tacos_gratis", 0) > 0:
        taco_gratis_aplicado = True
        # Desconta o item mais barato (simplificado)
        precos = sorted([i["preco"] for i in itens_selecionados])
        if precos:
            desconto += precos[0]
            desconto_descricao += " + 1 taco gratis!"

    total = max(0, round(subtotal - desconto, 2))

    return {
        "tela": "resumo_pedido",
        "itens": itens_selecionados,
        "subtotal": subtotal,
        "subtotal_formatado": f"R$ {subtotal:.2f}",
        "desconto": desconto,
        "desconto_formatado": f"- R$ {desconto:.2f}" if desconto > 0 else "",
        "desconto_descricao": desconto_descricao,
        "total": total,
        "total_formatado": f"R$ {total:.2f}",
        "cupom_valido": cupom_valido,
        "cupom_invalido": cupom is not None and not cupom_valido,
        "taco_gratis_aplicado": taco_gratis_aplicado,
        "opcoes_local": [
            {"id": "local",   "texto": "Comer aqui",  "emoji": "🪑"},
            {"id": "viagem",  "texto": "Para viagem", "emoji": "🛍️"},
        ],
        "placeholder_cupom": "Digite seu cupom (ex: NACHO15)",
        "cor_total": CORES["amarelo"],
        "cor_desconto": "#4ade80",   # verde claro para indicar economia
    }


# ══════════════════════════════════════════════════════════════
# TELA 5 — PAGAMENTO
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Título: "Como vai pagar?"
#   - 3 opções: PIX / Débito / Crédito
#   - Se PIX: QR Code simulado + valor + aguardando pagamento
#   - Se Débito/Crédito: tela de bandeira + instrução de inserir cartão
#   - Upsell de cerveja artesanal durante espera do PIX
#
# ══════════════════════════════════════════════════════════════

def tela_pagamento(total):
    """Retorna dados para a tela de pagamento."""

    formas_pagamento = [
        {
            "id": "pix",
            "titulo": "PIX",
            "subtitulo": "Instantaneo e sem taxas",
            "badge": "Recomendado",
            "badge_cor": CORES["amarelo"],
            "emoji": "◎",
        },
        {
            "id": "debito",
            "titulo": "Debito",
            "subtitulo": "Visa · Master · Elo · Hipercard",
            "emoji": "💳",
        },
        {
            "id": "credito",
            "titulo": "Credito",
            "subtitulo": "Visa · Master · Elo · Amex",
            "emoji": "💳",
        },
    ]

    # Upsell — cerveja durante espera do PIX
    upsell = {
        "ativo": True,
        "titulo": "Enquanto aguarda...",
        "texto": "Adicione uma Cerveja Artesanal por +R$ 18?",
        "emoji": "🍺",
        "preco": 18.00,
        "opcao_sim": "✓ SIM!",
        "opcao_nao": "✗ NAO",
    }

    return {
        "tela": "pagamento",
        "total": total,
        "total_formatado": f"R$ {total:.2f}",
        "formas_pagamento": formas_pagamento,
        "pix": {
            "qr_code": "QR_CODE_SIMULADO",   # ← COLOQUE A IMAGEM DO QR CODE PIX AQUI
            "chave": "nacho@nacholibre.com.br",
            "instrucao": "Abra o app do seu banco e escaneie",
            "status": "AGUARDANDO PAGAMENTO...",
        },
        "cartao": {
            "bandeiras_debito": ["VISA", "ELO", "HIPERCARD", "AMEX", "CABAL"],
            "instrucao": "Use a maquininha abaixo do totem",
            "status": "AGUARDANDO CARTAO",
            "instrucao_nfc": "INSIRA OU APROXIME",
        },
        "upsell": upsell,
        "cor_fundo": CORES["preto"],
        "cor_botao": CORES["amarelo"],
    }


# ══════════════════════════════════════════════════════════════
# TELA 6 — CONFIRMAÇÃO DO PEDIDO
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Emoji grande de taco 🌮
#   - "Pedido Confirmado!"
#   - Número do pedido (P + 4 dígitos)
#   - Tempo estimado de preparo
#   - Forma de pagamento usada
#   - QR codes de redes sociais na parte inferior
#
# ══════════════════════════════════════════════════════════════

def tela_confirmacao(total, forma_pagamento, itens):
    """Retorna dados para a tela de confirmação do pedido."""

    # Gera número do pedido
    numero_pedido = f"P{random.randint(1000, 9999)}"

    # Calcula tempo estimado baseado na quantidade de itens
    tempo_base = 8
    tempo_extra = len(itens) * 2
    tempo_estimado = min(tempo_base + tempo_extra, 20)

    # Hora prevista de retirada
    agora = datetime.now()
    hora_retirada = agora.replace(
        minute=(agora.minute + tempo_estimado) % 60,
        hour=agora.hour + (agora.minute + tempo_estimado) // 60
    )

    redes_sociais = [
        {
            "nome": "Instagram",
            "handle": "@lostacosdonacho",
            "qr": QR_INSTAGRAM,              # ← COLOQUE O QR CODE DO INSTAGRAM AQUI
            "cor": "#E1306C",
        },
        {
            "nome": "WhatsApp",
            "handle": "(31) 9000-0000",
            "qr": QR_WHATSAPP,               # ← COLOQUE O QR CODE DO WHATSAPP AQUI
            "cor": "#25D366",
        },
    ]

    return {
        "tela": "confirmacao",
        "emoji": "🌮",
        "titulo": "Pedido Confirmado!",
        "numero_pedido": numero_pedido,
        "tempo_estimado": f"{tempo_estimado} minutos",
        "hora_retirada": hora_retirada.strftime("%H:%M"),
        "forma_pagamento": forma_pagamento,
        "total_formatado": f"R$ {total:.2f}",
        "itens_resumo": [f"{i['quantidade']}x {i['nome']}" for i in itens],
        "mensagem": "Seu pedido ja foi para a cozinha!",
        "slogan": MARCA["slogan"],
        "redes_sociais": redes_sociais,
        "cor_fundo": CORES["verde_escuro"],
        "cor_numero": CORES["amarelo"],
        "cor_titulo": CORES["creme"],
    }


# ══════════════════════════════════════════════════════════════
# FLUXO COMPLETO — SIMULAÇÃO
# ══════════════════════════════════════════════════════════════
# Esta função simula o fluxo completo do cliente no totem.
# Use para testar e para mostrar ao Lovable como as telas se conectam.
# ══════════════════════════════════════════════════════════════

def simular_fluxo_completo():
    """Simula um pedido completo do início ao fim."""

    print("\n" + "═"*60)
    print("  LOS TACOS — Simulacao do Fluxo do Cliente")
    print("  Make Coentro Great Again")
    print("═"*60)

    # Carrega dados
    clientes = carregar_clientes()
    cardapio = carregar_cardapio()

    # TELA 1 — Inicial
    print("\n[TELA 1] Tela Inicial")
    t1 = tela_inicial()
    print(f"  Fundo: {t1['fundo']}")
    print(f"  Logo: {t1['logo']}")
    print(f"  Ticker: {' · '.join(t1['ticker'][:3])}...")

    # TELA 2 — CPF
    print("\n[TELA 2] Identificacao do Cliente")
    cpf_teste = list(clientes.keys())[0] if clientes else None
    cliente = buscar_cliente_por_cpf(cpf_teste, clientes) if cpf_teste else None
    t2 = tela_cpf(cliente)
    if cliente:
        print(f"  Cliente: {t2['saudacao']}")
        print(f"  Nivel: {t2['nivel']}")
        if t2['mensagem_taco_gratis']:
            print(f"  {t2['mensagem_taco_gratis']}")
    else:
        print("  Cliente nao identificado — modo anonimo")

    # TELA 3 — Cardápio
    print("\n[TELA 3] Cardapio")
    t3 = tela_cardapio(cardapio, item_favorito=cliente["item_favorito"] if cliente else None)
    for cat, itens in cardapio.items():
        print(f"  {cat}: {len(itens)} itens")

    # TELA 4 — Pedido simulado
    print("\n[TELA 4] Resumo do Pedido")
    itens_simulados = []
    for cat, itens in cardapio.items():
        if itens and cat in ["Tacos", "Bebidas"]:
            item = itens[0]
            itens_simulados.append({
                "id": item["id"],
                "nome": item["nome"],
                "preco": item["preco"],
                "quantidade": 1,
            })
    t4 = calcular_pedido(itens_simulados, cupom="NACHO15", cliente=cliente)
    print(f"  Itens: {len(t4['itens'])}")
    print(f"  Subtotal: {t4['subtotal_formatado']}")
    print(f"  Desconto: {t4['desconto_formatado']}")
    print(f"  Total: {t4['total_formatado']}")

    # TELA 5 — Pagamento
    print("\n[TELA 5] Pagamento")
    t5 = tela_pagamento(t4["total"])
    print(f"  Formas disponiveis: {[f['titulo'] for f in t5['formas_pagamento']]}")
    print(f"  Upsell cerveja: {t5['upsell']['texto']}")

    # TELA 6 — Confirmação
    print("\n[TELA 6] Confirmacao")
    t6 = tela_confirmacao(t4["total"], "PIX", t4["itens"])
    print(f"  Pedido: {t6['numero_pedido']}")
    print(f"  Tempo estimado: {t6['tempo_estimado']}")
    print(f"  Retirada: {t6['hora_retirada']}")

    print("\n" + "═"*60)
    print("  Fluxo completo simulado com sucesso!")
    print("  Passe este script para o Lovable para montar o design.")
    print("═"*60 + "\n")

    return {
        "tela_inicial": t1,
        "tela_cpf": t2,
        "tela_cardapio": t3,
        "tela_pedido": t4,
        "tela_pagamento": t5,
        "tela_confirmacao": t6,
    }


# ══════════════════════════════════════════════════════════════
# RODAR O SCRIPT
# ══════════════════════════════════════════════════════════════

if __name__ == "__main__":
    simular_fluxo_completo()
