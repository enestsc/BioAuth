import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { ArrowUpRight, Eye } from "lucide-react";
import { BacklogBoard } from "@/components/BacklogBoard";
import { BacklogSnapshots } from "@/components/BacklogSnapshots";
import { ReportPreview } from "@/components/ReportPreview";
import { PageIntro, SectionHeading } from "@/components/ProjectUI";
import backlog from "@/data/backlog.json";
import { milestones, project } from "@/lib/project";

export const metadata: Metadata = { title: "Milestones & Backlog" };

export default async function ProgressPage() {
  await connection();
  // eslint-disable-next-line react-hooks/purity -- Read actual server request time after connection(), never a frozen build timestamp.
  const now = Date.now();
  return <div className="site-container content-bottom">
    <PageIntro number="03" label="PROJECT PROGRESS" title="From design to evidence.">Group 1&apos;s course milestones, shared project backlog and dated planning documents. Follow the work from design decisions to verified results.</PageIntro>
    <section className="content-section full-timeline">
      <SectionHeading number="01" label="COURSE MILESTONES" title="The delivery timeline." description="Key deliverables for CMPE 492, Fall 2026–2027. The January presentation date will be announced." />
      <div className="schedule-list">{milestones.map((item, i) => <article className="schedule-row" key={item.iso}>
        <time dateTime={item.iso}>{item.date}</time><div><h3>{item.label}</h3><p>{item.detail}</p>{i === 0 && <ReportPreview href={project.report} title="Low-Level Design Report" description="CMPE 492 · Version 1.0 · 16 October 2026" className="text-link">Open report <Eye size={13} /></ReportPreview>}</div><span className={item.available ? "status-tag available" : "status-tag"}>{item.available ? "Report available" : i === 1 ? "Next milestone" : "Scheduled"}</span>
      </article>)}</div>
    </section>
    <section className="content-section" id="backlog">
      <SectionHeading number="02" label="TODO / BACKLOG" title="The work behind the project." description="Explore the semester backlog documents and the team's implementation roadmap." />
      <div id="backlog-archive"><BacklogSnapshots initialNow={now} /></div>
    </section>
    <section className="content-section" id="backlog-board">
      <SectionHeading number="03" label="TEAM PLANNING" title="The latest implementation plan." description="Team priorities, responsibilities and milestones across implementation and evaluation." />
      <BacklogBoard />
      <div className="reports-bottom"><span>Planning snapshot: {backlog.dateLabel}</span><Link href="/reports" className="text-link">View project reports <ArrowUpRight size={15} /></Link></div>
    </section>
  </div>;
}
