# ═══════════════════════════════════════════════════════════════
# LOS TACOS — SCRIPT 2: DASHBOARD DA GERÊNCIA
# Make Coentro Great Again
# ═══════════════════════════════════════════════════════════════
#
# Este script contém toda a lógica do dashboard da gerência.
# Passe este arquivo para o Lovable junto com os CSVs
# para ele montar o design em cima desta estrutura.
#
# ARQUIVOS NECESSÁRIOS (coloque na mesma pasta que este script):
#   - cardapio-los-tacos.csv
#   - pedidos_mock.csv
#   - clientes_mock.csv
#   - financeiro_mock.csv
#   - logo_lostacos.png        ← sua logo aqui
#   - nacho_avatar.png         ← foto do Nacho (opcional)
#
# ═══════════════════════════════════════════════════════════════

import csv
from datetime import datetime, date

# ══════════════════════════════════════════════════════════════
# CONFIGURAÇÕES DA MARCA
# ══════════════════════════════════════════════════════════════

MARCA = {
    "nome": "Los Tacos",
    "slogan": "Make Coentro Great Again",
    "personagem": "Nacho Libre",
    "local": "Mercado Novo · Belo Horizonte",
    "instagram": "@lostacosdonacho",
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
    "verde_claro":   "#4ade80",
    "vermelho":      "#ef4444",
}

TIPOGRAFIA = {
    "titulo":  "Bebas Neue",
    "label":   "Barlow Condensed",
    "corpo":   "Barlow",
}

# ══════════════════════════════════════════════════════════════
# CAMINHOS DOS ARQUIVOS
# ══════════════════════════════════════════════════════════════

# ↓ COLOQUE O CAMINHO DO SEU CSV DE CARDÁPIO AQUI
CARDAPIO_CSV = "cardapio-los-tacos.csv"

# ↓ COLOQUE O CAMINHO DO SEU CSV DE PEDIDOS AQUI
PEDIDOS_CSV = "pedidos_mock.csv"

# ↓ COLOQUE O CAMINHO DO SEU CSV DE CLIENTES AQUI
CLIENTES_CSV = "clientes_mock.csv"

# ↓ COLOQUE O CAMINHO DO SEU CSV FINANCEIRO AQUI
FINANCEIRO_CSV = "financeiro_mock.csv"

# ↓ COLOQUE O CAMINHO DA LOGO AQUI
LOGO = "logo_lostacos.png"

# ↓ COLOQUE O CAMINHO DA FOTO DO NACHO AQUI (opcional)
FOTO_NACHO = "nacho_avatar.png"

# ↓ DATA DE HOJE PARA O DASHBOARD (simulada)
HOJE = "2026-06-13"


# ══════════════════════════════════════════════════════════════
# FUNÇÕES DE LEITURA DOS CSVs
# ══════════════════════════════════════════════════════════════

def ler_csv(caminho):
    """Lê qualquer CSV e retorna lista de dicionários."""
    try:
        with open(caminho, "r", encoding="utf-8") as f:
            return list(csv.DictReader(f))
    except FileNotFoundError:
        print(f"AVISO: arquivo {caminho} nao encontrado.")
        return []


# ══════════════════════════════════════════════════════════════
# LOGIN DA GERÊNCIA
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Logo Los Tacos centralizada
#   - Campo email + senha
#   - Botão entrar em amarelo
#   - Rodapé: Make Coentro Great Again
#
# ══════════════════════════════════════════════════════════════

CREDENCIAIS = {
    "email": "nacho@nacholibre.com.br",
    "senha": "lostacos2026",
    "nome": "Nacho Libre",
    "cargo": "Fundador & Chef",
}

def tela_login():
    """Retorna dados para a tela de login."""
    return {
        "tela": "login",
        "logo": LOGO,                    # ← arquivo da logo
        "foto_nacho": FOTO_NACHO,        # ← foto do Nacho (opcional)
        "titulo": "Área da Gerência",
        "subtitulo": MARCA["local"],
        "placeholder_email": "seu@email.com",
        "placeholder_senha": "sua senha",
        "botao": "ENTRAR",
        "cor_botao": CORES["amarelo"],
        "cor_fundo": CORES["verde_escuro"],
        "slogan": MARCA["slogan"],
        "credenciais_teste": {
            "email": CREDENCIAIS["email"],
            "senha": CREDENCIAIS["senha"],
        },
    }

def verificar_login(email, senha):
    """Verifica se email e senha são válidos."""
    return (
        email.strip().lower() == CREDENCIAIS["email"].lower()
        and senha == CREDENCIAIS["senha"]
    )


