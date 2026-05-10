// ============================================================
// gerar_slides.js — Gerador PptxGenJS para aulas de Física EM
// Prof. Hérisson Chaves — Ciências da Natureza
//
// USO PELO AGENTE ANTIGRAVITY:
//   1. Ler entrada/<aula>.md, extrair frontmatter e blocos ###
//   2. Buscar fotos reais (Wikimedia/Unsplash/Pixabay) e validar URLs
//   3. Substituir os blocos [AGENTE: ...] abaixo pelos dados reais
//   4. Acumular cada questão Tipo F em saida/questoes_temp.json
//   5. Rodar: node gerar_slides.js
//
// Saída: ../../../../saida/slides_<tema>_<YYYYMMDD>.pptx
// ============================================================

const PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// ────────────────────────────────────────────────────────────
// CONFIGURAÇÃO — preenchida pelo agente a partir do .md
// ────────────────────────────────────────────────────────────

const config = {
  // [AGENTE: substituir pelos valores do frontmatter do .md]
  tema: "Hidrostática",
  topico: "Pressão Hidrostática",
  serie: "2º Ano",
  data: "20250615",         // YYYYMMDD

  // [AGENTE: escolher da tabela em resources/paleta-cores.md]
  paleta: {
    fundo: "F0F8FF",
    accent: "0369A1",
    titulo: "0C4A6E",
    cardBg: "DBEAFE",
    textBody: "374151"
  },

  // [AGENTE: URLs validadas via web_search + web_fetch]
  fotoCapa: "[AGENTE: URL Wikimedia/Unsplash validada para capa]",
  fotoAbertura: "[AGENTE: URL Wikimedia/Unsplash validada para slide 2]",

  // Pasta de saída — relativa a este script
  pastaSaida: path.resolve(__dirname, "../../../../saida")
};

// ────────────────────────────────────────────────────────────
// CONSTANTES DE LAYOUT
// ────────────────────────────────────────────────────────────

const SLIDE_W = 10.0;     // polegadas (16:9)
const SLIDE_H = 5.625;
const MARGEM_X = 0.5;
const MARGEM_Y = 0.4;

// ────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────

function fundoClaro(slide) {
  slide.background = { fill: config.paleta.fundo };
}

function rodapeAula(slide) {
  slide.addText(
    `${config.topico}  •  ${config.serie}  •  Prof. Hérisson Chaves`,
    {
      x: 0.3, y: 5.25, w: 9.4, h: 0.3,
      fontSize: 11,
      color: config.paleta.titulo,
      align: "right",
      fontFace: "Calibri"
    }
  );
}

// ────────────────────────────────────────────────────────────
// SLIDE 1 — CAPA (foto real + faixa FÍSICA + créditos)
// ────────────────────────────────────────────────────────────

function slideCapa(pptx) {
  const slide = pptx.addSlide();
  fundoClaro(slide);

  // Foto cobrindo o slide
  slide.addImage({
    path: config.fotoCapa,
    x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
    sizing: { type: "cover", w: SLIDE_W, h: SLIDE_H }
  });

  // Faixa superior — componente curricular
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 8.2, h: 0.55,
    fill: { color: config.paleta.accent }
  });
  slide.addText("CIÊNCIAS DA NATUREZA", {
    x: 0.1, y: 0, w: 8.0, h: 0.55,
    fontSize: 18, bold: true, color: "FFFFFF",
    align: "center", valign: "middle"
  });

  // Faixa vertical direita — palavra FÍSICA
  slide.addShape(pptx.ShapeType.rect, {
    x: 8.2, y: 0, w: 1.8, h: SLIDE_H,
    fill: { color: config.paleta.accent, transparency: 10 }
  });
  slide.addText("FÍSICA", {
    x: 8.2, y: 1.5, w: 1.8, h: 3.0,
    fontSize: 36, bold: true, color: "FFFFFF",
    align: "center", valign: "middle", rotate: 270
  });

  // Overlay escuro inferior
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 3.7, w: 8.2, h: 1.925,
    fill: { color: "000000", transparency: 45 }
  });

  // Título principal — substituir por título impactante (não "Pressão Hidrostática")
  slide.addText(
    "[AGENTE: TÍTULO IMPACTANTE — ex: 'POR QUE NAVIOS NÃO AFUNDAM?']",
    {
      x: 0.3, y: 3.85, w: 7.7, h: 1.0,
      fontSize: 36, bold: true, color: "FFFFFF",
      valign: "middle"
    }
  );

  // Crédito
  slide.addText("Prof. Hérisson Chaves", {
    x: 0.3, y: 4.95, w: 7.7, h: 0.5,
    fontSize: 20, bold: true, color: "FFFFFF", align: "right"
  });
}

