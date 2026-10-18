"use client";

import { useRef, type ReactNode } from "react";
import { Dialog } from "radix-ui";
import { ArrowDownToLine, ArrowUpRight, FileText, X } from "lucide-react";

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
          <span className="report-preview-format"><FileText size={15} aria-hidden="true" />PDF document</span>
          <div className="report-preview-actions">
            <a href={href} target="_blank" rel="noopener noreferrer" className="report-preview-action">Open in new tab <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a href={href} download className="report-preview-action">Download <ArrowDownToLine size={15} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="report-preview-document">
          <object data={href} type="application/pdf" aria-label={title} title={title}>
            <div className="report-preview-fallback"><FileText size={36} strokeWidth={1.3} aria-hidden="true" /><h3>Open this document to continue reading.</h3><p>PDF preview is unavailable in this browser. You can open the report in a new tab or download a copy.</p><a href={href} target="_blank" rel="noopener noreferrer" className="button button-primary">Open in new tab <ArrowUpRight size={16} aria-hidden="true" /></a></div>
          </object>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