# ══════════════════════════════════════════════════════════════
# ABA 1 — VISÃO GERAL
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Saudação: "Ola, Nacho!" + resumo do dia
#   - 4 cards de KPI: receita / pedidos / ticket médio / melhor dia
#   - Gráfico de linha: receita por dia (13 dias)
#   - Gráfico de pizza: pedidos por canal
#   - Gráfico de barras: vendas por turno
#   - Destaque: dias de pico (sexta e sábado)
#
# ══════════════════════════════════════════════════════════════

def aba_visao_geral():
    """Retorna todos os dados para a aba de visão geral."""

    pedidos = ler_csv(PEDIDOS_CSV)
    financeiro = ler_csv(FINANCEIRO_CSV)

    pedidos_finalizados = [p for p in pedidos if p["status"] == "finalizado"]

    # ── KPIs gerais ──
    receita_total = sum(float(f["receita_bruta"]) for f in financeiro)
    total_pedidos = sum(int(f["pedidos_finalizados"]) for f in financeiro)
    ticket_medio_geral = receita_total / total_pedidos if total_pedidos > 0 else 0
    cancelamentos_total = sum(int(f["cancelamentos"]) for f in financeiro)

    # Melhor dia
    melhor_dia = max(financeiro, key=lambda f: float(f["receita_bruta"]))

    # ── Gráfico de linha — receita por dia ──
    grafico_receita = [
        {
            "data": f["data"],
            "dia_semana": f["dia_semana"],
            "receita_bruta": float(f["receita_bruta"]),
            "receita_liquida": float(f["receita_liquida"]),
            "pedidos": int(f["pedidos_finalizados"]),
        }
        for f in financeiro
    ]

    # ── Gráfico de pizza — pedidos por canal ──
    canais = {}
    for p in pedidos_finalizados:
        c = p["canal"]
        canais[c] = canais.get(c, 0) + 1

    grafico_canais = [
        {"canal": canal, "quantidade": qtd, "percentual": round(qtd / len(pedidos_finalizados) * 100, 1)}
        for canal, qtd in sorted(canais.items(), key=lambda x: -x[1])
    ]

    # ── Gráfico de barras — vendas por turno ──
    turnos = {"almoco": 0, "tarde": 0, "jantar": 0}
    receita_turno = {"almoco": 0.0, "tarde": 0.0, "jantar": 0.0}
    for p in pedidos_finalizados:
        t = p["turno"]
        if t in turnos:
            turnos[t] += 1
            receita_turno[t] += float(p["total"])

    grafico_turnos = [
        {
            "turno": t.capitalize(),
            "pedidos": turnos[t],
            "receita": round(receita_turno[t], 2),
        }
        for t in ["almoco", "tarde", "jantar"]
    ]

    # ── Dias de pico ──
    dias_pico = sorted(financeiro, key=lambda f: float(f["receita_bruta"]), reverse=True)[:3]

    # ── Resumo do dia de hoje ──
    financeiro_hoje = next((f for f in financeiro if f["data"] == HOJE), None)
    pedidos_hoje = [p for p in pedidos_finalizados if p["data"] == HOJE]

    resumo_hoje = {}
    if financeiro_hoje:
        resumo_hoje = {
            "receita": float(financeiro_hoje["receita_bruta"]),
            "receita_formatada": f"R$ {float(financeiro_hoje['receita_bruta']):,.2f}",
            "pedidos": int(financeiro_hoje["pedidos_finalizados"]),
            "ticket_medio": float(financeiro_hoje["ticket_medio"]),
            "ticket_formatado": f"R$ {float(financeiro_hoje['ticket_medio']):.2f}",
            "item_mais_vendido": financeiro_hoje["item_mais_vendido"],
        }

    return {
        "tela": "visao_geral",
        "saudacao": f"Ola, {CREDENCIAIS['nome'].split()[0]}!",
        "cargo": CREDENCIAIS["cargo"],
        "foto_nacho": FOTO_NACHO,
        "data_hoje": HOJE,
        "resumo_hoje": resumo_hoje,
        "kpis": {
            "receita_total": receita_total,
            "receita_formatada": f"R$ {receita_total:,.2f}",
            "total_pedidos": total_pedidos,
            "ticket_medio": round(ticket_medio_geral, 2),
            "ticket_formatado": f"R$ {ticket_medio_geral:.2f}",
            "cancelamentos": cancelamentos_total,
            "melhor_dia": melhor_dia["dia_semana"].capitalize(),
            "receita_melhor_dia": f"R$ {float(melhor_dia['receita_bruta']):,.2f}",
        },
        "grafico_receita": grafico_receita,
        "grafico_canais": grafico_canais,
        "grafico_turnos": grafico_turnos,
        "dias_pico": [
            {
                "data": d["data"],
                "dia": d["dia_semana"].capitalize(),
                "receita": f"R$ {float(d['receita_bruta']):,.2f}",
            }
            for d in dias_pico
        ],
        "cores_grafico": {
            "receita_bruta": CORES["amarelo"],
            "receita_liquida": CORES["verde_medio"],
            "totem": CORES["amarelo"],
            "balcao": CORES["laranja"],
            "ifood": CORES["verde_medio"],
            "rappi": "#ff6b00",
            "almoco": CORES["verde_medio"],
            "tarde": CORES["laranja"],
            "jantar": CORES["amarelo"],
        },
    }