// ────────────────────────────────────────────────────────────
// SLIDE 2 — ABERTURA VISUAL DO SUBTÓPICO
// ────────────────────────────────────────────────────────────

function slideAbertura(pptx) {
  const slide = pptx.addSlide();
  fundoClaro(slide);

  // Foto ocupa ~65% superior
  slide.addImage({
    path: config.fotoAbertura,
    x: 0, y: 0.55, w: SLIDE_W, h: 3.65,
    sizing: { type: "cover", w: SLIDE_W, h: 3.65 }
  });

  // Faixa superior
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: SLIDE_W, h: 0.55,
    fill: { color: config.paleta.titulo }
  });
  slide.addText("CIÊNCIAS DA NATUREZA", {
    x: 0, y: 0, w: SLIDE_W, h: 0.55,
    fontSize: 18, bold: true, color: "FFFFFF",
    align: "center", valign: "middle"
  });

  // Faixa inferior — nome do subtópico
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 4.2, w: SLIDE_W, h: 1.425,
    fill: { color: config.paleta.accent }
  });
  slide.addText(config.topico.toUpperCase(), {
    x: 0.5, y: 4.2, w: 9.0, h: 1.425,
    fontSize: 32, bold: true, color: "FFFFFF",
    align: "center", valign: "middle"
  });
}

// ────────────────────────────────────────────────────────────
// SLIDE 3 — PERGUNTA GANCHO (Tipo B)
// ────────────────────────────────────────────────────────────

function slidePerguntaGancho(pptx, pergunta) {
  const slide = pptx.addSlide();
  fundoClaro(slide);

  // Forma decorativa accent semitransparente
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 7.5, y: -1.0, w: 4.5, h: 4.5,
    fill: { color: config.paleta.accent, transparency: 85 }
  });

  // Ícone interrogação grande
  slide.addText("❓", {
    x: 0.5, y: 1.0, w: 1.5, h: 1.5,
    fontSize: 80, align: "center", valign: "middle"
  });

  // Pergunta
  slide.addText(pergunta, {
    x: 1.8, y: 1.4, w: 7.5, h: 2.8,
    fontSize: 30, bold: true, color: config.paleta.titulo,
    valign: "middle", fontFace: "Calibri"
  });

  rodapeAula(slide);
}

// ────────────────────────────────────────────────────────────
// SLIDE TIPO A — Fórmula em destaque (Unicode)
// ────────────────────────────────────────────────────────────

function slideFormula(pptx, titulo, formulaUnicode, legendaRich, exemploTexto) {
  const slide = pptx.addSlide();
  fundoClaro(slide);

  // Título
  slide.addText(titulo, {
    x: 0.5, y: 0.4, w: 9.0, h: 0.7,
    fontSize: 32, bold: true, color: config.paleta.titulo
  });

  // Fórmula gigante (Cambria Math)
  slide.addText(formulaUnicode, {
    x: 1.0, y: 1.3, w: 8.0, h: 1.3,
    fontSize: 48, bold: true, color: config.paleta.accent,
    fontFace: "Cambria Math",
    align: "center", valign: "middle"
  });

  // Card legenda
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 2.8, w: 9.0, h: 0.9,
    fill: { color: config.paleta.cardBg },
    line: { color: config.paleta.accent, width: 1 },
    rectRadius: 0.1
  });
  slide.addText(legendaRich, {
    x: 0.7, y: 2.85, w: 8.6, h: 0.8,
    fontSize: 18, color: config.paleta.textBody,
    align: "center", valign: "middle", fontFace: "Calibri"
  });

  // Exemplo numérico
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 3.85, w: 9.0, h: 1.2,
    fill: { color: "FFFFFF" },
    line: { color: config.paleta.accent, width: 1.5 },
    rectRadius: 0.1
  });
  slide.addText([
    { text: "EXEMPLO  ", options: { bold: true, color: config.paleta.accent } },
    { text: exemploTexto, options: { color: config.paleta.textBody } }
  ], {
    x: 0.8, y: 3.95, w: 8.4, h: 1.0,
    fontSize: 20, valign: "middle", fontFace: "Calibri"
  });

  rodapeAula(slide);
}

