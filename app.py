import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# ══════════════════════════════════════════════════════════════
# CONFIGURAÇÃO DA PÁGINA
# ══════════════════════════════════════════════════════════════

st.set_page_config(
    page_title="Los Tacos — Dashboard",
    page_icon="🌮",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ══════════════════════════════════════════════════════════════
# CORES E ESTILO
# ══════════════════════════════════════════════════════════════

VERDE_ESCURO  = "#1b4332"
VERDE_MEDIO   = "#2d6a4f"
AMARELO       = "#f7c948"
LARANJA       = "#e07b39"
CREME         = "#f5f0e8"
PRETO         = "#111111"

st.markdown("""
<style>
    /* Fundo geral */
    .stApp { background-color: #0a1f14; }

    /* Sidebar */
    section[data-testid="stSidebar"] {
        background-color: #1b4332;
    }
    section[data-testid="stSidebar"] * { color: #f5f0e8 !important; }

    /* Títulos */
    h1, h2, h3 { color: #f7c948 !important; font-family: 'Arial Black', sans-serif; }

    /* Cards de métrica */
    div[data-testid="metric-container"] {
        background-color: #1b4332;
        border: 1px solid #2d6a4f;
        border-radius: 8px;
        padding: 12px;
    }
    div[data-testid="metric-container"] label { color: #f5f0e8 !important; }
    div[data-testid="metric-container"] div[data-testid="stMetricValue"] {
        color: #f7c948 !important;
        font-size: 1.6rem !important;
    }

    /* Tabelas */
    .stDataFrame { border: 1px solid #2d6a4f; border-radius: 8px; }

    /* Tabs */
    .stTabs [data-baseweb="tab"] { color: #f5f0e8; }
    .stTabs [aria-selected="true"] {
        background-color: #f7c948 !important;
        color: #1b4332 !important;
        font-weight: bold;
        border-radius: 6px;
    }

    /* Texto geral */
    p, li, span { color: #f5f0e8; }

    /* Divider */
    hr { border-color: #2d6a4f; }
</style>
""", unsafe_allow_html=True)

# ══════════════════════════════════════════════════════════════
# CAMINHOS DOS ARQUIVOS
# ══════════════════════════════════════════════════════════════

# ↓ COLOQUE O CAMINHO DA SUA LOGO AQUI (se tiver)
LOGO = None  # ex: "logo_lostacos.png"

CARDAPIO_CSV   = "cardapio-los-tacos.csv"
PEDIDOS_CSV    = "pedidos_mock.csv"
CLIENTES_CSV   = "clientes_mock.csv"
FINANCEIRO_CSV = "financeiro_mock.csv"

# ══════════════════════════════════════════════════════════════
# CARREGAMENTO DOS DADOS
# ══════════════════════════════════════════════════════════════

@st.cache_data
def carregar_dados():
    cardapio   = pd.read_csv(CARDAPIO_CSV)
    pedidos    = pd.read_csv(PEDIDOS_CSV)
    clientes   = pd.read_csv(CLIENTES_CSV)
    financeiro = pd.read_csv(FINANCEIRO_CSV)
    return cardapio, pedidos, clientes, financeiro

cardapio, pedidos, clientes, financeiro = carregar_dados()

pedidos_ok = pedidos[pedidos["status"] == "finalizado"].copy()

# ══════════════════════════════════════════════════════════════
# SIDEBAR
# ══════════════════════════════════════════════════════════════

with st.sidebar:
    st.markdown("## 🌮 LOS TACOS")
    st.markdown("*Make Coentro Great Again*")
    st.markdown("---")

    pagina = st.radio(
        "Navegação",
        ["🌮 Totem do Cliente", "📊 Visão Geral", "🍳 Cozinha", "👥 Clientes",
         "📋 Cardápio & CMV", "💰 Financeiro", "📣 Comunicação"],
        label_visibility="collapsed"
    )

    st.markdown("---")
    st.markdown("**Mercado Novo · BH**")
    st.markdown("@lostacosdonacho")

# ══════════════════════════════════════════════════════════════
# PÁGINA 1 — VISÃO GERAL
# ══════════════════════════════════════════════════════════════

# ══════════════════════════════════════════════════════════════
# PÁGINA 0 — TOTEM DO CLIENTE
# ══════════════════════════════════════════════════════════════

if pagina == "🌮 Totem do Cliente":

    st.markdown("""
    <div style='text-align:center;padding:10px 0 20px'>
        <h1 style='color:#f7c948;font-size:2.5em'>🌮 TOTEM DO CLIENTE</h1>
        <p style='color:#f5f0e8'>Simulação das 6 etapas do fluxo de pedido</p>
    </div>
    """, unsafe_allow_html=True)

    # Estado da simulação
    if "etapa" not in st.session_state:
        st.session_state.etapa = 1
    if "carrinho" not in st.session_state:
        st.session_state.carrinho = {}
    if "cliente_ativo" not in st.session_state:
        st.session_state.cliente_ativo = None
    if "cupom_ativo" not in st.session_state:
        st.session_state.cupom_ativo = None
    if "forma_pgto" not in st.session_state:
        st.session_state.forma_pgto = None

    # Barra de progresso
    etapas_nomes = ["Início", "Identificação", "Cardápio", "Pedido", "Pagamento", "Confirmação"]
    prog = (st.session_state.etapa - 1) / 5
    st.progress(prog)
    cols_etapas = st.columns(6)
    for i, nome in enumerate(etapas_nomes):
        cor = AMARELO if i + 1 == st.session_state.etapa else CREME
        cols_etapas[i].markdown(
            f"<p style='text-align:center;color:{cor};font-size:0.75em;font-weight:bold'>{nome}</p>",
            unsafe_allow_html=True
        )

    st.markdown("---")

    # ── ETAPA 1 — TELA INICIAL ──
    if st.session_state.etapa == 1:
        st.markdown(f"""
<div style='background:#1b4332;border-radius:16px;padding:60px 40px;text-align:center;border:2px solid #2d6a4f'>
    <p style='color:{AMARELO};font-size:0.9em;letter-spacing:0.3em'>MERCADO NOVO · BELO HORIZONTE</p>
    <h1 style='color:{CREME};font-size:4em;margin:10px 0'>LOS <span style='color:{AMARELO}'>TACOS</span></h1>
    <p style='color:{CREME};opacity:0.7;font-size:1em;letter-spacing:0.2em'>TACOS · QUESADILLAS · BURRITOS · NACHOS · BEBIDAS</p>
    <p style='color:{CREME};opacity:0.5;margin-top:30px;font-size:0.85em'>Make Coentro Great Again</p>
</div>
""", unsafe_allow_html=True)
        st.markdown("<br>", unsafe_allow_html=True)
        col_btn = st.columns([1, 2, 1])[1]
        if col_btn.button("🌮 TOQUE PARA COMEÇAR", use_container_width=True, type="primary"):
            st.session_state.etapa = 2
            st.rerun()

    # ── ETAPA 2 — IDENTIFICAÇÃO ──
    elif st.session_state.etapa == 2:
        st.markdown(f"<h2 style='color:{AMARELO}'>👤 Identificação</h2>", unsafe_allow_html=True)
        st.markdown("<p style='color:#f5f0e8'>Quer se identificar? Acumule visitas e ganhe tacos grátis!</p>", unsafe_allow_html=True)

        col1, col2 = st.columns(2)
        with col1:
            st.markdown(f"<div style='background:#1b4332;border-radius:12px;padding:24px;border:1px solid #2d6a4f'>", unsafe_allow_html=True)
            st.markdown(f"<h4 style='color:{AMARELO}'>Inserir CPF</h4>", unsafe_allow_html=True)
            cpf_input = st.text_input("CPF", placeholder="000.000.000-00", label_visibility="collapsed")
            if st.button("🔍 Buscar", use_container_width=True):
                cpf_limpo = cpf_input.replace(".", "").replace("-", "").strip()
                cli_encontrado = clientes[
                    clientes["cpf"].str.replace(".", "").str.replace("-", "") == cpf_limpo
                ]
                if len(cli_encontrado) > 0:
                    st.session_state.cliente_ativo = cli_encontrado.iloc[0].to_dict()
                    st.success(f"✅ Olá, {cli_encontrado.iloc[0]['nome'].split()[0]}!")
                    st.session_state.etapa = 3
                    st.rerun()
                else:
                    # Simula com cliente aleatório para demo
                    cliente_demo = clientes.sample(1).iloc[0].to_dict()
                    st.session_state.cliente_ativo = cliente_demo
                    st.info(f"CPF não encontrado. Simulando com {cliente_demo['nome'].split()[0]} para demo.")
                    st.session_state.etapa = 3
                    st.rerun()
            st.markdown("</div>", unsafe_allow_html=True)

        with col2:
            st.markdown(f"<div style='background:#1b4332;border-radius:12px;padding:24px;border:1px solid #2d6a4f;text-align:center'>", unsafe_allow_html=True)
            st.markdown(f"<h4 style='color:{CREME}'>Continuar sem cadastro</h4>", unsafe_allow_html=True)
            st.markdown(f"<p style='color:{CREME};opacity:0.6;font-size:0.85em'>Você não acumula pontos mas pode pedir normalmente</p>", unsafe_allow_html=True)
            if st.button("👤 Continuar Anônimo", use_container_width=True):
                st.session_state.cliente_ativo = None
                st.session_state.etapa = 3
                st.rerun()
            st.markdown("</div>", unsafe_allow_html=True)

        # Mostrar cliente de teste
        st.markdown("---")
        st.markdown(f"<p style='color:#2d6a4f;font-size:0.8em'>💡 Para testar: use o CPF de qualquer cliente do clientes_mock.csv</p>", unsafe_allow_html=True)

    # ── ETAPA 3 — CARDÁPIO ──
    elif st.session_state.etapa == 3:

        # Saudação se cliente identificado
        if st.session_state.cliente_ativo:
            cli = st.session_state.cliente_ativo
            nivel_emoji = {"Novo": "🌮", "Libre": "⭐", "Libre Gold": "🏆"}.get(cli["nivel_fidelidade"], "🌮")
            st.markdown(f"""
<div style='background:#1b4332;border-radius:8px;padding:12px 20px;margin-bottom:16px;border-left:4px solid {AMARELO}'>
<b style='color:{AMARELO}'>{nivel_emoji} Olá, {cli['nome'].split()[0]}!</b>
<span style='color:{CREME}'> · Nível {cli['nivel_fidelidade']} · {cli['total_visitas']} visitas</span>
{"<span style='color:#4ade80'> · 🎁 Você tem " + str(cli['tacos_gratis_disponiveis']) + " taco(s) grátis!</span>" if int(cli['tacos_gratis_disponiveis']) > 0 else ""}
</div>
""", unsafe_allow_html=True)

        st.markdown(f"<h2 style='color:{AMARELO}'>🌮 Cardápio</h2>", unsafe_allow_html=True)

        # Abas por categoria
        cats = cardapio["categoria"].unique().tolist()
        tabs = st.tabs(cats)

        for tab, cat in zip(tabs, cats):
            with tab:
                itens_cat = cardapio[cardapio["categoria"] == cat]
                cols = st.columns(3)
                for i, (_, item) in enumerate(itens_cat.iterrows()):
                    with cols[i % 3]:
                        qtd_atual = st.session_state.carrinho.get(item["id"], 0)
                        st.markdown(f"""
<div style='background:#1b4332;border-radius:10px;padding:14px;margin-bottom:12px;border:1px solid #2d6a4f'>
<b style='color:{CREME}'>{item['nome']}</b><br>
<small style='color:{CREME};opacity:0.6'>{item.get('descricao','')[:50]}</small><br>
<b style='color:{AMARELO};font-size:1.1em'>R$ {float(item['preco']):.2f}</b>
</div>
""", unsafe_allow_html=True)
                        col_a, col_b, col_c = st.columns([1, 1, 1])
                        if col_a.button("−", key=f"minus_{item['id']}"):
                            if st.session_state.carrinho.get(item["id"], 0) > 0:
                                st.session_state.carrinho[item["id"]] -= 1
                                if st.session_state.carrinho[item["id"]] == 0:
                                    del st.session_state.carrinho[item["id"]]
                                st.rerun()
                        col_b.markdown(f"<p style='text-align:center;color:{AMARELO};font-weight:bold;margin-top:4px'>{qtd_atual}</p>", unsafe_allow_html=True)
                        if col_c.button("+", key=f"plus_{item['id']}"):
                            st.session_state.carrinho[item["id"]] = qtd_atual + 1
                            st.rerun()

        # Barra inferior com total
        total_itens = sum(st.session_state.carrinho.values())
        if total_itens > 0:
            itens_carrinho = []
            for id_item, qtd in st.session_state.carrinho.items():
                item_row = cardapio[cardapio["id"] == id_item].iloc[0]
                itens_carrinho.append({"nome": item_row["nome"], "preco": float(item_row["preco"]), "qtd": qtd})
            subtotal = sum(i["preco"] * i["qtd"] for i in itens_carrinho)

            st.markdown("---")
            col1, col2 = st.columns([2, 1])
            col1.markdown(f"<p style='color:{CREME}'><b>{total_itens} item(s)</b> · Subtotal: <b style='color:{AMARELO}'>R$ {subtotal:.2f}</b></p>", unsafe_allow_html=True)
            if col2.button("🛒 VER PEDIDO →", use_container_width=True, type="primary"):
                st.session_state.etapa = 4
                st.rerun()

    # ── ETAPA 4 — RESUMO DO PEDIDO ──
    elif st.session_state.etapa == 4:
        st.markdown(f"<h2 style='color:{AMARELO}'>🛒 Resumo do Pedido</h2>", unsafe_allow_html=True)

        itens_carrinho = []
        for id_item, qtd in st.session_state.carrinho.items():
            item_row = cardapio[cardapio["id"] == id_item].iloc[0]
            itens_carrinho.append({"nome": item_row["nome"], "preco": float(item_row["preco"]), "qtd": qtd})

        subtotal = sum(i["preco"] * i["qtd"] for i in itens_carrinho)

        col1, col2 = st.columns([1, 1])

        with col1:
            st.markdown(f"<h4 style='color:{CREME}'>Itens selecionados</h4>", unsafe_allow_html=True)
            for item in itens_carrinho:
                st.markdown(f"""
<div style='background:#1b4332;border-radius:8px;padding:10px 14px;margin-bottom:8px;display:flex;justify-content:space-between'>
<span style='color:{CREME}'>{item['qtd']}x {item['nome']}</span>
<b style='color:{AMARELO}'>R$ {item['preco'] * item['qtd']:.2f}</b>
</div>
""", unsafe_allow_html=True)

        with col2:
            st.markdown(f"<h4 style='color:{CREME}'>Cupom de desconto</h4>", unsafe_allow_html=True)
            cupom_input = st.text_input("Cupom", placeholder="Ex: NACHO15", label_visibility="collapsed")
            desconto = 0
            msg_cupom = ""

            CUPONS = {
                "NACHO15": ("pct", 15),
                "LIBRE10": ("pct", 10),
                "COMBO29": ("fixo", 29),
            }

            if cupom_input:
                cupom_up = cupom_input.upper().strip()
                if cupom_up in CUPONS:
                    tipo, valor = CUPONS[cupom_up]
                    if tipo == "pct":
                        desconto = round(subtotal * valor / 100, 2)
                        msg_cupom = f"✅ {valor}% de desconto aplicado!"
                    else:
                        desconto = max(0, subtotal - valor)
                        msg_cupom = f"✅ Combo por R$ {valor:.2f} aplicado!"
                    st.success(msg_cupom)
                    st.session_state.cupom_ativo = cupom_up
                else:
                    st.error("❌ Cupom inválido")

            st.markdown(f"<h4 style='color:{CREME};margin-top:16px'>Local ou viagem?</h4>", unsafe_allow_html=True)
            local = st.radio("", ["🪑 Comer aqui", "🛍️ Para viagem"], label_visibility="collapsed")

            st.markdown("---")
            total = max(0, subtotal - desconto)
            st.markdown(f"<p style='color:{CREME}'>Subtotal: R$ {subtotal:.2f}</p>", unsafe_allow_html=True)
            if desconto > 0:
                st.markdown(f"<p style='color:#4ade80'>Desconto: - R$ {desconto:.2f}</p>", unsafe_allow_html=True)
            st.markdown(f"<h3 style='color:{AMARELO}'>Total: R$ {total:.2f}</h3>", unsafe_allow_html=True)

            if st.button("💳 IR PARA PAGAMENTO →", use_container_width=True, type="primary"):
                st.session_state.total_pedido = total
                st.session_state.etapa = 5
                st.rerun()

        col_voltar = st.columns([1, 4])[0]
        if col_voltar.button("← Voltar"):
            st.session_state.etapa = 3
            st.rerun()

    # ── ETAPA 5 — PAGAMENTO ──
    elif st.session_state.etapa == 5:
        st.markdown(f"<h2 style='color:{AMARELO}'>💳 Pagamento</h2>", unsafe_allow_html=True)
        total = st.session_state.get("total_pedido", 0)
        st.markdown(f"<h3 style='color:{CREME}'>Total a pagar: <span style='color:{AMARELO}'>R$ {total:.2f}</span></h3>", unsafe_allow_html=True)
        st.markdown("---")

        forma = st.radio(
            "Escolha a forma de pagamento:",
            ["◎ PIX (recomendado)", "💳 Débito", "💳 Crédito"],
            label_visibility="collapsed"
        )

        if "PIX" in forma:
            st.markdown(f"""
<div style='background:#1b4332;border-radius:12px;padding:24px;text-align:center;border:2px solid {AMARELO};margin:16px 0'>
<p style='color:{AMARELO};font-size:1.1em;font-weight:bold'>◎ QR CODE PIX</p>
<div style='background:#f5f0e8;width:160px;height:160px;margin:16px auto;border-radius:8px;display:flex;align-items:center;justify-content:center'>
<span style='font-size:3em'>◎</span>
</div>
<p style='color:{CREME}'>Chave: nacho@nacholibre.com.br</p>
<p style='color:{AMARELO};font-weight:bold;font-size:1.3em'>R$ {total:.2f}</p>
<p style='color:{CREME};opacity:0.7;font-size:0.85em'>Abra o app do seu banco e escaneie</p>
<p style='color:#4ade80;animation:pulse 1s infinite'>⏳ AGUARDANDO PAGAMENTO...</p>
</div>
""", unsafe_allow_html=True)
            st.markdown(f"""
<div style='background:#2d6a4f;border-radius:8px;padding:16px;text-align:center;border:1px solid {AMARELO}'>
<p style='color:{AMARELO};font-weight:bold'>🍺 Enquanto aguarda...</p>
<p style='color:{CREME}'>Adicione uma Cerveja Artesanal por +R$ 18?</p>
</div>
""", unsafe_allow_html=True)
            col_s, col_n = st.columns(2)
            col_s.button("✓ SIM, QUERO!", use_container_width=True)
            col_n.button("✗ Não, obrigado", use_container_width=True)

        else:
            st.markdown(f"""
<div style='background:#1b4332;border-radius:12px;padding:32px;text-align:center;border:2px solid #2d6a4f;margin:16px 0'>
<p style='color:{AMARELO};font-size:1.1em;font-weight:bold'>💳 CARTÃO</p>
<p style='color:{CREME}'>Visa · Master · Elo · Hipercard · Amex</p>
<p style='color:{AMARELO};font-size:1.8em;font-weight:bold;margin:20px 0'>INSIRA OU APROXIME</p>
<p style='color:{CREME};opacity:0.7;font-size:0.85em'>Use a maquininha abaixo do totem</p>
<p style='color:#4ade80'>⏳ AGUARDANDO CARTÃO...</p>
</div>
""", unsafe_allow_html=True)

        st.markdown("---")
        col1, col2 = st.columns(2)
        if col1.button("← Voltar"):
            st.session_state.etapa = 4
            st.rerun()
        if col2.button("✅ SIMULAR PAGAMENTO APROVADO", use_container_width=True, type="primary"):
            st.session_state.forma_pgto = forma
            st.session_state.etapa = 6
            st.rerun()

    # ── ETAPA 6 — CONFIRMAÇÃO ──
    elif st.session_state.etapa == 6:
        import random
        numero_pedido = f"P{random.randint(1000, 9999)}"

        st.markdown(f"""
<div style='background:#1b4332;border-radius:16px;padding:48px 40px;text-align:center;border:2px solid {AMARELO}'>
    <p style='font-size:4em;margin:0'>🌮</p>
    <h1 style='color:{AMARELO};font-size:2.5em;margin:10px 0'>PEDIDO CONFIRMADO!</h1>
    <h2 style='color:{CREME};font-size:3em;margin:10px 0'>{numero_pedido}</h2>
    <p style='color:{CREME};opacity:0.8'>Seu pedido já foi para a cozinha!</p>
    <p style='color:{AMARELO};font-size:1.3em;font-weight:bold;margin:16px 0'>⏱️ Tempo estimado: 12 minutos</p>
    <hr style='border-color:#2d6a4f;margin:24px 0'>
    <p style='color:{CREME};opacity:0.5;font-size:0.85em'>Siga a gente!</p>
    <p style='color:{AMARELO};font-size:1.1em'>@lostacosdonacho</p>
    <p style='color:{CREME};opacity:0.4;font-size:0.8em;margin-top:24px'>Make Coentro Great Again</p>
</div>
""", unsafe_allow_html=True)

        st.markdown("<br>", unsafe_allow_html=True)
        col = st.columns([1, 2, 1])[1]
        if col.button("🔄 NOVO PEDIDO", use_container_width=True, type="primary"):
            st.session_state.etapa = 1
            st.session_state.carrinho = {}
            st.session_state.cliente_ativo = None
            st.session_state.cupom_ativo = None
            st.session_state.forma_pgto = None
            st.rerun()


elif pagina == "📊 Visão Geral":
    st.title("📊 Visão Geral")
    st.markdown("##### Olá, Nacho! Aqui está o resumo do período.")
    st.markdown("---")

    # KPIs
    receita_total  = financeiro["receita_bruta"].sum()
    total_pedidos  = financeiro["pedidos_finalizados"].sum()
    ticket_medio   = pedidos_ok["total"].mean()
    melhor_dia_row = financeiro.loc[financeiro["receita_bruta"].idxmax()]

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("💰 Receita Total", f"R$ {receita_total:,.2f}")
    c2.metric("🛒 Total de Pedidos", f"{total_pedidos}")
    c3.metric("🎯 Ticket Médio", f"R$ {ticket_medio:.2f}")
    c4.metric("🏆 Melhor Dia", melhor_dia_row["dia_semana"].capitalize(),
              f"R$ {melhor_dia_row['receita_bruta']:,.2f}")

    st.markdown("---")

    col1, col2 = st.columns([2, 1])

    with col1:
        st.subheader("📈 Receita por Dia")
        fig = go.Figure()
        fig.add_trace(go.Scatter(
            x=financeiro["data"], y=financeiro["receita_bruta"],
            name="Receita Bruta", line=dict(color=AMARELO, width=3),
            fill="tozeroy", fillcolor="rgba(247,201,72,0.15)"
        ))
        fig.add_trace(go.Scatter(
            x=financeiro["data"], y=financeiro["receita_liquida"],
            name="Receita Líquida", line=dict(color=VERDE_MEDIO, width=2)
        ))
        fig.update_layout(
            paper_bgcolor="rgba(0,0,0,0)",
            plot_bgcolor="rgba(27,67,50,0.3)",
            font_color=CREME,
            legend=dict(bgcolor="rgba(0,0,0,0)"),
            margin=dict(l=0, r=0, t=10, b=0),
            height=280,
        )
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        st.subheader("🚀 Por Canal")
        canais = pedidos_ok["canal"].value_counts().reset_index()
        canais.columns = ["canal", "qtd"]
        fig2 = px.pie(canais, values="qtd", names="canal",
                      color_discrete_sequence=[AMARELO, LARANJA, VERDE_MEDIO, "#ff6b00"],
                      hole=0.4)
        fig2.update_layout(
            paper_bgcolor="rgba(0,0,0,0)",
            font_color=CREME,
            margin=dict(l=0, r=0, t=10, b=0),
            height=280,
            showlegend=True,
        )
        st.plotly_chart(fig2, use_container_width=True)

    st.subheader("⏰ Vendas por Turno")
    turnos = pedidos_ok.groupby("turno").agg(
        pedidos=("pedido_id", "count"),
        receita=("total", "sum")
    ).reset_index()
    fig3 = px.bar(turnos, x="turno", y="receita",
                  color="turno",
                  color_discrete_map={"almoco": VERDE_MEDIO, "tarde": LARANJA, "jantar": AMARELO},
                  text="pedidos")
    fig3.update_traces(texttemplate="%{text} pedidos", textposition="outside")
    fig3.update_layout(
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(27,67,50,0.3)",
        font_color=CREME,
        showlegend=False,
        margin=dict(l=0, r=0, t=10, b=0),
        height=250,
    )
    st.plotly_chart(fig3, use_container_width=True)

# ══════════════════════════════════════════════════════════════
# PÁGINA 2 — COZINHA
# ══════════════════════════════════════════════════════════════

elif pagina == "🍳 Cozinha":
    st.title("🍳 Painel da Cozinha")
    st.markdown("---")

    HOJE = "2026-06-13"
    pedidos_hoje = pedidos[pedidos["data"] == HOJE].copy()
    pedidos_hoje_ok = pedidos_hoje[pedidos_hoje["status"] == "finalizado"]

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("📋 Pedidos Hoje", len(pedidos_hoje_ok))
    c2.metric("💰 Receita Hoje", f"R$ {pedidos_hoje_ok['total'].sum():,.2f}")
    c3.metric("⏱️ Tempo Médio", f"{pedidos_hoje_ok['tempo_preparo_min'].mean():.0f} min")
    c4.metric("❌ Cancelamentos", len(pedidos_hoje[pedidos_hoje["status"] == "cancelado"]))

    st.markdown("---")

    col_filtro1, col_filtro2 = st.columns(2)
    with col_filtro1:
        turno_filtro = st.selectbox("Turno", ["todos", "almoco", "tarde", "jantar"])
    with col_filtro2:
        canal_filtro = st.selectbox("Canal", ["todos", "totem", "balcão", "ifood", "rappi"])

    df_filtrado = pedidos_hoje_ok.copy()
    if turno_filtro != "todos":
        df_filtrado = df_filtrado[df_filtrado["turno"] == turno_filtro]
    if canal_filtro != "todos":
        df_filtrado = df_filtrado[df_filtrado["canal"] == canal_filtro]

    # 3 colunas kanban
    col1, col2, col3 = st.columns(3)
    fatias = [
        df_filtrado.iloc[:5],
        df_filtrado.iloc[5:10],
        df_filtrado.iloc[10:15],
    ]
    titulos  = ["🔴 NOVOS", "🟡 EM ANDAMENTO", "🟢 PRONTOS"]
    for col, titulo, fatia in zip([col1, col2, col3], titulos, fatias):
        with col:
            st.markdown(f"### {titulo}")
            for _, row in fatia.iterrows():
                st.markdown(f"""
<div style='background:#1b4332;border-radius:8px;padding:12px;margin-bottom:10px;border-left:3px solid {AMARELO}'>
<b style='color:{AMARELO}'>{row['pedido_id']}</b> · {row['horario']}<br>
<span style='color:{CREME};font-size:0.85em'>{row['itens'][:60]}...</span><br>
<span style='background:{AMARELO};color:#1b4332;padding:2px 8px;border-radius:4px;font-size:0.75em;font-weight:bold'>{row['canal'].upper()}</span>
<span style='color:{CREME};font-size:0.85em'> · R$ {float(row['total']):.2f}</span>
</div>
""", unsafe_allow_html=True)

# ══════════════════════════════════════════════════════════════
# PÁGINA 3 — CLIENTES
# ══════════════════════════════════════════════════════════════

elif pagina == "👥 Clientes":
    st.title("👥 Clientes & Fidelidade")
    st.markdown("---")

    niveis = clientes["nivel_fidelidade"].value_counts()
    com_taco = clientes[clientes["tacos_gratis_disponiveis"] > 0]

    c1, c2, c3, c4, c5 = st.columns(5)
    c1.metric("👥 Total", len(clientes))
    c2.metric("🌮 Novos", niveis.get("Novo", 0))
    c3.metric("⭐ Libre", niveis.get("Libre", 0))
    c4.metric("🏆 Libre Gold", niveis.get("Libre Gold", 0))
    c5.metric("🎁 Com Taco Grátis", len(com_taco))

    st.markdown("---")

    filtro_nivel = st.radio(
        "Filtrar por nível",
        ["Todos", "Novo", "Libre", "Libre Gold"],
        horizontal=True
    )

    df_cli = clientes.copy()
    if filtro_nivel != "Todos":
        df_cli = df_cli[df_cli["nivel_fidelidade"] == filtro_nivel]

    def badge_nivel(nivel):
        cores = {"Novo": "🌮", "Libre": "⭐", "Libre Gold": "🏆"}
        return f"{cores.get(nivel, '')} {nivel}"

    df_display = df_cli[[
        "nome", "nivel_fidelidade", "total_visitas",
        "gasto_total", "ultimo_pedido", "item_favorito", "tacos_gratis_disponiveis"
    ]].copy()
    df_display.columns = ["Nome", "Nível", "Visitas", "Gasto Total (R$)", "Último Pedido", "Favorito", "Tacos Grátis 🎁"]
    df_display["Gasto Total (R$)"] = df_display["Gasto Total (R$)"].apply(lambda x: f"R$ {x:.2f}")

    st.dataframe(df_display, use_container_width=True, height=400)

    st.subheader("🎁 Clientes com Taco Grátis Disponível")
    for _, row in com_taco.iterrows():
        st.markdown(f"""
<div style='background:#1b4332;border-radius:8px;padding:10px;margin-bottom:8px;display:flex;justify-content:space-between'>
<span style='color:{CREME}'><b style='color:{AMARELO}'>{row['nome']}</b> · {row['nivel_fidelidade']} · {row['tacos_gratis_disponiveis']} taco(s) grátis</span>
<span style='color:{VERDE_MEDIO}'>{row['whatsapp']}</span>
</div>
""", unsafe_allow_html=True)

# ══════════════════════════════════════════════════════════════
# PÁGINA 4 — CARDÁPIO E CMV
# ══════════════════════════════════════════════════════════════

elif pagina == "📋 Cardápio & CMV":
    st.title("📋 Cardápio & CMV")
    st.markdown("---")

    CMV_ALVO = {"Tacos": 0.32, "Quesadillas": 0.35, "Burritos": 0.33,
                "Nachos": 0.28, "Extras": 0.25, "Bebidas": 0.22}

    df_cmv = cardapio.copy()
    df_cmv["custo"] = df_cmv.apply(
        lambda r: round(r["preco"] * CMV_ALVO.get(r["categoria"], 0.33), 2), axis=1)
    df_cmv["cmv_pct"] = (df_cmv["custo"] / df_cmv["preco"] * 100).round(1)
    df_cmv["margem"]  = (100 - df_cmv["cmv_pct"]).round(1)

    # Vendas por item
    vendas = {}
    for _, row in pedidos[pedidos["status"] == "finalizado"].iterrows():
        for item in str(row["itens"]).split(" | "):
            item = item.strip()
            vendas[item] = vendas.get(item, 0) + 1
    df_cmv["vendas"] = df_cmv["nome"].map(vendas).fillna(0).astype(int)

    cmv_medio = df_cmv["cmv_pct"].mean()
    mais_vendido = df_cmv.loc[df_cmv["vendas"].idxmax()]
    alertas = df_cmv[df_cmv["cmv_pct"] > 40]

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("📦 Total Itens", len(df_cmv))
    c2.metric("📊 CMV Médio", f"{cmv_medio:.1f}%")
    c3.metric("🏆 Mais Vendido", mais_vendido["nome"], f"{mais_vendido['vendas']} vendas")
    c4.metric("⚠️ Alerta CMV", f"{len(alertas)} itens")

    st.markdown("---")

    col1, col2 = st.columns([2, 1])
    with col1:
        st.subheader("📋 Tabela de Itens")
        df_show = df_cmv[[
            "nome", "categoria", "preco", "custo", "cmv_pct", "margem", "vendas"
        ]].copy()
        df_show.columns = ["Nome", "Categoria", "Preço (R$)", "Custo (R$)", "CMV %", "Margem %", "Vendas"]
        df_show = df_show.sort_values("CMV %", ascending=False)
        st.dataframe(df_show, use_container_width=True, height=420)

    with col2:
        st.subheader("📊 Preço por Categoria")
        cat_resumo = df_cmv.groupby("categoria")["preco"].mean().reset_index()
        fig = px.bar(cat_resumo, x="preco", y="categoria", orientation="h",
                     color_discrete_sequence=[AMARELO])
        fig.update_layout(
            paper_bgcolor="rgba(0,0,0,0)",
            plot_bgcolor="rgba(27,67,50,0.3)",
            font_color=CREME,
            margin=dict(l=0, r=0, t=10, b=0),
            height=420,
            xaxis_title="Preço Médio (R$)",
            yaxis_title="",
        )
        st.plotly_chart(fig, use_container_width=True)

# ══════════════════════════════════════════════════════════════
# PÁGINA 5 — FINANCEIRO
# ══════════════════════════════════════════════════════════════

elif pagina == "💰 Financeiro":
    st.title("💰 Financeiro")
    st.markdown("---")

    receita_bruta  = financeiro["receita_bruta"].sum()
    receita_liq    = financeiro["receita_liquida"].sum()
    descontos      = financeiro["descontos_cupom"].sum()
    taxas          = financeiro["taxas_delivery"].sum()
    media_diaria   = receita_bruta / len(financeiro)
    projecao       = media_diaria * 30

    c1, c2, c3, c4, c5 = st.columns(5)
    c1.metric("💰 Receita Bruta",   f"R$ {receita_bruta:,.2f}")
    c2.metric("✅ Receita Líquida", f"R$ {receita_liq:,.2f}")
    c3.metric("🎟️ Descontos",       f"R$ {descontos:,.2f}")
    c4.metric("🚴 Taxas Delivery",  f"R$ {taxas:,.2f}")
    c5.metric("📅 Projeção Mês",    f"R$ {projecao:,.2f}")

    st.markdown("---")

    col1, col2 = st.columns(2)

    with col1:
        st.subheader("📊 Receita Diária")
        fig = go.Figure()
        fig.add_trace(go.Bar(
            x=financeiro["data"], y=financeiro["receita_bruta"],
            name="Bruta", marker_color=AMARELO))
        fig.add_trace(go.Bar(
            x=financeiro["data"], y=financeiro["receita_liquida"],
            name="Líquida", marker_color=VERDE_MEDIO))
        fig.update_layout(
            barmode="group",
            paper_bgcolor="rgba(0,0,0,0)",
            plot_bgcolor="rgba(27,67,50,0.3)",
            font_color=CREME,
            margin=dict(l=0, r=0, t=10, b=0),
            height=300,
            legend=dict(bgcolor="rgba(0,0,0,0)"),
        )
        st.plotly_chart(fig, use_container_width=True)

    with col2:
        st.subheader("🎟️ Uso de Cupons")
        cupons_count = pedidos_ok[pedidos_ok["cupom"] != ""]["cupom"].value_counts().reset_index()
        cupons_count.columns = ["cupom", "usos"]
        fig2 = px.bar(cupons_count, x="cupom", y="usos",
                      color_discrete_sequence=[AMARELO, VERDE_MEDIO, LARANJA])
        fig2.update_layout(
            paper_bgcolor="rgba(0,0,0,0)",
            plot_bgcolor="rgba(27,67,50,0.3)",
            font_color=CREME,
            margin=dict(l=0, r=0, t=10, b=0),
            height=300,
            showlegend=False,
        )
        st.plotly_chart(fig2, use_container_width=True)

    # Comparativo semanal
    st.subheader("📅 Comparativo Semanal")
    s1 = financeiro[financeiro["data"] <= "2026-06-07"]["receita_bruta"].sum()
    s2 = financeiro[financeiro["data"] >  "2026-06-07"]["receita_bruta"].sum()
    variacao = round((s2 - s1) / s1 * 100, 1) if s1 > 0 else 0
    seta = "↑" if variacao >= 0 else "↓"
    cor_var = "#4ade80" if variacao >= 0 else "#ef4444"

    cs1, cs2, cs3 = st.columns(3)
    cs1.metric("Semana 1 (1-7 jun)", f"R$ {s1:,.2f}")
    cs2.metric("Semana 2 (8-13 jun)", f"R$ {s2:,.2f}")
    cs3.metric("Variação", f"{seta} {abs(variacao)}%")

# ══════════════════════════════════════════════════════════════
# PÁGINA 6 — COMUNICAÇÃO
# ══════════════════════════════════════════════════════════════

elif pagina == "📣 Comunicação":
    st.title("📣 Comunicação & Marketing")
    st.markdown("---")

    tab1, tab2, tab3 = st.tabs(["📧 Newsletter", "⭐ Fidelidade Libre", "🎟️ Cupons"])

    with tab1:
        st.subheader("Newsletter de Inauguração")
        c1, c2, c3 = st.columns(3)
        c1.metric("📤 Enviados", "847")
        c2.metric("📬 Abertos", "312", "36.8%")
        c3.metric("👆 Cliques", "89", "28.5%")
        st.markdown("---")
        st.markdown(f"""
<div style='background:#1b4332;border-radius:12px;padding:24px;border:1px solid #2d6a4f'>
<p style='color:{AMARELO};font-size:0.8em;letter-spacing:0.2em'>MERCADO NOVO · BELO HORIZONTE</p>
<h2 style='color:{CREME};font-size:2.5em;margin:0'>LOS <span style='color:{AMARELO}'>TACOS</span></h2>
<p style='color:{CREME}'>Abrimos as portas — e você foi o primeiro a saber</p>
<hr style='border-color:#2d6a4f'>
<p style='color:{CREME}'>Use o código <b style='color:{AMARELO};font-size:1.2em'>NACHO15</b> e ganhe 15% off no primeiro pedido.</p>
<p style='color:{CREME};font-size:0.85em;opacity:0.6'>Make Coentro Great Again</p>
</div>
""", unsafe_allow_html=True)

    with tab2:
        st.subheader("Programa Libre — Fidelidade")
        niveis = clientes["nivel_fidelidade"].value_counts()
        c1, c2, c3, c4 = st.columns(4)
        c1.metric("👥 Total", len(clientes))
        c2.metric("🌮 Novos", niveis.get("Novo", 0))
        c3.metric("⭐ Libre", niveis.get("Libre", 0))
        c4.metric("🏆 Libre Gold", niveis.get("Libre Gold", 0))

        st.markdown("---")
        st.subheader("🎁 Clientes com Taco Grátis")
        com_taco = clientes[clientes["tacos_gratis_disponiveis"] > 0]
        for _, row in com_taco.iterrows():
            col_a, col_b, col_c = st.columns([3, 1, 1])
            col_a.write(f"**{row['nome']}** · {row['nivel_fidelidade']}")
            col_b.write(f"🎁 {row['tacos_gratis_disponiveis']} taco(s)")
            col_c.button("📱 WhatsApp", key=row["cliente_id"])

    with tab3:
        st.subheader("Cupons Ativos")
        cupons_info = [
            {"codigo": "NACHO15", "desc": "15% off no primeiro pedido",
             "cor": AMARELO, "validade": "junho/2026"},
            {"codigo": "LIBRE10", "desc": "10% off para clientes Libres",
             "cor": VERDE_MEDIO, "validade": "junho/2026"},
            {"codigo": "COMBO29", "desc": "2 Tacos + Bebida por R$29",
             "cor": LARANJA, "validade": "junho/2026"},
        ]

        cupons_usados = pedidos_ok[pedidos_ok["cupom"] != ""].groupby("cupom").agg(
            usos=("pedido_id", "count"),
            desconto=("desconto", "sum")
        ).reset_index()

        for cupom in cupons_info:
            uso = cupons_usados[cupons_usados["cupom"] == cupom["codigo"]]
            usos = int(uso["usos"].values[0]) if len(uso) > 0 else 0
            desc = float(uso["desconto"].values[0]) if len(uso) > 0 else 0
            st.markdown(f"""
<div style='background:#1b4332;border-radius:8px;padding:16px;margin-bottom:12px;border-left:4px solid {cupom["cor"]}'>
<b style='color:{cupom["cor"]};font-size:1.2em'>{cupom["codigo"]}</b>
<span style='color:{CREME};margin-left:12px'>{cupom["desc"]}</span><br>
<span style='color:{CREME};font-size:0.85em'>✅ {usos} usos · R$ {desc:.2f} em descontos · Válido: {cupom["validade"]}</span>
</div>
""", unsafe_allow_html=True)

        total_desc = pedidos_ok["desconto"].sum()
        st.markdown(f"""
<div style='background:#2d6a4f;border-radius:8px;padding:16px;text-align:center;margin-top:16px'>
<b style='color:{AMARELO};font-size:1.3em'>Total economizado pelos clientes: R$ {total_desc:,.2f}</b>
</div>
""", unsafe_allow_html=True)

# ══════════════════════════════════════════════════════════════
# RODAPÉ
# ══════════════════════════════════════════════════════════════

st.markdown("---")
st.markdown(
    "<p style='text-align:center;color:#2d6a4f;font-size:0.8em'>"
    "Los Tacos · Mercado Novo · BH · Make Coentro Great Again · @lostacosdonacho"
    "</p>",
    unsafe_allow_html=True
)