# ══════════════════════════════════════════════════════════════
# ABA 2 — PAINEL DA COZINHA
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - 3 colunas: Novos / Em andamento / Prontos
#   - Cards de pedido com itens, canal, horário
#   - Filtros por turno e canal
#   - KPIs do dia no topo
#
# ══════════════════════════════════════════════════════════════

def aba_cozinha(filtro_data=HOJE, filtro_turno=None, filtro_canal=None):
    """Retorna dados para o painel da cozinha."""

    pedidos = ler_csv(PEDIDOS_CSV)

    # Filtra pedidos do dia
    pedidos_dia = [p for p in pedidos if p["data"] == filtro_data]
    if filtro_turno:
        pedidos_dia = [p for p in pedidos_dia if p["turno"] == filtro_turno]
    if filtro_canal:
        pedidos_dia = [p for p in pedidos_dia if p["canal"] == filtro_canal]

    # Distribui nas colunas (simulado: status do CSV)
    novos       = [p for p in pedidos_dia if p["status"] == "finalizado"][:5]
    andamento   = [p for p in pedidos_dia if p["status"] == "finalizado"][5:10]
    prontos     = [p for p in pedidos_dia if p["status"] == "finalizado"][10:15]
    cancelados  = [p for p in pedidos_dia if p["status"] == "cancelado"]

    def formatar_card(p):
        return {
            "pedido_id": p["pedido_id"],
            "horario": p["horario"],
            "cliente": p["cliente_nome"].split()[0],
            "itens": p["itens"].split(" | "),
            "canal": p["canal"],
            "canal_cor": {
                "totem":   CORES["amarelo"],
                "balcao":  CORES["laranja"],
                "ifood":   CORES["verde_medio"],
                "rappi":   "#ff6b00",
            }.get(p["canal"], CORES["creme"]),
            "local_entrega": p["local_ou_entrega"],
            "tempo_preparo": p["tempo_preparo_min"] + " min",
            "total": f"R$ {float(p['total']):.2f}",
        }

    # KPIs do dia
    finalizados = [p for p in pedidos if p["data"] == filtro_data and p["status"] == "finalizado"]
    receita_dia = sum(float(p["total"]) for p in finalizados)
    tempo_medio = sum(int(p["tempo_preparo_min"]) for p in finalizados) / len(finalizados) if finalizados else 0

    return {
        "tela": "cozinha",
        "data": filtro_data,
        "kpis_dia": {
            "total_pedidos": len(finalizados),
            "em_andamento": len(andamento),
            "receita_dia": f"R$ {receita_dia:,.2f}",
            "tempo_medio": f"{tempo_medio:.0f} min",
            "cancelamentos": len(cancelados),
        },
        "colunas": {
            "novos": {
                "titulo": "NOVOS",
                "cor_fundo": "#fef2f2",
                "cor_badge": CORES["vermelho"],
                "pedidos": [formatar_card(p) for p in novos],
            },
            "andamento": {
                "titulo": "EM ANDAMENTO",
                "cor_fundo": "#fefce8",
                "cor_badge": CORES["amarelo"],
                "pedidos": [formatar_card(p) for p in andamento],
            },
            "prontos": {
                "titulo": "PRONTOS",
                "cor_fundo": "#f0fdf4",
                "cor_badge": CORES["verde_claro"],
                "pedidos": [formatar_card(p) for p in prontos],
            },
        },
        "filtros": {
            "turnos": ["almoco", "tarde", "jantar"],
            "canais": ["totem", "balcao", "ifood", "rappi"],
            "turno_ativo": filtro_turno or "todos",
            "canal_ativo": filtro_canal or "todos",
        },
    }


# ══════════════════════════════════════════════════════════════
# ABA 3 — CLIENTES E FIDELIDADE
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Cards de resumo: total / Novos / Libre / Libre Gold
#   - Tabela com todos os clientes
#   - Destaque para clientes com taco grátis
#   - Filtro por nível de fidelidade
#
# ══════════════════════════════════════════════════════════════

