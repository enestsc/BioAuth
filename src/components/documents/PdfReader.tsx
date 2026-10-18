"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LoaderCircle, Minus, Plus } from "lucide-react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from "pdfjs-dist";

function PdfPage({ pdf, pageNumber, width, zoom }: { pdf: PDFDocumentProxy; pageNumber: number; width: number; zoom: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState(true);
  const [error, setError] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    let cancelled = false;
    let task: RenderTask | undefined;
    async function render() {
      try {
        const page = await pdf.getPage(pageNumber);
        if (cancelled || !canvas.current) return;
        const base = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: (width / base.width) * (zoom / 100) });
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const element = canvas.current;
        element.width = Math.floor(viewport.width * ratio);
        element.height = Math.floor(viewport.height * ratio);
        element.style.width = `${viewport.width}px`;
        element.style.height = `${viewport.height}px`;
        task = page.render({ canvas: element, viewport, transform: ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0] });
        await task.promise;
        if (cancelled) return;
        setRendering(false);
        const content = await page.getTextContent();
        if (!cancelled) setText(content.items.map(item => "str" in item ? item.str : "").join(" "));
      } catch (reason) {
        if (!cancelled && !(reason instanceof Error && reason.name === "RenderingCancelledException")) { setError(true); setRendering(false); }
      }
    }
    void render();
    return () => { cancelled = true; task?.cancel(); };
  }, [pdf, pageNumber, width, zoom]);

  return <div className="pdf-page" aria-busy={rendering}>
    {rendering && <p className="document-reader-loading" role="status"><LoaderCircle size={19} className="reader-spinner" aria-hidden="true" />Loading page…</p>}
    {error && <p className="document-reader-error" role="alert">This page could not be displayed. Select another page or reopen the document.</p>}
    <canvas ref={canvas} aria-label={`Page ${pageNumber} of ${pdf.numPages}`} role="img" style={{ visibility: rendering || error ? "hidden" : "visible" }} />
    {text && <p className="sr-only">{text}</p>}
  </div>;
}

export function PdfReader({ href }: { href: string }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [width, setWidth] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let loading: PDFDocumentLoadingTask | undefined;
    async function load() {
      try {
        const library = await import("pdfjs-dist");
        if (cancelled) return;
        const assets = `/pdfjs/${library.version}/`;
        library.GlobalWorkerOptions.workerSrc = `${assets}pdf.worker.min.mjs`;
        loading = library.getDocument({ url: href, standardFontDataUrl: `${assets}standard_fonts/`, wasmUrl: `${assets}wasm/`, isEvalSupported: false });
        const document = await loading.promise;
        if (cancelled) { await document.destroy(); return; }
        setPdf(document);
      } catch { if (!cancelled) setError(true); }
    }
    void load();
    return () => { cancelled = true; void loading?.destroy(); };
  }, [href]);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(entries => setWidth(Math.round(entries[0].contentRect.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function changePage(next: number) {
    if (!pdf) return;
    setPage(Math.max(1, Math.min(pdf.numPages, next)));
    viewport.current?.scrollTo({ top: 0, left: 0 });
  }

  return <div className="pdf-reader">
    <div className="pdf-reader-controls">
      <div className="pdf-reader-pagination"><button type="button" aria-label="Previous page" disabled={!pdf || page === 1} onClick={() => changePage(page - 1)}><ChevronLeft size={17} /></button><span aria-live="polite">Page {page} <span className="reader-muted">of {pdf?.numPages ?? "…"}</span></span><button type="button" aria-label="Next page" disabled={!pdf || page === pdf.numPages} onClick={() => changePage(page + 1)}><ChevronRight size={17} /></button></div>
      <div className="pdf-reader-zoom"><button type="button" aria-label="Zoom out" disabled={!pdf || zoom <= 50} onClick={() => setZoom(value => value - 25)}><Minus size={15} /></button><button type="button" className="pdf-reader-fit" aria-label="Fit page to width" disabled={!pdf} onClick={() => setZoom(100)}>{zoom}%</button><button type="button" aria-label="Zoom in" disabled={!pdf || zoom >= 200} onClick={() => setZoom(value => value + 25)}><Plus size={15} /></button></div>
    </div>
    <div className="pdf-reader-viewport" ref={viewport}>
      {error ? <p className="document-reader-error" role="alert">The document could not be loaded. Close this window and try again, or use the options above.</p> : !pdf ? <p className="document-reader-loading" role="status"><LoaderCircle size={20} className="reader-spinner" aria-hidden="true" />Loading document…</p> : width > 0 && <PdfPage key={`${page}-${zoom}-${width}`} pdf={pdf} pageNumber={page} width={Math.max(160, width)} zoom={zoom} />}
    </div>
  </div>;
}
