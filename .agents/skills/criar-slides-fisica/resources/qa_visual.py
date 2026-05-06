#!/usr/bin/env python3
# ============================================================
# qa_visual.py — QA visual de apresentações .pptx
# Prof. Hérisson Chaves — Ciências da Natureza
#
# Converte um .pptx em PDF (via LibreOffice headless) e depois
# em imagens JPEG (via pdftoppm) para inspeção visual rápida.
#
# USO:
#   python3 qa_visual.py saida/slides_<tema>_<data>.pptx
#
# As imagens vão para saida/qa_preview/slide-NN.jpg
# ============================================================

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path


def cmd_existe(cmd: str) -> bool:
    return shutil.which(cmd) is not None


def converter_para_pdf(pptx: Path, pasta_tmp: Path) -> Path:
    """Usa LibreOffice headless para gerar PDF."""
    if not cmd_existe("libreoffice") and not cmd_existe("soffice"):
        print("⚠️  LibreOffice não instalado — QA visual ignorado.")
        print("   Ubuntu/Debian: sudo apt install libreoffice")
        print("   macOS:         brew install --cask libreoffice")
        sys.exit(2)

    binario = "libreoffice" if cmd_existe("libreoffice") else "soffice"
    pasta_tmp.mkdir(parents=True, exist_ok=True)
    cmd = [
        binario, "--headless", "--convert-to", "pdf",
        "--outdir", str(pasta_tmp), str(pptx),
    ]
    print(f"🔄 Convertendo {pptx.name} → PDF (LibreOffice)...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("❌ Erro na conversão para PDF:")
        print(res.stderr or res.stdout)
        sys.exit(1)

    pdf = pasta_tmp / (pptx.stem + ".pdf")
    if not pdf.exists():
        print(f"❌ PDF não foi gerado em {pdf}")
        sys.exit(1)
    return pdf


def pdf_para_imagens(pdf: Path, pasta_imgs: Path, dpi: int = 150) -> list[Path]:
    """Converte cada página em JPEG via pdftoppm."""
    if not cmd_existe("pdftoppm"):
        print("⚠️  pdftoppm não instalado — QA visual ignorado.")
        print("   Ubuntu/Debian: sudo apt install poppler-utils")
        print("   macOS:         brew install poppler")
        sys.exit(2)

    pasta_imgs.mkdir(parents=True, exist_ok=True)
    # Limpar imagens antigas
    for old in pasta_imgs.glob("slide-*.jpg"):
        old.unlink()

    prefixo = pasta_imgs / "slide"
    cmd = ["pdftoppm", "-jpeg", "-r", str(dpi), str(pdf), str(prefixo)]
    print(f"🖼️  Gerando JPEGs em {pasta_imgs}/ (DPI={dpi})...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("❌ Erro no pdftoppm:")
        print(res.stderr or res.stdout)
        sys.exit(1)

    return sorted(pasta_imgs.glob("slide-*.jpg"))


def main():
    p = argparse.ArgumentParser(description="QA visual de .pptx — converte em JPEGs para inspeção.")
    p.add_argument("pptx", help="Caminho do arquivo .pptx")
    p.add_argument("--saida", help="Pasta de saída do qa_preview (default: <pasta_do_pptx>/qa_preview)")
    p.add_argument("--dpi", type=int, default=150, help="DPI das imagens (default: 150)")
    args = p.parse_args()

    pptx = Path(args.pptx).resolve()
    if not pptx.exists():
        print(f"❌ Arquivo não encontrado: {pptx}")
        sys.exit(1)
    if pptx.suffix.lower() != ".pptx":
        print(f"❌ O arquivo precisa ser .pptx (recebido: {pptx.suffix})")
        sys.exit(1)

    pasta_imgs = Path(args.saida) if args.saida else (pptx.parent / "qa_preview")
    pasta_tmp = pptx.parent / "_pdf_tmp"

    try:
        pdf = converter_para_pdf(pptx, pasta_tmp)
        imagens = pdf_para_imagens(pdf, pasta_imgs, args.dpi)
    finally:
        # Limpar pasta temporária do PDF
        if pasta_tmp.exists():
            for f in pasta_tmp.glob("*"):
                f.unlink()
            pasta_tmp.rmdir()

    print(f"\n✅ {len(imagens)} imagem(ns) gerada(s) em {pasta_imgs}/")
    print("\n📋 Arquivos para inspecionar:")
    for img in imagens:
        print(f"   {img}")
    print("\n💡 Procure por: texto cortado, fonte < 18pt, fotos não carregadas, cards transbordando.")


if __name__ == "__main__":
    main()
