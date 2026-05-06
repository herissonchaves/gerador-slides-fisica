# Fórmulas em Unicode Estilizado (caminho padrão)

> Esta skill usa **Unicode estilizado por padrão**, com fonte `Cambria Math`.
> LaTeX (`mathType: "latex"`) só com `pptxgenjs-math` instalado — não é o caminho default.

## Por que Unicode

- Funciona em qualquer instalação de PptxGenJS sem dependência extra
- Renderiza igual no PowerPoint, Google Slides e LibreOffice Impress
- Sem risco de "código bruto" aparecer no slide quando o LaTeX falha

## Tabela de símbolos úteis

### Letras gregas

| Símbolo | Unicode | Uso típico |
|---------|---------|-----------|
| α | U+03B1 | aceleração angular |
| β | U+03B2 | ângulo |
| γ | U+03B3 | razão de calores específicos |
| Δ | U+0394 | variação (ΔT, ΔL, Δv) |
| ε | U+03B5 | permissividade |
| θ | U+03B8 | ângulo |
| λ | U+03BB | comprimento de onda |
| μ | U+03BC | coeficiente de atrito / micro |
| π | U+03C0 | pi |
| ρ | U+03C1 | densidade |
| Σ | U+03A3 | somatório |
| τ | U+03C4 | torque / tempo característico |
| φ | U+03C6 | fase / fluxo |
| ω | U+03C9 | velocidade angular / frequência angular |

### Operadores e símbolos

| Símbolo | Unicode | Uso |
|---------|---------|-----|
| · | U+00B7 | multiplicação (P = ρ·g·h) |
| × | U+00D7 | produto vetorial |
| ÷ | U+00F7 | divisão |
| ± | U+00B1 | mais ou menos |
| ≈ | U+2248 | aproximadamente |
| ≠ | U+2260 | diferente |
| ≤ | U+2264 | menor ou igual |
| ≥ | U+2265 | maior ou igual |
| ∞ | U+221E | infinito |
| √ | U+221A | raiz |
| ∫ | U+222B | integral |
| ∂ | U+2202 | derivada parcial |
| → | U+2192 | vetor / implica |
| ⇒ | U+21D2 | implica |

### Expoentes e índices

| Símbolo | Unicode | Uso |
|---------|---------|-----|
| ⁰ | U+2070 | 0 sobrescrito |
| ¹ | U+00B9 | 1 sobrescrito |
| ² | U+00B2 | quadrado |
| ³ | U+00B3 | cubo |
| ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ | U+2074..U+2079 | 4–9 sobrescrito |
| ⁻ | U+207B | sinal negativo sobrescrito (m⁻¹, s⁻²) |
| ₀ ₁ ₂ ... ₉ | U+2080..U+2089 | índices |

## Exemplos prontos para Física

| Conceito | Unicode pronto |
|----------|----------------|
| Pressão | `P = F/A` |
| Pressão hidrostática | `P = ρ·g·h` |
| Velocidade média | `v = Δs/Δt` |
| MUV | `S = S₀ + v₀·t + ½·a·t²` |
| Torricelli | `v² = v₀² + 2·a·Δs` |
| 2ª lei de Newton | `F = m·a` |
| Trabalho | `W = F·d·cos(θ)` |
| Energia cinética | `Eₖ = ½·m·v²` |
| Energia potencial | `Eₚ = m·g·h` |
| Dilatação linear | `ΔL = L₀·α·ΔT` |
| Lei dos gases | `P·V = n·R·T` |
| Lei de Coulomb | `F = k·(q₁·q₂)/r²` |
| Onda | `v = λ·f` |
| Frequência angular | `ω = 2·π·f` |
| Ohm | `U = R·i` |
| Potência elétrica | `P = U·i` |

## Como usar no PptxGenJS

```javascript
// Fórmula em destaque (Tipo A) — Cambria Math 48pt
slide.addText("P = ρ·g·h", {
  x: 1.5, y: 1.8, w: 7.0, h: 1.4,
  fontSize: 48,
  bold: true,
  color: "0369A1",       // accent da paleta
  fontFace: "Cambria Math",
  align: "center",
  valign: "middle"
});

// Legenda das variáveis (rich text para destacar símbolos)
slide.addText([
  { text: "P", options: { bold: true, color: "0369A1" } },
  { text: " = pressão (Pa)   ", options: { color: "374151" } },
  { text: "ρ", options: { bold: true, color: "0369A1" } },
  { text: " = densidade (kg/m³)   ", options: { color: "374151" } },
  { text: "g", options: { bold: true, color: "0369A1" } },
  { text: " = gravidade (m/s²)   ", options: { color: "374151" } },
  { text: "h", options: { bold: true, color: "0369A1" } },
  { text: " = profundidade (m)", options: { color: "374151" } }
], {
  x: 0.5, y: 3.3, w: 9.0, h: 0.7,
  fontSize: 18,
  align: "center",
  fontFace: "Calibri"
});
```

## Quando ainda assim usar LaTeX

Apenas se TODAS as condições abaixo forem verdadeiras:

1. `pptxgenjs-math` está instalado (`npm list pptxgenjs-math`)
2. A fórmula é complexa (frações empilhadas, integrais com limites, matrizes)
3. Você testou e o LaTeX renderiza no slide gerado

Sintaxe: `mathType: "latex"`, fórmula envolvida em `$$...$$`.

> Em caso de dúvida: **use Unicode**. O slide fica garantidamente legível.
