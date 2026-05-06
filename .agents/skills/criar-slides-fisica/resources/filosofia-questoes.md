# Filosofia de Questões — Override da skill `quizizz-paper`

> Este documento **sobrescreve** a Seção "Progressão de Dificuldade" da skill global `quizizz-paper`.
> A skill global manda gerar 30% Fácil + 40% Médio + 30% Difícil com prefixos `[FÁCIL]/[MÉDIA]/[DIFÍCIL]`.
> **Aqui não.** Todas as questões ficam no nível **Médio** (compreensão e aplicação) e o enunciado
> aparece **limpo** para o aluno (sem prefixos).

---

## Princípio central: simples de ler, impossível de chutar

As questões devem ser:

- **Simples** — linguagem direta, sem jargão desnecessário, enunciado em 1–2 frases
- **Não triviais** — quem só copiou o caderno erra; quem entendeu o mecanismo acerta
- **Não decoreba** — nenhuma questão de definição, fórmula de cor ou nome de cientista
- **Baseadas em compreensão** — testam o *porquê*, não o *o quê*

---

## Filtro anti-trivialidade (aplicar a TODA questão antes de incluir)

| Pergunta | Resposta aceitável |
|----------|-------------------|
| Um aluno que não estudou conseguiria chutar com >50% de acerto? | **Não** → incluir. **Sim** → reescrever |
| A questão pode ser respondida pelo bom senso comum? | **Não** → incluir. **Sim** → reescrever |
| Memorizar a fórmula sem entender resolve? | **Não** → incluir. **Sim** → reescrever |
| Os distratores são erros conceituais reais? | **Sim** → incluir. **Não** → trocar distratores |

---

## Tipos de questão **PERMITIDOS**

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| Aplicação em situação nova | Contexto novo; aplicar o conceito | "Um balão sobe mais na montanha. Por quê?" |
| Previsão de comportamento | "Se X muda, o que acontece com Y?" | "Se a profundidade dobra, a pressão..." |
| Identificação de erro conceitual | "Um aluno disse que... Está certo?" | "Pedro disse que recipientes mais largos têm mais pressão. Está..." |
| Comparação entre casos | Dois cenários — qual tem maior X? | "Elefante ou mulher de salto agulha — quem exerce mais pressão no chão?" |
| Causa e consequência | Por que o fenômeno acontece? | "Por que a base de uma represa é mais espessa?" |

## Tipos **PROIBIDOS**

| Proibido | Exemplo | Por quê |
|----------|---------|---------|
| Definição direta | "O que é pressão hidrostática?" | Memorização |
| Fórmula de cor | "Qual a fórmula da pressão?" | Memorização |
| Nome de princípio | "Quem enunciou Pascal?" | Irrelevante |
| Cálculo mecânico | "Calcule P = 1000 × 10 × 3" | Aritmética substitui compreensão |
| Eliminação por absurdo | Distratores ridículos | Não mede nada |

---

## Distratores de qualidade

Cada distrator = **um erro conceitual real** comum. Fontes:

1. **Confusão com conceito parecido** (pressão × força)
2. **Inversão de relação** ("pressão diminui com profundidade")
3. **Raciocínio parcialmente correto** mas incompleto
4. **Extrapolação indevida** ("pressão depende do volume")

> ❌ Nunca use distratores absurdos. Se o aluno consegue eliminar uma opção sem saber Física,
> esse distrator é ruim.

---

## Quantidade de questões por aula

| Conceitos no `.md` | Questões |
|-------------------|----------|
| 1–2 | 2–4 |
| 3–4 | 4–6 |
| 5+ | 6–8 (máx 1 extra por conceito muito rico) |

Regra base: **uma questão por bloco `###`**. Se o bloco for muito rico (fórmula + aplicação + paradoxo),
até 2 questões para esse bloco.

---

## Cor das linhas no `.xlsx` (override)

| Skill global `quizizz-paper` | Aqui |
|-----------------------------|------|
| Verde para Fácil | **Proibido** — não geramos questão Fácil |
| Amarelo para Médio | **Padrão** — todas as questões |
| Laranja para Difícil | **Permitido excepcionalmente** se a questão for desafiadora |

Sem prefixo `[FÁCIL]/[MÉDIA]/[DIFÍCIL]` no Question Text. O enunciado vai limpo para o aluno.

---

## Exemplos: aceitável × inaceitável

**Tema: Pressão Hidrostática**

| ❌ Inaceitável | ✅ Aceitável |
|----------------|-------------|
| "Qual a fórmula da pressão hidrostática?" | "Se a densidade do líquido dobrar, mantendo h e g, a pressão no fundo..." |
| "O que é o Princípio de Pascal?" | "Macaco hidráulico com pistão 10× menor multiplica a força em quanto?" |
| "Quem descobriu o Paradoxo Hidrostático?" | "Dois recipientes com mesma altura, formatos diferentes. A pressão no fundo é..." |
| "A pressão depende de: a) volume b) formato c) profundidade d) temperatura" | "Mergulhador sente dor no ouvido descendo. Que grandeza explica?" |

**Tema: Cinemática**

| ❌ Inaceitável | ✅ Aceitável |
|----------------|-------------|
| "Qual a fórmula da velocidade média?" | "Carro A faz 60 km em 1h, carro B faz 30 km em 30min. Qual vai mais rápido?" |
| "O que é aceleração?" | "Carro dobra a velocidade. Como muda a distância de frenagem?" |

**Tema: Newton**

| ❌ Inaceitável | ✅ Aceitável |
|----------------|-------------|
| "Quem enunciou as 3 leis?" | "Livro em repouso na mesa. Qual a força resultante sobre ele?" |
| "O que é inércia?" | "Por que o passageiro 'vai pra frente' numa frenagem brusca?" |
