import { Eye, FileText } from "lucide-react";
import { ReportPreview } from "@/components/ReportPreview";
import { documents } from "@/lib/project";

export function DocumentRow({ doc, compact = false, index = 0 }: { doc: typeof documents[number]; compact?: boolean; index?: number }) {
  const description = `${doc.course} · ${doc.version} · ${doc.date}`;
  return <article className="document-row">
    <span className="document-icon"><FileText size={22} strokeWidth={1.4} /></span>
    <div className="document-info"><div className="document-overline">{doc.course} <span>/</span> {doc.version}</div><h3>{doc.href ? <ReportPreview href={doc.href} title={doc.title} description={description} className="document-title-trigger" label={`Read ${doc.title} ${doc.version}`}>{doc.title}</ReportPreview> : doc.title}</h3>{!compact && <p>{doc.description}</p>}<span className="document-date">{doc.date}{!compact && ` · ${doc.type}`}</span></div>
    <span className={doc.href ? "status-tag available" : "status-tag"}>{doc.href && <span className="status-dot" />}{doc.status}</span>
    {doc.href ? <div className="document-actions"><ReportPreview href={doc.href} title={doc.title} description={description} className="document-open-action" label={`View ${doc.title} ${doc.version}`}><Eye size={17} aria-hidden="true" /><span>Read</span></ReportPreview></div> : <span className="document-placeholder" aria-hidden="true">{compact ? String(index + 1).padStart(2, "0") : "—"}</span>}
  </article>;
}
