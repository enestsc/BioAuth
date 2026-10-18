import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderGit2 } from "lucide-react";
import { PageIntro } from "@/components/ProjectUI";
import { ReportArchive } from "@/components/ReportArchive";

export const metadata: Metadata = { title: "Reports & Documentation" };

export default function ReportsPage() {
  return <div className="site-container content-bottom"><PageIntro number="02" label="PROJECT DOCUMENTATION" title="An open record of the work.">Explore the technical reports behind BioAuth, from detailed design to final evaluation. Available documents can be read online or downloaded as PDFs.</PageIntro><ReportArchive /><aside className="archive-note"><FolderGit2 size={27} strokeWidth={1.3} /><div><h3>Looking for the TODO / backlog?</h3><p>Backlog snapshots have their own archive alongside the semester milestones. Publication status is tracked for each expected version.</p></div><Link href="/progress#backlog" className="text-link">View the backlog archive <ArrowRight size={16} /></Link></aside><p className="inline-note">CMPE 491 reports preserve the earlier project definitions and design. For the current scope and decision policies, refer to the CMPE 492 Low-Level Design Report. Availability on this site does not indicate LMS submission or jury approval.</p></div>;
}
