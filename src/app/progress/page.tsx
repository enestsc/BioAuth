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
      <SectionHeading number="01" label="COURSE MILESTONES" title="The delivery timeline." description="Dates follow the 2026–2027 Fall semester table in the CMPE 492 syllabus. Deadlines are 23:59 on the specified date; the January presentation date is to be announced." />
      <div className="schedule-list">{milestones.map((item, i) => <article className="schedule-row" key={item.iso}>
        <time dateTime={item.iso}>{item.date}</time><div><h3>{item.label}</h3><p>{item.detail}</p>{i === 0 && <ReportPreview href={project.report} title="Low-Level Design Report" description="CMPE 492 · Version 1.0 · 16 October 2026" className="text-link">Open report <Eye size={13} /></ReportPreview>}</div><span className={item.available ? "status-tag available" : "status-tag"}>{item.available ? "Report available" : i === 1 ? "Next milestone" : "Scheduled"}</span>
      </article>)}</div>
    </section>
    <section className="content-section" id="backlog">
      <SectionHeading number="02" label="TODO / BACKLOG" title="The work behind the project." description="A backlog is the shared list of work, ordered by priority and tracked with owners, dependencies and completion criteria. The syllabus requires it to be updated throughout the semester, with dated versions available on the project website." />
      <div id="backlog-archive"><BacklogSnapshots initialNow={now} /></div>
      <p className="inline-note">Review the backlog at weekly meetings. Update state and evidence, agree the next tasks, and archive a dated snapshot at each course checkpoint. The syllabus provides an example format; it does not require a particular template.</p>
    </section>
    <section className="content-section" id="backlog-board">
      <SectionHeading number="03" label="TEAM PLANNING" title="The latest implementation plan." description="The 18 October planning revision preserves the original task IDs, proposes named owners and adds an early feasibility check. The dated plan remains available independently of the active course checkpoint." />
      <BacklogBoard />
      <div className="reports-bottom"><span>Planning snapshot: {backlog.dateLabel}</span><Link href="/reports" className="text-link">View project reports <ArrowUpRight size={15} /></Link></div>
    </section>
  </div>;
}
