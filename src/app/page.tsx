import Link from "next/link";
import { ArrowRight, ArrowUpRight, Activity, ScanFace, ShieldCheck, Layers3, FileText, GitBranch, ArrowDown } from "lucide-react";
import { BiometricVisual } from "@/components/BiometricVisual";
import { SectionHeading, DocumentList, TeamGrid, ResearchNote } from "@/components/ProjectUI";
import { project } from "@/lib/project";

export default function HomePage() {
  return (
    <>
      <section className="hero-section site-container">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="small-square" /> TED UNIVERSITY <span className="eyebrow-separator">/</span> CMPE 492</div>
          <div className="hero-status"><span className="status-dot" /> Senior design project <span>2026–2027</span></div>
          <h1>Trust begins<br />with <span>living signals.</span></h1>
          <p className="hero-description">Exploring biometric verification through the fusion of facial identity, visual attack detection and physiological evidence.</p>
          <p className="hero-support">BioAuth is a senior research project investigating how signal quality and attack awareness can support more reliable verification decisions.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/reports">Explore project reports <ArrowUpRight size={17} /></Link><Link className="text-link" href="/technology">Our research <ArrowRight size={16} /></Link></div>
          <div className="hero-footnote"><span className="tiny-line" /><span>Quality-aware. Attack-aware. Explainable by design.</span></div>
        </div>
        <BiometricVisual />
      </section>
      <div className="project-strip"><div className="site-container strip-inner"><div><span className="strip-label">THE PROJECT</span><span>Biometric verification & security</span></div><div><span className="strip-label">CURRENT MILESTONE</span><span><span className="status-dot" /> Low-level design · v1 available</span></div><Link href="/progress">Follow our progress <ArrowUpRight size={16} /></Link></div></div>

      <section className="section-space site-container" id="project">
        <div className="overview-grid"><SectionHeading number="01" label="THE RESEARCH QUESTION" title="A familiar face is only part of the story." /><div className="overview-body"><p>Face matching asks <em>who</em> is in an image. It does not establish whether a capture comes from a person, a replay or synthetic media.</p><p>BioAuth investigates a quality- and attack-aware fusion engine that considers identity, presentation and physiology together—and requests another capture when the evidence is insufficient.</p><Link href="/technology" className="text-link">Understand the approach <ArrowRight size={16} /></Link></div></div>
        <div className="principle-grid">{[
          { icon: ScanFace, no: "01", title: "Identity evidence", text: "Compare a captured face with an approved reference using one-to-one verification." },
          { icon: ShieldCheck, no: "02", title: "Presentation evidence", text: "Evaluate visual attack indicators independently from whether the face matches." },
          { icon: Activity, no: "03", title: "Physiological evidence", text: "Assess pulse-related colour variations and their reliability with CHROM and POS." }
        ].map(item => <article className="principle" key={item.no}><div className="principle-top"><item.icon size={26} strokeWidth={1.4} /><span>{item.no}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        <div className="fusion-bar"><div><Layers3 size={22} /><strong>One evidence-aware decision</strong></div><span className="fusion-caption">Shared safety gates + versioned fusion policy</span><div className="decision-labels"><span>ACCEPT</span><span>REJECT</span><span>RETRY</span></div></div>
        <p className="figure-caption">Research hypothesis: improve the trade-off between attack acceptance, genuine-user rejection, retries and latency. Results remain to be validated.</p>
      </section>

      <section className="reports-section section-space"><div className="site-container"><div className="section-heading-row"><SectionHeading number="02" label="PROJECT DOCUMENTATION" title="The work, documented." description="Design decisions, technical detail and course deliverables in one place." /><Link className="text-link" href="/reports">All reports <ArrowUpRight size={17} /></Link></div><DocumentList compact /><div className="reports-bottom"><span><FileText size={15} /> Public course deliverables · CMPE 492</span><Link href="/progress#backlog">TODO & backlog archive <ArrowRight size={15} /></Link></div></div></section>

      <section className="section-space site-container"><div className="milestone-feature"><div><div className="eyebrow"><span className="section-number">03</span> THE SEMESTER AHEAD</div><h2>From a detailed design<br />to a tested system.</h2><p>Follow the project through design refinement, implementation, controlled evaluation and the final demonstration.</p><Link className="text-link" href="/progress">View milestones & backlog <ArrowRight size={17} /></Link></div><div className="mini-timeline"><div className="mini-step current"><span className="timeline-dot" /><span className="mono-label">16 OCT</span><div><h3>Low-Level Design</h3><p>Version 1 available</p></div><span className="status-tag available">Published</span></div><div className="mini-step"><span className="timeline-dot" /><span className="mono-label">20 NOV</span><div><h3>Test Plan</h3><p>Evaluation methodology & test cases</p></div></div><div className="mini-step"><span className="timeline-dot" /><span className="mono-label">31 DEC</span><div><h3>Final Report</h3><p>Implementation & measured results</p></div></div><div className="mini-step"><span className="timeline-dot" /><span className="mono-label">JAN '27</span><div><h3>Presentation & Demo</h3><p>Exact date to be announced</p></div></div></div></div></section>

      <section className="team-section section-space"><div className="site-container"><div className="section-heading-row"><SectionHeading number="04" label="THE PEOPLE BEHIND THE PROJECT" title="Four students. A shared research goal." /><Link className="text-link" href="/team">Meet the team <ArrowUpRight size={17} /></Link></div><TeamGrid /><div className="supervisor-line"><span>SUPERVISED BY</span><strong>Dr. Ulaş Güleç</strong><span>Department of Computer Engineering · TED University</span></div></div></section>
      <div className="site-container bottom-note"><ResearchNote /></div>
      <section className="site-container project-next"><div><GitBranch size={23} /><p>Curious about the implementation?<span>Explore the source code and follow the project as it develops.</span></p></div><a className="text-link" href={project.repository} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={17} /></a><a className="back-to-top" href="#main-content" aria-label="Back to top"><ArrowDown size={19} /></a></section>
    </>
  );
}
