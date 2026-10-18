import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { documents, project, team } from "@/lib/project";
import { ReportPreview } from "@/components/ReportPreview";
import { DocumentRow } from "@/components/DocumentRow";

export function PageIntro({ number, label, title, children }: { number: string; label: string; title: string; children: React.ReactNode }) {
  return <div className="page-intro"><div className="eyebrow"><span className="section-number">{number}</span>{label}</div><h1>{title}</h1><p>{children}</p></div>;
}

export function SectionHeading({ number, label, title, description }: { number: string; label: string; title: string; description?: string }) {
  return <div className="section-heading"><div className="eyebrow"><span className="section-number">{number}</span>{label}</div><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

export function DocumentList({ compact = false }: { compact?: boolean }) {
  const list = compact ? documents.filter(d => d.course === "CMPE 492" && d.version !== "Version 2") : documents;
  return <div className="document-list">{list.map((doc, index) => <DocumentRow doc={doc} compact={compact} index={index} key={doc.title + doc.version} />)}</div>;
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