def aba_clientes(filtro_nivel=None):
    """Retorna dados para a aba de clientes."""

    clientes = ler_csv(CLIENTES_CSV)

    # Filtra por nível se solicitado
    clientes_filtrados = clientes
    if filtro_nivel:
        clientes_filtrados = [c for c in clientes if c["nivel_fidelidade"] == filtro_nivel]

    # Distribuição por nível
    niveis = {"Novo": 0, "Libre": 0, "Libre Gold": 0}
    for c in clientes:
        n = c["nivel_fidelidade"]
        if n in niveis:
            niveis[n] += 1

    # Clientes com taco grátis disponível
    com_taco_gratis = [c for c in clientes if int(c["tacos_gratis_disponiveis"]) > 0]

    # Top clientes por gasto
    top_clientes = sorted(clientes, key=lambda c: float(c["gasto_total"]), reverse=True)[:5]

    # Formata tabela
    def formatar_cliente(c):
        nivel_config = {
            "Novo":       {"cor": CORES["laranja"],     "emoji": "🌮"},
            "Libre":      {"cor": CORES["verde_medio"], "emoji": "⭐"},
            "Libre Gold": {"cor": CORES["amarelo"],     "emoji": "🏆"},
        }
        config = nivel_config.get(c["nivel_fidelidade"], nivel_config["Novo"])
        return {
            "id": c["cliente_id"],
            "nome": c["nome"],
            "nivel": c["nivel_fidelidade"],
            "nivel_cor": config["cor"],
            "nivel_emoji": config["emoji"],
            "visitas": int(c["total_visitas"]),
            "gasto_total": f"R$ {float(c['gasto_total']):.2f}",
            "ultimo_pedido": c["ultimo_pedido"],
            "item_favorito": c["item_favorito"],
            "tacos_gratis": int(c["tacos_gratis_disponiveis"]),
            "destaque_taco": int(c["tacos_gratis_disponiveis"]) > 0,
            "canal_preferido": c["canal_preferido"],
        }

    return {
        "tela": "clientes",
        "resumo": {
            "total": len(clientes),
            "novos": niveis["Novo"],
            "libres": niveis["Libre"],
            "libres_gold": niveis["Libre Gold"],
            "com_taco_gratis": len(com_taco_gratis),
        },
        "tabela": [formatar_cliente(c) for c in clientes_filtrados],
        "top_clientes": [formatar_cliente(c) for c in top_clientes],
        "clientes_taco_gratis": [formatar_cliente(c) for c in com_taco_gratis],
        "filtros_nivel": ["Todos", "Novo", "Libre", "Libre Gold"],
        "filtro_ativo": filtro_nivel or "Todos",
        "cores_nivel": {
            "Novo":       CORES["laranja"],
            "Libre":      CORES["verde_medio"],
            "Libre Gold": CORES["amarelo"],
        },
    }


# ══════════════════════════════════════════════════════════════
# ABA 4 — CARDÁPIO E CMV
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Tabela com todos os 22 itens
#   - CMV calculado automaticamente (custo / preço * 100)
#   - Destaque vermelho para CMV acima de 40%
#   - Gráfico de preço médio por categoria
#   - Botão editar custo de cada item
#
# ══════════════════════════════════════════════════════════════

# CMV alvo por categoria (% do preço de venda)
CMV_ALVO = {
    "Tacos":       0.32,
    "Quesadillas": 0.35,
    "Burritos":    0.33,
    "Nachos":      0.28,
    "Extras":      0.25,
    "Bebidas":     0.22,
}
CMV_ALERTA = 0.40   # acima de 40% acende alerta vermelho

