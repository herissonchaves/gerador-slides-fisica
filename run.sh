#!/usr/bin/env bash
# ============================================================
# run.sh — Script de execução do workflow completo
# Prof. Hérisson Chaves — Ciências da Natureza
#
# USO:
#   ./run.sh entrada/minha_aula.md
#
# Saídas geradas em saida/:
#   slides_<tema>_<data>.pptx    ← apresentação
#   quizizz_<tema>_<data>.xlsx   ← planilha Quizizz Paper Mode
# ============================================================

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Uso: ./run.sh <entrada/arquivo.md>"
  echo "Exemplo: ./run.sh entrada/exemplo_aula.md"
  exit 1
fi

ARQUIVO_MD="$1"
RESOURCES=".agents/skills/criar-slides-fisica/resources"
SAIDA="saida"

if [[ ! -f "$ARQUIVO_MD" ]]; then
  echo "❌ Arquivo não encontrado: $ARQUIVO_MD"
  exit 1
fi

echo "================================================"
echo "🔬 SLIDES DE FÍSICA — AGENTE ANTIGRAVITY"
echo "   Arquivo: $ARQUIVO_MD"
echo "================================================"

# Extrair tema do frontmatter (sem acento, lowercase, com underscore)
TEMA_RAW=$(grep -m1 "^tema:" "$ARQUIVO_MD" | sed 's/tema: *//' | tr -d '\r' || echo "fisica")
TEMA=$(echo "$TEMA_RAW" | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null \
  | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]\+/_/g' | sed 's/^_\|_$//g')
[[ -z "$TEMA" ]] && TEMA="fisica"
DATA=$(date +%Y%m%d)
echo "   Tema: $TEMA | Data: $DATA"
echo ""

# --- Verificar dependências ---
echo "🔍 Passo 0 — Verificando dependências..."
check_cmd() { command -v "$1" &>/dev/null && echo "   ✅ $1" || { echo "   ❌ $1 — não encontrado"; return 1; }; }
DEPS_OK=true
check_cmd node    || DEPS_OK=false
check_cmd python3 || DEPS_OK=false
if command -v libreoffice &>/dev/null || command -v soffice &>/dev/null; then
  echo "   ✅ libreoffice"
else
  echo "   ⚠️  libreoffice — QA visual será ignorado"
fi
if command -v pdftoppm &>/dev/null; then
  echo "   ✅ pdftoppm"
else
  echo "   ⚠️  pdftoppm — QA visual será ignorado"
fi
python3 -c "import openpyxl" 2>/dev/null && echo "   ✅ openpyxl" \
  || { echo "   ⚠️  instalando openpyxl..."; pip install openpyxl --break-system-packages -q; }
[[ "$DEPS_OK" == "false" ]] && { echo "❌ Dependências críticas ausentes."; exit 1; }

# --- Node modules ---
if [[ ! -d "$RESOURCES/node_modules" ]]; then
  echo ""; echo "📦 Instalando dependências Node (uma vez só)..."
  cd "$RESOURCES" && npm install --silent && cd - > /dev/null
fi

# --- Passo 1: gerar .pptx ---
echo ""; echo "📊 Passo 1 — Gerando slides .pptx..."
PPTX_GERADO=""
if grep -q "\[AGENTE:" "$RESOURCES/gerar_slides.js" 2>/dev/null; then
  echo "   ⚠️  gerar_slides.js ainda contém placeholders [AGENTE: ...]"
  echo "   ⚠️  Rode primeiro o agente Antigravity para preencher o script."
  echo "   ⚠️  Pulando geração do .pptx por agora."
else
  node "$RESOURCES/gerar_slides.js"
  PPTX_GERADO="$SAIDA/slides_${TEMA}_${DATA}.pptx"
  echo "   ✅ $PPTX_GERADO"
fi

# --- Passo 2: QA visual ---
echo ""; echo "🖼️  Passo 2 — QA Visual..."
if [[ -n "$PPTX_GERADO" && -f "$PPTX_GERADO" ]] \
   && (command -v libreoffice &>/dev/null || command -v soffice &>/dev/null) \
   && command -v pdftoppm &>/dev/null; then
  python3 "$RESOURCES/qa_visual.py" "$PPTX_GERADO" --saida "$SAIDA/qa_preview"
else
  echo "   ⚠️  QA visual ignorado (pptx ausente ou ferramentas não instaladas)"
fi

# --- Passo 3: planilha Quizizz ---
echo ""; echo "📝 Passo 3 — Planilha Quizizz..."
QUESTOES_JSON="$SAIDA/questoes_temp.json"
if [[ -f "$QUESTOES_JSON" ]]; then
  python3 "$RESOURCES/gerar_quizizz.py" \
    --tema "$TEMA_RAW" --data "$DATA" \
    --questoes "$QUESTOES_JSON" --saida "$SAIDA"
  rm -f "$QUESTOES_JSON"
else
  echo "   ⚠️  questoes_temp.json não encontrado — usando demonstração (4 questões)"
  python3 "$RESOURCES/gerar_quizizz.py" --demo --tema "$TEMA_RAW" --data "$DATA" --saida "$SAIDA"
fi
XLSX_GERADO="$SAIDA/quizizz_${TEMA}_${DATA}.xlsx"

# --- Relatório final ---
echo ""
echo "================================================"
echo "✅ WORKFLOW CONCLUÍDO"
echo "================================================"
[[ -n "$PPTX_GERADO" && -f "$PPTX_GERADO" ]] && echo "   📊 Slides:    $PPTX_GERADO"
[[ -f "$XLSX_GERADO" ]] && echo "   📋 Quizizz:   $XLSX_GERADO"
[[ -d "$SAIDA/qa_preview" ]] && echo "   🖼️  QA:        $SAIDA/qa_preview/"
echo ""
echo "💡 Como usar:"
echo "   1. Abra o .pptx no PowerPoint / Google Slides"
echo "   2. Importe o .xlsx em Quizizz → Criar → Importar → Paper Mode"
echo "================================================"