// ────────────────────────────────────────────────────────────
// SLIDE TIPO D — Curiosidade "Você Sabia?"
// ────────────────────────────────────────────────────────────

function slideVoceSabia(pptx, fato, conexao) {
  const slide = pptx.addSlide();
  fundoClaro(slide);

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.7, y: 0.8, w: 8.6, h: 4.0,
    fill: { color: "FFFFFF" },
    line: { color: config.paleta.accent, width: 3 },
    rectRadius: 0.2
  });

  slide.addText("💡  VOCÊ SABIA?", {
    x: 1.0, y: 1.0, w: 8.0, h: 0.7,
    fontSize: 22, bold: true, color: config.paleta.accent
  });

  slide.addText(fato, {
    x: 1.0, y: 1.9, w: 8.0, h: 1.6,
    fontSize: 24, bold: true, color: config.paleta.titulo,
    valign: "top", fontFace: "Calibri"
  });

  slide.addText(conexao, {
    x: 1.0, y: 3.7, w: 8.0, h: 0.9,
    fontSize: 18, italic: true, color: config.paleta.textBody,
    valign: "top", fontFace: "Calibri"
  });

  rodapeAula(slide);
}

// ────────────────────────────────────────────────────────────
// SLIDE TIPO F — Verificação de Aprendizagem
// E gravação no JSON de questões para o Quizizz
// ────────────────────────────────────────────────────────────

const bancoQuestoes = [];

function slideVerificacao(pptx, conceito, enunciado, alternativas, indiceCorreta) {
  // Salva no banco para o Quizizz
  bancoQuestoes.push({
    enunciado,
    opcoes: alternativas,
    correta: indiceCorreta,    // 1..4
    conceito
  });

  const slide = pptx.addSlide();
  // Fundo levemente mais saturado, ainda claro
  slide.background = { fill: config.paleta.cardBg };

  // Cabeçalho
  slide.addText("✅  HORA DE VERIFICAR", {
    x: 0.5, y: 0.3, w: 9.0, h: 0.6,
    fontSize: 20, bold: true, color: config.paleta.accent
  });

  // Enunciado
  slide.addText(enunciado, {
    x: 0.5, y: 1.0, w: 9.0, h: 1.5,
    fontSize: 22, bold: true, color: config.paleta.titulo,
    valign: "top", fontFace: "Calibri"
  });

  // Grid 2x2 alternativas
  const letras = ["A", "B", "C", "D"];
  const posicoes = [
    { x: 0.5, y: 2.7 }, { x: 5.1, y: 2.7 },
    { x: 0.5, y: 4.0 }, { x: 5.1, y: 4.0 }
  ];

  alternativas.forEach((texto, i) => {
    const { x, y } = posicoes[i];
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 4.4, h: 1.15,
      fill: { color: "FFFFFF" },
      line: { color: config.paleta.accent, width: 1 },
      rectRadius: 0.1
    });
    slide.addText([
      { text: `${letras[i]})  `, options: { bold: true, color: config.paleta.accent } },
      { text: texto, options: { color: config.paleta.textBody } }
    ], {
      x: x + 0.2, y: y + 0.1, w: 4.0, h: 0.95,
      fontSize: 18, valign: "middle", fontFace: "Calibri"
    });
  });
}

// ────────────────────────────────────────────────────────────
// SLIDE FINAL — Revisão
// ────────────────────────────────────────────────────────────

function slideFinal(pptx, bullets, perguntaCasa) {
  const slide = pptx.addSlide();
  fundoClaro(slide);

  slide.addText("O QUE FICA DESTA AULA", {
    x: 0.5, y: 0.4, w: 9.0, h: 0.7,
    fontSize: 32, bold: true, color: config.paleta.titulo
  });

  bullets.forEach((b, i) => {
    slide.addText(`${b.icone}  ${b.texto}`, {
      x: 0.7, y: 1.4 + i * 0.85, w: 8.6, h: 0.75,
      fontSize: 22, color: config.paleta.textBody,
      valign: "middle", fontFace: "Calibri"
    });
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 4.2, w: 9.0, h: 0.95,
    fill: { color: config.paleta.cardBg },
    line: { color: config.paleta.accent, width: 1.5 },
    rectRadius: 0.1
  });
  slide.addText([
    { text: "PARA PENSAR EM CASA  ", options: { bold: true, color: config.paleta.accent } },
    { text: perguntaCasa, options: { color: config.paleta.titulo, italic: true } }
  ], {
    x: 0.7, y: 4.25, w: 8.6, h: 0.85,
    fontSize: 20, valign: "middle", fontFace: "Calibri"
  });
}