def aba_cardapio_cmv():
    """Retorna dados para a aba de cardápio e CMV."""

    cardapio = ler_csv(CARDAPIO_CSV)
    pedidos = ler_csv(PEDIDOS_CSV)

    pedidos_finalizados = [p for p in pedidos if p["status"] == "finalizado"]

    # Conta vendas por item
    vendas_por_item = {}
    for p in pedidos_finalizados:
        for item_nome in p["itens"].split(" | "):
            item_nome = item_nome.strip()
            vendas_por_item[item_nome] = vendas_por_item.get(item_nome, 0) + 1

    # Monta tabela com CMV
    tabela = []
    for item in cardapio:
        preco = float(item["preco"])
        cat = item["categoria"]
        cmv_pct = CMV_ALVO.get(cat, 0.35)
        custo = round(preco * cmv_pct, 2)
        cmv_valor = round(custo / preco * 100, 1)
        vendas = vendas_por_item.get(item["nome"], 0)
        receita_item = round(preco * vendas, 2)

        tabela.append({
            "id": item["id"],
            "nome": item["nome"],
            "categoria": cat,
            "preco": preco,
            "preco_formatado": f"R$ {preco:.2f}",
            "custo_producao": custo,
            "custo_formatado": f"R$ {custo:.2f}",
            "cmv_percentual": cmv_valor,
            "cmv_formatado": f"{cmv_valor}%",
            "cmv_alerta": cmv_valor > CMV_ALERTA * 100,
            "cmv_cor": CORES["vermelho"] if cmv_valor > CMV_ALERTA * 100 else CORES["verde_claro"],
            "vendas_periodo": vendas,
            "receita_periodo": f"R$ {receita_item:.2f}",
            "margem": f"{100 - cmv_valor:.1f}%",
        })

    # Ordena por CMV (maior primeiro para identificar problemas)
    tabela_ordenada = sorted(tabela, key=lambda x: -x["cmv_percentual"])

    # Preço médio por categoria
    categorias_resumo = {}
    for item in tabela:
        cat = item["categoria"]
        if cat not in categorias_resumo:
            categorias_resumo[cat] = {"itens": 0, "preco_total": 0, "vendas_total": 0}
        categorias_resumo[cat]["itens"] += 1
        categorias_resumo[cat]["preco_total"] += item["preco"]
        categorias_resumo[cat]["vendas_total"] += item["vendas_periodo"]

    grafico_categorias = [
        {
            "categoria": cat,
            "preco_medio": round(v["preco_total"] / v["itens"], 2),
            "total_vendas": v["vendas_total"],
            "qtd_itens": v["itens"],
        }
        for cat, v in categorias_resumo.items()
    ]

    # Item mais vendido e mais rentável
    mais_vendido = max(tabela, key=lambda x: x["vendas_periodo"])
    mais_rentavel = max(tabela, key=lambda x: float(x["margem"].replace("%", "")))
    precisa_atencao = [i for i in tabela if i["cmv_alerta"]]

    return {
        "tela": "cardapio_cmv",
        "tabela": tabela_ordenada,
        "total_itens": len(tabela),
        "grafico_categorias": grafico_categorias,
        "destaques": {
            "mais_vendido": mais_vendido["nome"],
            "mais_vendido_qtd": mais_vendido["vendas_periodo"],
            "mais_rentavel": mais_rentavel["nome"],
            "mais_rentavel_margem": mais_rentavel["margem"],
            "itens_alerta_cmv": len(precisa_atencao),
            "nomes_alerta": [i["nome"] for i in precisa_atencao],
        },
        "cmv_medio_geral": round(
            sum(i["cmv_percentual"] for i in tabela) / len(tabela), 1
        ),
        "cmv_alvo": f"{CMV_ALERTA * 100:.0f}%",
        "cores": {
            "cmv_ok":     CORES["verde_claro"],
            "cmv_alerta": CORES["vermelho"],
            "preco":      CORES["amarelo"],
        },
    }


# ══════════════════════════════════════════════════════════════
# ABA 5 — FINANCEIRO
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Receita bruta vs líquida por dia (barras agrupadas)
#   - Total de descontos por cupom
#   - Total de taxas de delivery
#   - Comparativo semana 1 vs semana 2
#   - Projeção do mês
#
# ══════════════════════════════════════════════════════════════

