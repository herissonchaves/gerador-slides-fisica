# Paletas de Cor por Tema

> Esta tabela é a referência principal. Sempre escolher com base no **tema específico da aula**,
> evocando visualmente o assunto. Nunca usar fundo escuro.

## Tabela de paletas

| Tema | Fundo | Accent | Título/Texto | Card (derivado) |
|------|-------|--------|--------------|-----------------|
| Hidrostática / Fluidos | `F0F8FF` | `0369A1` | `0C4A6E` | `DBEAFE` |
| Cinemática / Movimento | `F0F4F8` | `0EA5E9` | `0C4A6E` | `E0F2FE` |
| Mecânica / Newton | `F0F4F8` | `0EA5E9` | `0C4A6E` | `E0F2FE` |
| Trabalho e Energia | `F0FDF4` | `16A34A` | `14532D` | `DCFCE7` |
| Termologia / Calor | `FFF7F0` | `EA580C` | `7C2D12` | `FED7AA` |
| Termodinâmica | `FFF7F0` | `EA580C` | `7C2D12` | `FED7AA` |
| Eletricidade / Circuitos | `EEF2FF` | `4F46E5` | `1E1B4B` | `E0E7FF` |
| Eletromagnetismo | `EEF2FF` | `4F46E5` | `1E1B4B` | `E0E7FF` |
| Eletrostática | `FEF3C7` | `D97706` | `78350F` | `FDE68A` |
| Óptica / Luz | `FFFBEB` | `F59E0B` | `78350F` | `FEF3C7` |
| Ondas / Som | `F0F9FF` | `0284C7` | `0C4A6E` | `BAE6FD` |
| Gravitação / Astronomia | `F5F3FF` | `7C3AED` | `2E1065` | `EDE9FE` |
| Física Moderna | `FDF4FF` | `9333EA` | `4A044E` | `F3E8FF` |

## Como derivar uma paleta nova

Se o tema não está na tabela:

1. Identifique **2–3 palavras visuais** que descrevem o tema
   (ex: "luz, espectro, refração" → laranja-âmbar)
2. **Fundo claro pastel** que evoque essas palavras (luminosidade alta)
3. **Accent vibrante** contrastante para fórmulas, bordas e destaques
4. **Título escuro** da mesma família do accent
5. **Card** = versão muito clara do accent (ex: accent `0284C7` → card `BAE6FD` ou `DBEAFE`)
6. **Texto de corpo** sempre `374151` (cinza-escuro neutro) sobre cards pastel

## Cores **proibidas** como fundo

`0D1B2A`, `1A1A2E`, `212121`, `000000`, qualquer cor com luminosidade < 70%.

## Faixas e elementos

- **Faixa "FÍSICA"** vertical no Slide 1: cor accent com transparência 10%
- **Faixa "CIÊNCIAS DA NATUREZA"** horizontal superior fina: accent puro, texto branco
- **Card de fórmula**: cor `cardBg` derivada, borda fina accent (1px)
- **Overlay sobre foto** (capa): preto com transparência 45% só na metade inferior
