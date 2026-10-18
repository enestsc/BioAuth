import Link from "next/link";
import { ArrowUpRight, FileText, ArrowDownToLine, Eye, BookOpen } from "lucide-react";
import { documents, project, team } from "@/lib/project";
import { ReportPreview } from "@/components/ReportPreview";

export function PageIntro({ number, label, title, children }: { number: string; label: string; title: string; children: React.ReactNode }) {
  return <div className="page-intro"><div className="eyebrow"><span className="section-number">{number}</span>{label}</div><h1>{title}</h1><p>{children}</p></div>;
}

export function SectionHeading({ number, label, title, description }: { number: string; label: string; title: string; description?: string }) {
  return <div className="section-heading"><div className="eyebrow"><span className="section-number">{number}</span>{label}</div><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

export function DocumentList({ compact = false }: { compact?: boolean }) {
  const list = compact ? documents.filter(d => d.course === "CMPE 492" && d.version !== "Version 2") : documents;
  return <div className="document-list">{list.map((doc, i) => <article className="document-row" key={doc.title + doc.version}>
    <span className="document-icon"><FileText size={22} strokeWidth={1.4} /></span>
    <div className="document-info"><div className="document-overline">{doc.course} <span>/</span> {doc.version}</div><h3>{doc.title}</h3>{!compact && <p>{doc.description}</p>}<span className="document-date">{doc.date}</span></div>
    <span className={doc.href ? "status-tag available" : "status-tag"}>{doc.href && <span className="status-dot" />}{doc.status}</span>
    {doc.href ? <div className="document-actions"><ReportPreview className="icon-button" href={doc.href} title={doc.title} description={`${doc.course} · ${doc.version} · ${doc.date}`} label={`Preview ${doc.title} ${doc.version}`}><Eye size={19} /></ReportPreview><a className="icon-button download-action" href={doc.href} download aria-label={`Download ${doc.title} ${doc.version}`}><ArrowDownToLine size={18} /></a></div> : <span className="document-placeholder" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>}
  </article>)}</div>;
}

export function TeamGrid() {
  return <div className="team-grid">{team.map(member => <article className="team-member" key={member.name}><div className="team-avatar">{member.initials}<span className="avatar-mark">+</span></div><h3>{member.name}</h3><p>Computer Engineering</p><span>TED University</span></article>)}</div>;
}

export function ResearchNote() {
  return <aside className="research-note"><span className="note-symbol">i</span><p><strong>Research in progress.</strong> This website presents the project design and course deliverables. The interactive console uses simulated data; measured biometric performance has not yet been published.</p><Link href="/benchmarks">Evaluation plan <ArrowUpRight size={15} /></Link></aside>;
}

export function ReportCallout() {
  return <div className="report-callout"><div><span className="eyebrow">FROM DESIGN TO IMPLEMENTATION</span><h2>Explore the thinking behind BioAuth.</h2><p>Read the architecture, evidence contracts and experimental design.</p></div><ReportPreview className="button button-light" href={project.report} title="Low-Level Design Report" description="CMPE 492 · Version 1.0 · 16 October 2026">Read the design report <BookOpen size={17} /></ReportPreview></div>;
}