def aba_financeiro():
    """Retorna dados para a aba financeira."""

    financeiro = ler_csv(FINANCEIRO_CSV)
    pedidos = ler_csv(PEDIDOS_CSV)

    pedidos_finalizados = [p for p in pedidos if p["status"] == "finalizado"]

    # ── Totais gerais ──
    receita_bruta_total  = sum(float(f["receita_bruta"]) for f in financeiro)
    receita_liquida_total = sum(float(f["receita_liquida"]) for f in financeiro)
    descontos_total      = sum(float(f["descontos_cupom"]) for f in financeiro)
    taxas_total          = sum(float(f["taxas_delivery"]) for f in financeiro)

    # ── Gráfico barras agrupadas ──
    grafico_diario = [
        {
            "data": f["data"],
            "dia": f["dia_semana"].capitalize(),
            "receita_bruta": float(f["receita_bruta"]),
            "receita_liquida": float(f["receita_liquida"]),
            "descontos": float(f["descontos_cupom"]),
            "taxas": float(f["taxas_delivery"]),
            "pedidos": int(f["pedidos_finalizados"]),
            "ticket_medio": float(f["ticket_medio"]),
        }
        for f in financeiro
    ]

    # ── Cupons utilizados ──
    cupons_usados = {}
    for p in pedidos_finalizados:
        cupom = p.get("cupom", "").strip()
        if cupom:
            if cupom not in cupons_usados:
                cupons_usados[cupom] = {"usos": 0, "desconto_total": 0.0}
            cupons_usados[cupom]["usos"] += 1
            cupons_usados[cupom]["desconto_total"] += float(p["desconto"])

    grafico_cupons = [
        {
            "cupom": cupom,
            "usos": v["usos"],
            "desconto_total": round(v["desconto_total"], 2),
            "desconto_formatado": f"R$ {v['desconto_total']:.2f}",
        }
        for cupom, v in sorted(cupons_usados.items(), key=lambda x: -x[1]["usos"])
    ]

    # ── Semana 1 vs Semana 2 ──
    semana1 = [f for f in financeiro if f["data"] <= "2026-06-07"]
    semana2 = [f for f in financeiro if f["data"] > "2026-06-07"]

    receita_s1 = sum(float(f["receita_bruta"]) for f in semana1)
    receita_s2 = sum(float(f["receita_bruta"]) for f in semana2)
    variacao = round((receita_s2 - receita_s1) / receita_s1 * 100, 1) if receita_s1 > 0 else 0

    # ── Projeção do mês ──
    dias_decorridos = len(financeiro)
    media_diaria = receita_bruta_total / dias_decorridos if dias_decorridos > 0 else 0
    dias_no_mes = 30
    projecao_mes = round(media_diaria * dias_no_mes, 2)

    # ── Receita por canal ──
    receita_canal = {}
    for p in pedidos_finalizados:
        c = p["canal"]
        receita_canal[c] = receita_canal.get(c, 0.0) + float(p["total"])

    grafico_canal = [
        {
            "canal": canal,
            "receita": round(receita, 2),
            "receita_formatada": f"R$ {receita:,.2f}",
            "percentual": round(receita / receita_bruta_total * 100, 1),
        }
        for canal, receita in sorted(receita_canal.items(), key=lambda x: -x[1])
    ]

    return {
        "tela": "financeiro",
        "kpis": {
            "receita_bruta": receita_bruta_total,
            "receita_bruta_formatada": f"R$ {receita_bruta_total:,.2f}",
            "receita_liquida": receita_liquida_total,
            "receita_liquida_formatada": f"R$ {receita_liquida_total:,.2f}",
            "descontos_total": descontos_total,
            "descontos_formatado": f"R$ {descontos_total:,.2f}",
            "taxas_delivery": taxas_total,
            "taxas_formatado": f"R$ {taxas_total:,.2f}",
            "projecao_mes": f"R$ {projecao_mes:,.2f}",
            "media_diaria": f"R$ {media_diaria:,.2f}",
        },
        "grafico_diario": grafico_diario,
        "grafico_cupons": grafico_cupons,
        "grafico_canal": grafico_canal,
        "comparativo_semanas": {
            "semana1": {
                "label": "Semana 1 (1-7 jun)",
                "receita": f"R$ {receita_s1:,.2f}",
                "dias": len(semana1),
            },
            "semana2": {
                "label": "Semana 2 (8-13 jun)",
                "receita": f"R$ {receita_s2:,.2f}",
                "dias": len(semana2),
            },
            "variacao_pct": variacao,
            "variacao_positiva": variacao >= 0,
            "variacao_cor": CORES["verde_claro"] if variacao >= 0 else CORES["vermelho"],
        },
        "cores": {
            "receita_bruta":  CORES["amarelo"],
            "receita_liquida": CORES["verde_medio"],
            "descontos":      CORES["laranja"],
            "taxas":          CORES["vermelho"],
        },
    }


# ══════════════════════════════════════════════════════════════
# ABA 6 — COMUNICAÇÃO E MARKETING
# ══════════════════════════════════════════════════════════════
#
# O QUE MOSTRAR:
#   - Métricas da newsletter
#   - Grade de posts simulados
#   - Programa de fidelidade Libres
#   - Cupons ativos com contagem de uso
#
# ══════════════════════════════════════════════════════════════

