import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { PageIntro } from "@/components/ProjectUI";
import { ReportArchive } from "@/components/ReportArchive";

export const metadata: Metadata = { title: "Reports & Documentation" };

export default function ReportsPage() {
  return <div className="site-container content-bottom">
    <PageIntro number="02" label="PROJECT DOCUMENTATION" title="An open record of the work.">Explore the technical reports behind BioAuth, from detailed design to final evaluation. Select a report to read it here.</PageIntro>
    <ReportArchive />
    <aside className="archive-note"><FolderGit2 size={27} strokeWidth={1.3} /><div><h3>Looking for the TODO / backlog?</h3><p>Explore the semester backlog documents and the team&apos;s implementation roadmap.</p></div><Link href="/progress#backlog" className="text-link">View the backlog archive <ArrowRight size={16} /></Link></aside>
    <p className="inline-note">CMPE 491 reports document the project&apos;s foundations. The CMPE 492 Low-Level Design Report presents the current architecture and decision policies.</p>
  </div>;
}
