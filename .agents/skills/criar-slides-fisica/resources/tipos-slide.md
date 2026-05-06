# Tipos de Slide

Referência de layout. Detalhes pedagógicos completos em `slides-fisica-ensino-medio/SKILL.md`.

| Tipo | Nome | Quando usar |
|------|------|-------------|
| Capa | Slide 1 | Sempre — abertura |
| Abertura Visual | Slide 2 | Sempre — foto do tópico |
| B | Pergunta Gancho | Slide 3 + ao introduzir cada novo bloco |
| A | Fórmula em Destaque | Conceitos com equação central |
| C | Comparação / Analogia | Conceitos abstratos com paralelo cotidiano |
| D | Curiosidade "Você Sabia?" | Penúltimo slide + após conceitos surpresa |
| E | Diagrama / Processo | Fenômenos em etapas (ciclos, transformações) |
| F | Verificação | **Obrigatório ao fim de cada bloco** |
| Revisão | Último slide | Sempre — fechamento + pergunta |

---

## Tipo A — Fórmula em Destaque

```
Layout (10" × 5.625"):
┌─────────────────────────────────────────────┐
│ Título do conceito (36pt bold, cor título)  │  ← y=0.3, h=0.7
│                                             │
│        FÓRMULA GIGANTE (44-48pt accent)     │  ← y=1.5, h=1.3
│                                             │
│ ┌────── Card pastel ──────────────────────┐ │
│ │ P = pressão (Pa), ρ = densidade...      │ │  ← y=3.2, h=0.7 (legenda)
│ └─────────────────────────────────────────┘ │
│                                             │
│ Exemplo numérico real (caixa accent)        │  ← y=4.2, h=0.9
└─────────────────────────────────────────────┘
```

A fórmula deve ser o maior elemento. Sempre tem 3 partes: **símbolo + legenda + exemplo numérico**.

---

## Tipo B — Pergunta Gancho

```
Layout: fundo claro com forma geométrica accent em opacity 10-15%
├── Ícone grande ou emoji (60pt+)
├── Pergunta em 2-3 linhas (28-32pt bold, cor escura)
└── [SEM resposta — gera suspense]
```

Use perguntas do banco da skill global ou crie novas no estilo:
*"Por que [fato cotidiano] acontece?"* — algo que o aluno acha que sabe mas não sabe.

---

## Tipo C — Comparação / Analogia

```
Layout duas colunas (50/50):
┌───────────────────┬──────────────────────┐
│ COTIDIANO         │ FÍSICA               │
│ (foto/ícone)      │ (fórmula/diagrama)   │
│ "Mangueira com o  │ Princípio de Venturi │
│  dedo"            │ A·v = constante      │
└───────────────────┴──────────────────────┘
```

Pares úteis: mangueira/Venturi, pneu/gases, elevador/peso aparente, raio-trovão/luz-som.

---

## Tipo D — Curiosidade "Você Sabia?"

```
Layout: card central com borda accent 2pt
├── Cabeçalho: "💡 VOCÊ SABIA?" (20pt bold accent)
├── Fato surpreendente (22pt bold, 2-3 linhas)
└── Conexão com a aula (18pt itálico, cor texto)
```

Formato preferido: *"Toda vez que você [ação cotidiana], você está usando [conceito]."*

---

## Tipo E — Diagrama / Processo

```
Layout: fluxo horizontal ou vertical
[Etapa 1]──→[Etapa 2]──→[Etapa 3]──→[Etapa 4]
  ícone       ícone      ícone       ícone
  label       label      label       label
```

Cada etapa: ícone + label curto (≤ 3 palavras, 18pt). Cores derivadas da paleta.

---

## Tipo F — Verificação de Aprendizagem ⚡

**OBRIGATÓRIO ao fim de cada bloco de conteúdo.**

```
Layout:
┌─────────────────────────────────────────────┐
│ ✅ HORA DE VERIFICAR  (20pt bold accent)    │  ← cabeçalho fixo
│                                             │
│ ENUNCIADO DA QUESTÃO (22-26pt bold)         │  ← y=1.0, h=1.5
│                                             │
│ ┌─────────────┬─────────────────────────┐   │  ← grid 2x2 alternativas
│ │ A) opção 1  │ B) opção 2              │   │     y=2.8, h=1.2 cada
│ ├─────────────┼─────────────────────────┤   │
│ │ C) opção 3  │ D) opção 4              │   │
│ └─────────────┴─────────────────────────┘   │
└─────────────────────────────────────────────┘
```

- Fundo levemente mais saturado que os outros (mas ainda claro)
- Cada alternativa: card pastel + borda fina accent
- **Nenhuma alternativa marcada como correta no slide** — a resposta vem na discussão
- Letra (A/B/C/D) em accent + texto em cor de corpo

**Importante:** ao gerar este slide, **também** acumular a questão em `saida/questoes_temp.json`
(formato no SKILL.md, Passo 5). Esse JSON alimenta o gerador do `.xlsx` Quizizz.

### Checklist da questão Tipo F

- [ ] Enunciado em ≤ 200 caracteres
- [ ] Aluno que não estudou erra com >50% de chance?
- [ ] Os 4 distratores são plausíveis?
- [ ] Testa o **mecanismo**, não a definição?

---

## Slide Final — Revisão

```
Layout:
├── Título: "O QUE FICA DESTA AULA" (36pt bold)
├── 3 bullets com ícones (24pt cada bullet)
│   • [ícone] ideia 1
│   • [ícone] ideia 2
│   • [ícone] ideia 3
└── Pergunta para casa (28pt itálico, em destaque)
```

**Proibido** que o último slide seja só "Dúvidas?".

---

## Limites técnicos (PptxGenJS)

- Slide: **10" × 5.625"** (16:9)
- Margem segura: `x+w ≤ 9.8` e `y+h ≤ 5.4`
- Margem mínima das bordas: `0.3"` (recomenda-se `0.5"`)
- Fonte mínima visível: **18pt**
- Toda foto: validar URL antes de incluir