def aba_comunicacao():
    """Retorna dados para a aba de comunicação."""

    clientes = ler_csv(CLIENTES_CSV)
    pedidos = ler_csv(PEDIDOS_CSV)

    pedidos_finalizados = [p for p in pedidos if p["status"] == "finalizado"]

    # ── Newsletter ──
    newsletter = {
        "titulo": "Los Tacos — Abrimos as Portas!",
        "data_envio": "2026-06-01",
        "enviados": 847,
        "abertos": 312,
        "cliques": 89,
        "taxa_abertura": "36.8%",
        "taxa_clique": "28.5%",
        "cupom_destaque": "NACHO15",
        "logo": LOGO,             # ← logo na newsletter
    }

    # ── Posts simulados ──
    posts = [
        {
            "id": 1,
            "tipo": "foto",
            "legenda": "Taco Carnitas na chapa. Sem filtro, sem desculpa. Feito aqui todo dia. 🌮",
            "hashtags": "#LosTacos #MakeCoentroGreatAgain #MercadoNovo #BH",
            "curtidas": 847,
            "comentarios": 43,
            "alcance": 3200,
            "cor_placeholder": CORES["verde_escuro"],
        },
        {
            "id": 2,
            "tipo": "reels",
            "legenda": "O boné verde chegou em BH e trouxe tacos. Nacho estava pronto pra um CNPJ. 🧢",
            "hashtags": "#NachoLibre #LosTacos #Inauguracao",
            "curtidas": 1203,
            "comentarios": 87,
            "alcance": 5800,
            "cor_placeholder": CORES["amarelo"],
        },
        {
            "id": 3,
            "tipo": "story",
            "legenda": "NACHO15 — 15% off hoje. Codigo no totem. So hoje. 🔥",
            "hashtags": "#Promo #LosTacos",
            "curtidas": 412,
            "comentarios": 19,
            "alcance": 1900,
            "cor_placeholder": CORES["laranja"],
        },
        {
            "id": 4,
            "tipo": "foto",
            "legenda": "Sexta no Mercado Novo bate diferente. Marguerita + Taco Camarao = fim de semana começou. 🍹",
            "hashtags": "#SextaFeira #MercadoNovoBH #LosTacos",
            "curtidas": 934,
            "comentarios": 56,
            "alcance": 4100,
            "cor_placeholder": CORES["verde_medio"],
        },
        {
            "id": 5,
            "tipo": "carrossel",
            "legenda": "O cardapio completo do Los Tacos. Desliza pra conhecer cada taco. 👉",
            "hashtags": "#Cardapio #LosTacos #TacoLife",
            "curtidas": 678,
            "comentarios": 31,
            "alcance": 2700,
            "cor_placeholder": CORES["preto"],
        },
        {
            "id": 6,
            "tipo": "reels",
            "legenda": "Make Coentro Great Again. Essa e nossa politica. Sem negociacao. 🌿",
            "hashtags": "#Coentro #LosTacos #MakeCoentroGreatAgain",
            "curtidas": 1567,
            "comentarios": 134,
            "alcance": 7300,
            "cor_placeholder": CORES["verde_escuro"],
        },
    ]

    # ── Fidelidade ──
    niveis = {"Novo": 0, "Libre": 0, "Libre Gold": 0}
    for c in clientes:
        n = c["nivel_fidelidade"]
        if n in niveis:
            niveis[n] += 1

    com_taco_gratis = [
        {
            "nome": c["nome"],
            "tacos": int(c["tacos_gratis_disponiveis"]),
            "whatsapp": c["whatsapp"],
            "nivel": c["nivel_fidelidade"],
        }
        for c in clientes if int(c["tacos_gratis_disponiveis"]) > 0
    ]

    # ── Cupons ──
    contagem_cupons = {}
    desconto_cupons = {}
    for p in pedidos_finalizados:
        cupom = p.get("cupom", "").strip()
        if cupom:
            contagem_cupons[cupom] = contagem_cupons.get(cupom, 0) + 1
            desconto_cupons[cupom] = desconto_cupons.get(cupom, 0.0) + float(p["desconto"])

    cupons_ativos = [
        {
            "codigo": "NACHO15",
            "descricao": "15% off no primeiro pedido",
            "usos": contagem_cupons.get("NACHO15", 0),
            "desconto_gerado": f"R$ {desconto_cupons.get('NACHO15', 0):.2f}",
            "validade": "junho/2026",
            "cor": CORES["amarelo"],
            "status": "ativo",
        },
        {
            "codigo": "LIBRE10",
            "descricao": "10% off para clientes Libres",
            "usos": contagem_cupons.get("LIBRE10", 0),
            "desconto_gerado": f"R$ {desconto_cupons.get('LIBRE10', 0):.2f}",
            "validade": "junho/2026",
            "cor": CORES["verde_medio"],
            "status": "ativo",
        },
        {
            "codigo": "COMBO29",
            "descricao": "2 Tacos + Bebida por R$ 29",
            "usos": contagem_cupons.get("COMBO29", 0),
            "desconto_gerado": f"R$ {desconto_cupons.get('COMBO29', 0):.2f}",
            "validade": "junho/2026",
            "cor": CORES["laranja"],
            "status": "ativo",
        },
    ]

    return {
        "tela": "comunicacao",
        "newsletter": newsletter,
        "posts": posts,
        "fidelidade": {
            "total_clientes": len(clientes),
            "novos": niveis["Novo"],
            "libres": niveis["Libre"],
            "libres_gold": niveis["Libre Gold"],
            "com_taco_gratis": com_taco_gratis,
            "total_com_taco": len(com_taco_gratis),
        },
        "cupons": cupons_ativos,
        "total_economizado_clientes": f"R$ {sum(desconto_cupons.values()):.2f}",
        "instagram": MARCA["instagram"],
    }


