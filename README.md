# Slides de Física — Agente Antigravity

Agente que converte roteiros de aula em Markdown (`.md`) em **dois entregáveis simultâneos**:
uma apresentação PowerPoint didática (`.pptx`) e uma planilha Quizizz Paper Mode (`.xlsx`),
para o Ensino Médio — Prof. Hérisson Chaves.

---

## Estrutura do Projeto

```
gerador-slides-fisica/
│
├── AGENT.md                              ← Instrução principal do agente
├── README.md                             ← Este arquivo
├── run.sh                                ← Workflow completo automatizado
│
├── entrada/                              ← 📥 Depositar aqui o .md do roteiro
│   └── exemplo_aula.md                   ← Template de referência (Pressão Hidrostática)
│
├── saida/                                ← 📤 Saídas geradas pelo agente
│   ├── slides_<tema>_<data>.pptx         ← Apresentação para o datashow
│   ├── quizizz_<tema>_<data>.xlsx        ← Planilha Quizizz Paper Mode
│   └── qa_preview/                       ← Imagens de inspeção visual (não é entregável)
│
└── .agents/
    └── skills/
        └── criar-slides-fisica/
            ├── SKILL.md                  ← Workflow detalhado (9 passos)
            ├── resources/
            │   ├── filosofia-questoes.md ← Regras das questões (override)
            │   ├── paleta-cores.md       ← Tabela tema → cores
            │   ├── tipos-slide.md        ← Layouts dos 6 tipos
            │   ├── formulas-unicode.md   ← Tabela Unicode matemático
            │   ├── gerar_slides.js       ← Template PptxGenJS
            │   ├── gerar_quizizz.py      ← Gerador openpyxl
            │   ├── qa_visual.py          ← QA visual (LibreOffice + pdftoppm)
            │   └── package.json
            └── examples/
                └── exemplo_aula.md
```

> **Importante:** o agente Antigravity ativa skills lendo `description` no frontmatter de
> `.agents/skills/<nome>/SKILL.md`. Por isso a SKILL fica em `.agents/skills/criar-slides-fisica/`
> e nunca solta na raiz.

---

## Como Usar

### 1. Prepare o roteiro da aula

Crie ou edite `entrada/<minha_aula>.md` seguindo o formato do `exemplo_aula.md`:

```markdown
---
tema: Termologia
topico: Dilatação Térmica
serie: 2º Ano
data: 2025-07-10
---

## Objetivos da Aula
...

## Conceitos e Esquemas

### 1. Dilatação Linear
ΔL = L₀ · α · ΔT
...
```

### 2. Acione o agente no Antigravity

```
Crie os slides da aula em entrada/minha_aula.md
```

### 3. O agente irá automaticamente:

1. Ler e analisar o `.md`
2. Pesquisar fotos reais (Wikimedia/Unsplash/Pixabay) e verificar fatos
3. Escolher paleta temática (`resources/paleta-cores.md`)
4. Montar o roteiro: capa → gancho → conteúdo → verificações → revisão
5. Gerar o script PptxGenJS, executar e produzir o `.pptx`
6. Fazer QA visual (converter em JPEGs e inspecionar)
7. Construir questões (uma por bloco, nível Médio, sem decoreba)
8. Gerar a planilha `.xlsx` para Quizizz Paper Mode
9. Confirmar os dois arquivos em `saida/` e exibir relatório final

### 4. Confira os entregáveis

- Abra `saida/slides_<tema>_<data>.pptx` no PowerPoint ou Google Slides
- Inspecione `saida/qa_preview/` para verificação visual rápida
- Importe `saida/quizizz_<tema>_<data>.xlsx` em Quizizz → Criar → Importar → Paper Mode

### Alternativa: rodar manualmente

```bash
./run.sh entrada/minha_aula.md
```

---

## Instalação das Dependências

### Node.js (PptxGenJS)
```bash
cd .agents/skills/criar-slides-fisica/resources/
npm install
```

### Python — openpyxl + LibreOffice + Poppler (Quizizz + QA Visual)
```bash
# Ubuntu / Raspberry Pi OS / Debian
sudo apt-get install libreoffice poppler-utils
pip install openpyxl --break-system-packages
```

```bash
# macOS
brew install --cask libreoffice
brew install poppler
pip3 install openpyxl
```

---

## Formato do Arquivo de Entrada

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `tema` | ✅ | Tema geral (ex: "Hidrostática") |
| `topico` | ✅ | Tópico específico (ex: "Pressão Hidrostática") |
| `serie` | ✅ | Série do EM (1º, 2º ou 3º Ano) |
| `data` | ❌ | Data da aula (formato YYYY-MM-DD) |
| `## Objetivos da Aula` | ❌ | Lista de objetivos |
| `## Conceitos e Esquemas` | ✅ | Seções `###` com cada conceito |
| `## Curiosidades` | ❌ | Fatos cotidianos (alimentam o "Você Sabia?") |
| `## Questões para Verificação` | ❌ | Sugestões para slides Tipo F e Quizizz |

> **Dica:** quanto mais detalhado o `.md`, mais rico o slide. Mas mesmo um `.md` simples
> (só os títulos dos conceitos) já é suficiente — o agente pesquisa na internet e enriquece.

---

## Fórmulas Matemáticas

O agente usa **Unicode estilizado** com fonte `Cambria Math` por padrão:

```
P = ρ·g·h        ← renderização garantida em qualquer ambiente
ΔL = L₀·α·ΔT
Eₖ = ½·m·v²
v² = v₀² + 2·a·Δs
```

Tabela completa de símbolos: `.agents/skills/criar-slides-fisica/resources/formulas-unicode.md`.

LaTeX (`mathType: "latex"`) só é usado se `pptxgenjs-math` estiver instalado — não é o padrão.

---

## Saída Gerada

| Arquivo | Descrição | Como usar |
|---------|-----------|-----------|
| `saida/slides_<tema>_<YYYYMMDD>.pptx` | Apresentação completa | Abrir no PowerPoint / projetar |
| `saida/quizizz_<tema>_<YYYYMMDD>.xlsx` | Planilha Quizizz Paper Mode | Importar em Quizizz → Paper Mode |
| `saida/qa_preview/slide-NN.jpg` | Imagens JPEG dos slides (apenas QA) | Inspeção visual rápida |

---

## Filosofia Pedagógica das Questões

> Override intencional da skill global `quizizz-paper`.

Todas as questões ficam no **nível Médio** (compreensão e aplicação). Sem prefixos
`[FÁCIL]/[MÉDIA]/[DIFÍCIL]` no enunciado. Linhas em amarelo claro na planilha (laranja
para questões mais desafiadoras).

**Proibido:** definição direta, fórmula de cor, nome de cientista, cálculo mecânico.
**Preferido:** aplicação em situação nova, previsão de comportamento, identificação de
erro conceitual, comparação entre casos, causa e consequência.

Detalhes em `.agents/skills/criar-slides-fisica/resources/filosofia-questoes.md`.
