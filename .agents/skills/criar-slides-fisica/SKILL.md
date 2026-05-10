---
name: criar-slides-fisica
description: >
  Converte um arquivo Markdown de roteiro de aula de Física (Ensino Médio) em duas saídas
  simultâneas: apresentação PowerPoint (.pptx) e planilha Quizizz Paper Mode (.xlsx). Ative
  esta skill sempre que houver um arquivo .md na pasta entrada/ e o usuário pedir para criar,
  gerar ou montar slides de Física, mesmo informalmente ("faz os slides da aula", "monta a
  apresentação de cinemática", "transforma esse roteiro em slides"). A skill pesquisa fotos
  reais na internet, aplica paleta temática, gera fórmulas em Unicode estilizado, perguntas
  gancho, verificações de aprendizagem (Tipo F) e questões prontas para Quizizz Paper Mode.
---

# Skill: Criar Slides de Física a partir de Markdown

## Objetivo

Ler o arquivo `.md` de roteiro depositado em `entrada/`, enriquecer com pesquisa web,
e gerar **dois arquivos simultâneos** em `saida/`:

1. **Apresentação PowerPoint** (`.pptx`) — segue todas as regras da skill global `slides-fisica-ensino-medio`
2. **Planilha Quizizz Paper Mode** (`.xlsx`) — segue as regras técnicas da skill global `quizizz-paper`,
   com **filosofia de questões sobreposta** (ver `resources/filosofia-questoes.md`)

> ⚠️ **Delegação obrigatória:** antes de escrever qualquer linha de código, leia também as
> skills globais abaixo. Esta skill local **complementa e sobrepõe** essas três — não as repete.
>
> - `~/.gemini/antigravity/skills/slides-fisica-ensino-medio/SKILL.md`
> - `~/.gemini/antigravity/skills/quizizz-paper/SKILL.md`
> - `~/.gemini/antigravity/skills/pptx/SKILL.md`

---

## Entradas e Saídas

| Item | Descrição |
|------|-----------|
| **Entrada** | `entrada/<nome>.md` — roteiro da aula (formato em Seção 1) |
| **Saída 1** | `saida/slides_<tema>_<YYYYMMDD>.pptx` |
| **Saída 2** | `saida/quizizz_<tema>_<YYYYMMDD>.xlsx` |
| **QA visual** | `saida/qa_preview/slide-NN.jpg` |
| **JSON intermediário** | `saida/questoes_temp.json` (criado no Passo 5, lido no Passo 8, removido no fim) |

---

## Seção 1 — Formato do Arquivo Markdown

```markdown
---
tema: Hidrostática           # * obrigatório — tema geral
topico: Pressão Hidrostática # * obrigatório — tópico específico
serie: 2º Ano                # * obrigatório
data: 2025-06-15             # opcional (YYYY-MM-DD)
---

## Objetivos da Aula
- Compreender o conceito de pressão hidrostática
- Aplicar P = ρgh em situações reais

## Conceitos e Esquemas

### 1. Pressão
Definição, fórmula P = F/A, unidade Pa.

### 2. Pressão Hidrostática
P = ρgh com legenda das variáveis.

### 3. Paradoxo Hidrostático
Mesma altura → mesma pressão.

### 4. Princípio de Pascal
Aplicações: macaco hidráulico, freios.

## Curiosidades e Conexões Cotidianas
- Mergulhador sente pressão no ouvido
- Represas mais espessas na base

## Questões para Verificação (sugestão)
- Por que a base de uma represa é mais espessa?
```

> Cada `### Conceito` do Markdown vira **um bloco de slides** terminando em slide Tipo F.
> Ver `resources/tipos-slide.md` para as regras de cada tipo.

---

## Seção 2 — Workflow (9 passos)

### Passo 1 — Ler e analisar o `.md`

1. Procurar arquivos `.md` em `entrada/`. Se houver mais de um, processar o mais recente.
2. Extrair frontmatter: `tema`, `topico`, `serie`, `data` (default: data atual).
3. Listar cada `###` como bloco de conteúdo.
4. **Se vazio ou frontmatter inválido → parar e avisar o usuário.**

### Passo 2 — Pesquisa web (OBRIGATÓRIO antes de qualquer código)

Seguir o **Protocolo de Foto Real** da skill global `slides-fisica-ensino-medio` (Seção 3.1):

- Buscar foto para Slide 1 (capa) e Slide 2 (abertura visual).
- Validar URL com HEAD/GET antes de incluir no código (status 200, content-type image).
- Fontes: Wikimedia Commons → Unsplash → Pixabay (nessa ordem).
- Verificar fatos numéricos em fontes confiáveis (`.edu.br`, `.gov.br`, Wikipedia, Khan Academy).

**Fallback:** se 2 tentativas falharem, usar retângulo de cor sólida + ícone Unicode ≥ 120pt
e registrar o aviso para o relatório final.

### Passo 3 — Escolher a paleta

Consultar `resources/paleta-cores.md` para a tabela tema → fundo/accent/título.
**Fundos escuros são proibidos** (regra herdada da skill global).

### Passo 4 — Montar o roteiro de slides

Estrutura mínima da apresentação:

```
Slide 1   → Capa (foto real)
Slide 2   → Abertura Visual (foto real)
Slide 3   → Pergunta Gancho (Tipo B)
Slide 4+  → Para cada bloco do .md:
              - 1-3 slides de conteúdo (Tipos A, C, D ou E)
              - 1 slide Tipo F (Verificação) — OBRIGATÓRIO ao fim de CADA bloco
Penúltimo → Curiosidade "Você Sabia?" (Tipo D)
Último    → Revisão (3 bullets) + pergunta para casa
```

Ver tipos detalhados em `resources/tipos-slide.md`.

### Passo 5 — Gerar o `.pptx` E acumular o JSON de questões

Usar `resources/gerar_slides.js` como base.

**Regra cruzada importante:** cada slide Tipo F gerado **deve obrigatoriamente** ser também
gravado em `saida/questoes_temp.json` no formato:

```json
[
  {
    "enunciado": "Um mergulhador desce de 2m para 4m. Como a pressão muda?",
    "opcoes": ["Dobra...", "Aumenta...", "Permanece...", "Reduz..."],
    "correta": 1,
    "conceito": "Pressão Hidrostática"
  }
]
```

**Regras técnicas obrigatórias:**

- Slide 10" × 5.625" (16:9). Limites: `x+w ≤ 9.8"` e `y+h ≤ 5.4"`.
- **Fórmulas: Unicode estilizado por padrão** (Cambria Math). Ver `resources/formulas-unicode.md`.
- LaTeX (`mathType: "latex"`) só se o pacote `pptxgenjs-math` estiver instalado — não é o padrão.
- Fonte mínima 18pt em qualquer elemento visível.
- Créditos "Prof. Hérisson Chaves" + "Ciências da Natureza" obrigatórios na capa.

### Passo 6 — Executar o script

```bash
# Rodar sempre a partir da raiz do projeto
npm install --silent --prefix .agents/skills/criar-slides-fisica/resources   # uma vez
node .agents/skills/criar-slides-fisica/resources/gerar_slides.js
```

Saída: `saida/slides_<tema>_<YYYYMMDD>.pptx`

### Passo 7 — QA Visual (OBRIGATÓRIO)

```bash
python3 .agents/skills/criar-slides-fisica/resources/qa_visual.py \
  saida/slides_<tema>_<YYYYMMDD>.pptx
```

Inspecionar imagens em `saida/qa_preview/`. Procurar por (lista resumida — completa em `pptx/SKILL.md`):

| Sintoma | Causa | Correção |
|---------|-------|----------|
| Texto cortado à direita | `x+w > 9.8` | Reduzir w/x |
| Texto cortado embaixo | `y+h > 5.4` | Reduzir h ou fonte |
| Card transbordando | conteúdo > card | Reduzir texto ou aumentar card |
| Foto não carregou | URL inválida | Usar fallback |

Se encontrar overflow → corrigir → re-rodar Passo 6 → re-rodar QA. Não declarar sucesso
sem ao menos um ciclo de fix-and-verify.

### Passo 8 — Gerar a planilha Quizizz

```bash
python3 .agents/skills/criar-slides-fisica/resources/gerar_quizizz.py \
  --tema "<tema>" \
  --data "YYYYMMDD" \
  --questoes saida/questoes_temp.json \
  --saida saida/
```

**Filosofia de questões: ler `resources/filosofia-questoes.md` ANTES de gerar.**

A skill local **sobrescreve** a progressão padrão Fácil/Médio/Difícil da `quizizz-paper`:
todas as questões ficam no nível **Médio** (compreensão e aplicação). Sem prefixos
`[FÁCIL]/[MÉDIA]/[DIFÍCIL]` no enunciado — o gerador aplica essa exceção automaticamente.

Após gerar o `.xlsx`, **apagar** `saida/questoes_temp.json`.

### Passo 9 — Entregar

Reportar ao usuário com este formato:

```
✅ Slides:  saida/slides_<tema>_<YYYYMMDD>.pptx (N slides)
✅ Quizizz: saida/quizizz_<tema>_<YYYYMMDD>.xlsx (Q questões)

📋 Gabarito:
  Q1 [conceito] → opção X — "texto curto"
  ...

⚠️ Avisos (se houver):
  - Slide 2: foto fallback aplicada
  - Slide 7: LaTeX desativado, Unicode usado
```

---

## Seção 3 — Checklist final (executar antes de entregar)

### Estrutura
- [ ] `slides_*.pptx` em `saida/` com nome no padrão
- [ ] `quizizz_*.xlsx` em `saida/` com nome no padrão
- [ ] `qa_preview/` com imagens de cada slide
- [ ] `questoes_temp.json` removido

### Slides (mais detalhes em `slides-fisica-ensino-medio/SKILL.md`)
- [ ] Slide 1 e 2 com foto real validada (ou fallback documentado)
- [ ] Créditos do professor na capa
- [ ] Pergunta gancho no Slide 3
- [ ] Slide Tipo F ao fim de cada bloco
- [ ] Penúltimo: "Você Sabia?"
- [ ] Último: revisão + pergunta (não "Dúvidas?")
- [ ] Fonte ≥ 18pt em tudo
- [ ] Fundo claro em todos os slides
- [ ] `x+w ≤ 9.8` e `y+h ≤ 5.4` em todo addText
- [ ] Toda fórmula tem símbolo + legenda + exemplo numérico

### Quizizz (mais detalhes em `quizizz-paper/SKILL.md` + `resources/filosofia-questoes.md`)
- [ ] Uma questão por bloco de conceito
- [ ] Exatamente 4 alternativas
- [ ] Nenhuma questão de decoreba (passa pelo filtro anti-trivialidade)
- [ ] Distratores baseados em erros conceituais reais
- [ ] Enunciado ≤ 500 chars; alternativas ≤ 200 chars
- [ ] Override Médio aplicado (sem prefixos `[FÁCIL]/[MÉDIA]/[DIFÍCIL]`)
- [ ] Linhas em amarelo claro na planilha (com laranja para questões mais desafiadoras)

---

## Recursos auxiliares

| Arquivo | Conteúdo |
|---------|----------|
| `resources/filosofia-questoes.md` | Regras pedagógicas das questões (sobrescreve `quizizz-paper`) |
| `resources/paleta-cores.md` | Tabela tema → fundo/accent/título |
| `resources/tipos-slide.md` | Layouts dos 6 tipos de slide (A, B, C, D, E, F) |
| `resources/formulas-unicode.md` | Tabela de Unicode matemático estilizado |
| `resources/gerar_slides.js` | Template PptxGenJS (preencher placeholders e rodar) |
| `resources/gerar_quizizz.py` | Gerador openpyxl (rodar com `--help`) |
| `resources/qa_visual.py` | QA visual (LibreOffice + pdftoppm) |