# ══════════════════════════════════════════════════════════════
# SIMULAÇÃO COMPLETA
# ══════════════════════════════════════════════════════════════

def simular_dashboard_completo():
    """Simula todas as abas do dashboard da gerência."""

    print("\n" + "═"*60)
    print("  LOS TACOS — Dashboard da Gerencia")
    print("  Make Coentro Great Again")
    print("═"*60)

    # Login
    print("\n[LOGIN]")
    login = tela_login()
    print(f"  Usuario: {CREDENCIAIS['email']}")
    ok = verificar_login(CREDENCIAIS["email"], CREDENCIAIS["senha"])
    print(f"  Autenticado: {'Sim' if ok else 'Nao'}")

    # Aba 1 — Visão Geral
    print("\n[ABA 1] Visao Geral")
    vg = aba_visao_geral()
    print(f"  {vg['saudacao']} ({vg['cargo']})")
    print(f"  Receita total: {vg['kpis']['receita_formatada']}")
    print(f"  Total pedidos: {vg['kpis']['total_pedidos']}")
    print(f"  Ticket medio: {vg['kpis']['ticket_formatado']}")
    print(f"  Melhor dia: {vg['kpis']['melhor_dia']} ({vg['kpis']['receita_melhor_dia']})")
    print(f"  Canais: {[c['canal'] for c in vg['grafico_canais']]}")

    # Aba 2 — Cozinha
    print("\n[ABA 2] Cozinha")
    coz = aba_cozinha()
    print(f"  Pedidos hoje: {coz['kpis_dia']['total_pedidos']}")
    print(f"  Receita hoje: {coz['kpis_dia']['receita_dia']}")
    print(f"  Em andamento: {coz['kpis_dia']['em_andamento']}")
    print(f"  Tempo medio: {coz['kpis_dia']['tempo_medio']}")

    # Aba 3 — Clientes
    print("\n[ABA 3] Clientes")
    cli = aba_clientes()
    print(f"  Total clientes: {cli['resumo']['total']}")
    print(f"  Novos: {cli['resumo']['novos']} | Libre: {cli['resumo']['libres']} | Gold: {cli['resumo']['libres_gold']}")
    print(f"  Com taco gratis: {cli['resumo']['com_taco_gratis']}")

    # Aba 4 — Cardápio e CMV
    print("\n[ABA 4] Cardapio e CMV")
    cmv = aba_cardapio_cmv()
    print(f"  Total itens: {cmv['total_itens']}")
    print(f"  CMV medio: {cmv['cmv_medio_geral']}%")
    print(f"  Mais vendido: {cmv['destaques']['mais_vendido']} ({cmv['destaques']['mais_vendido_qtd']} vendas)")
    print(f"  Itens com CMV alto: {cmv['destaques']['itens_alerta_cmv']}")

    # Aba 5 — Financeiro
    print("\n[ABA 5] Financeiro")
    fin = aba_financeiro()
    print(f"  Receita bruta: {fin['kpis']['receita_bruta_formatada']}")
    print(f"  Receita liquida: {fin['kpis']['receita_liquida_formatada']}")
    print(f"  Descontos: {fin['kpis']['descontos_formatado']}")
    print(f"  Taxas delivery: {fin['kpis']['taxas_formatado']}")
    print(f"  Projecao do mes: {fin['kpis']['projecao_mes']}")
    v = fin["comparativo_semanas"]["variacao_pct"]
    print(f"  Variacao sem 1→2: {'+' if v >= 0 else ''}{v}%")

    # Aba 6 — Comunicação
    print("\n[ABA 6] Comunicacao")
    com = aba_comunicacao()
    print(f"  Newsletter: {com['newsletter']['enviados']} enviados / {com['newsletter']['taxa_abertura']} abertura")
    print(f"  Posts: {len(com['posts'])}")
    print(f"  Clientes com taco gratis: {com['fidelidade']['total_com_taco']}")
    print(f"  Total economizado pelos clientes: {com['total_economizado_clientes']}")
    for cupom in com["cupons"]:
        print(f"  {cupom['codigo']}: {cupom['usos']} usos / {cupom['desconto_gerado']} descontados")

    print("\n" + "═"*60)
    print("  Dashboard completo simulado com sucesso!")
    print("  Passe este script para o Lovable para montar o design.")
    print("═"*60 + "\n")


# ══════════════════════════════════════════════════════════════
# RODAR O SCRIPT
# ══════════════════════════════════════════════════════════════

if __name__ == "__main__":
    simular_dashboard_completo()
