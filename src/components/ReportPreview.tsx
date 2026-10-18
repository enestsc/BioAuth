"use client";

import { useRef, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Dialog } from "radix-ui";
import { ArrowDownToLine, ArrowUpRight, FileText, LoaderCircle, X } from "lucide-react";
import { TextDocumentReader } from "@/components/documents/TextDocumentReader";

const PdfReader = dynamic(() => import("@/components/documents/PdfReader").then(module => module.PdfReader), { ssr: false, loading: () => <p className="document-reader-loading" role="status"><LoaderCircle size={20} className="reader-spinner" aria-hidden="true" />Loading document…</p> });

type ReportPreviewProps = {
  href: string;
  title: string;
  description?: string;
  className?: string;
  label?: string;
  children: ReactNode;
};

export function ReportPreview({ href, title, description = "BioAuth project documentation", className = "", label, children }: ReportPreviewProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const format = href.endsWith(".docx") ? "docx" : href.endsWith(".csv") ? "csv" : "pdf";

  return <Dialog.Root>
    <Dialog.Trigger asChild>
      <button type="button" className={`report-preview-trigger ${className}`} aria-label={label}>{children}</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="report-preview-overlay" />
      <Dialog.Content className="report-preview-window" onOpenAutoFocus={event => { event.preventDefault(); closeButton.current?.focus(); }}>
        <header className="report-preview-header">
          <div className="report-preview-heading"><span className="eyebrow">BIOAUTH · DOCUMENT LIBRARY</span><Dialog.Title className="report-preview-title">{title}</Dialog.Title><Dialog.Description className="report-preview-description">{description}</Dialog.Description></div>
          <Dialog.Close asChild><button type="button" className="icon-button report-preview-close" aria-label="Close document preview" ref={closeButton}><X size={20} aria-hidden="true" /></button></Dialog.Close>
        </header>
        <div className="report-preview-toolbar">
          <span className="report-preview-format"><FileText size={15} aria-hidden="true" />{format.toUpperCase()} document</span>
          <div className="report-preview-actions">
            {format === "pdf" && <a href={href} target="_blank" rel="noopener noreferrer" className="report-preview-action">Open in new tab <ArrowUpRight size={15} aria-hidden="true" /></a>}
            <a href={href} download className="report-preview-action">Download <ArrowDownToLine size={15} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="report-preview-document">
          {format === "pdf" ? <PdfReader href={href} /> : <TextDocumentReader href={href} format={format} />}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