// ────────────────────────────────────────────────────────────
// MONTAGEM DA APRESENTAÇÃO
// ────────────────────────────────────────────────────────────

function montarApresentacao() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";        // 13.333 × 7.5 padrão; vamos forçar 16:9 customizado
  pptx.defineLayout({ name: "16x9", width: SLIDE_W, height: SLIDE_H });
  pptx.layout = "16x9";

  pptx.author = "Prof. Hérisson Chaves";
  pptx.company = "Ciências da Natureza";
  pptx.title = `${config.topico} — ${config.serie}`;

  // Slide 1
  slideCapa(pptx);
  // Slide 2
  slideAbertura(pptx);

  // Slide 3 — pergunta gancho
  // [AGENTE: substituir pela pergunta do banco da skill global ou criar uma]
  slidePerguntaGancho(
    pptx,
    "[AGENTE: pergunta gancho — ex: 'Por que a base de uma represa é mais espessa que o topo, se a água é a mesma?']"
  );

  // [AGENTE: para cada bloco ### do .md, gerar:
  //   - 1-3 slides de conteúdo (Tipo A/C/E conforme apropriado)
  //   - 1 slide Tipo F (Verificação) usando slideVerificacao(...)]
  //
  // EXEMPLO de bloco Tipo A + Tipo F:
  /*
  slideFormula(
    pptx,
    "Pressão Hidrostática",
    "P = ρ · g · h",
    [
      { text: "P", options: { bold: true, color: config.paleta.accent } },
      { text: " = pressão (Pa)   ", options: {} },
      { text: "ρ", options: { bold: true, color: config.paleta.accent } },
      { text: " = densidade (kg/m³)   ", options: {} },
      { text: "g", options: { bold: true, color: config.paleta.accent } },
      { text: " = gravidade (m/s²)   ", options: {} },
      { text: "h", options: { bold: true, color: config.paleta.accent } },
      { text: " = profundidade (m)", options: {} }
    ],
    "Mergulhador a 10 m em água doce: P = 1000 · 10 · 10 = 100 000 Pa (≈ 1 atm extra)"
  );

  slideVerificacao(
    pptx,
    "Pressão Hidrostática",
    "Um mergulhador desce de 2 m para 4 m. Como a pressão hidrostática sobre ele varia?",
    [
      "Dobra, porque a profundidade dobrou",
      "Aumenta, mas a relação não é direta",
      "Permanece igual — não depende da profundidade",
      "Reduz à metade — a coluna acima 'empurra' menos"
    ],
    1   // letra A é correta
  );
  */

  // Penúltimo — Você Sabia?
  slideVoceSabia(
    pptx,
    "[AGENTE: fato surpreendente — ex: 'A pressão sobre seus tímpanos a 10 m de profundidade é 2× a pressão atmosférica que você sente agora.']",
    "[AGENTE: conexão com a aula]"
  );

  // Último — Revisão
  slideFinal(
    pptx,
    [
      { icone: "🌊", texto: "[AGENTE: ideia 1]" },
      { icone: "📐", texto: "[AGENTE: ideia 2]" },
      { icone: "🔬", texto: "[AGENTE: ideia 3]" }
    ],
    "[AGENTE: pergunta para casa]"
  );

  // ────────────────────────────────────────────────────────────
  // Salvar arquivos
  // ────────────────────────────────────────────────────────────
  const temaSlug = config.tema.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

  const nomePptx = `slides_${temaSlug}_${config.data}.pptx`;
  const caminhoPptx = path.join(config.pastaSaida, nomePptx);

  if (!fs.existsSync(config.pastaSaida)) fs.mkdirSync(config.pastaSaida, { recursive: true });

  pptx.writeFile({ fileName: caminhoPptx }).then(() => {
    console.log(`✅ PPTX gerado: ${caminhoPptx}`);

    // Gravar JSON de questões para o gerador Quizizz
    const caminhoJson = path.join(config.pastaSaida, "questoes_temp.json");
    fs.writeFileSync(caminhoJson, JSON.stringify(bancoQuestoes, null, 2), "utf8");
    console.log(`✅ JSON de questões: ${caminhoJson} (${bancoQuestoes.length} questões)`);
  }).catch(err => {
    console.error("❌ Erro ao salvar PPTX:", err);
    process.exit(1);
  });
}

// ────────────────────────────────────────────────────────────
montarApresentacao();
