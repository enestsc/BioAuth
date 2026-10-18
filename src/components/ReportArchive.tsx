"use client";

import { useState } from "react";
import { FileText, ArrowDownToLine, Eye } from "lucide-react";
import { documents } from "@/lib/project";
import { ReportPreview } from "@/components/ReportPreview";

export function ReportArchive() {
  const [filter, setFilter] = useState("All documents");
  const filtered = documents.filter(doc => filter === "All documents" || doc.course === filter || (filter === "Available" && doc.href));
  return <><div className="filter-bar" aria-label="Filter reports">{["All documents", "CMPE 492", "CMPE 491", "Available"].map(item => <button type="button" key={item} className="filter-button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><p className="sr-only" role="status">{filtered.length} documents shown</p><div className="document-list">{filtered.map(doc => <article className="document-row" key={doc.title + doc.version}><span className="document-icon"><FileText size={22} strokeWidth={1.4} /></span><div className="document-info"><div className="document-overline">{doc.course} <span>/</span> {doc.version}</div><h3>{doc.title}</h3><p>{doc.description}</p><span className="document-date">{doc.date} · {doc.type}</span></div><span className={doc.href ? "status-tag available" : "status-tag"}>{doc.href && <span className="status-dot" />}{doc.status}</span>{doc.href ? <div className="document-actions"><ReportPreview className="icon-button" href={doc.href} title={doc.title} description={`${doc.course} · ${doc.version} · ${doc.date}`} label={`Preview ${doc.title} ${doc.version}`}><Eye size={19} /></ReportPreview><a className="icon-button" href={doc.href} download aria-label={`Download ${doc.title} ${doc.version}`}><ArrowDownToLine size={18} /></a></div> : <span className="document-placeholder" aria-hidden="true">—</span>}</article>)}</div></>;
}
