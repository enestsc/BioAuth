import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, TeamGrid, SectionHeading } from "@/components/ProjectUI";
import { project } from "@/lib/project";

export const metadata: Metadata = { title: "Project Team" };

export default function TeamPage() {
  return <div className="site-container content-bottom"><PageIntro number="04" label="THE PROJECT TEAM" title="Built on shared curiosity.">We are four Computer Engineering students at TED University, developing BioAuth as our senior design project for CMPE 492.</PageIntro><TeamGrid /><section className="content-section" style={{marginTop:45}}><SectionHeading number="01" label="ACADEMIC GUIDANCE" title="Supervision & evaluation." /><div className="advisor-grid"><article className="advisor-block"><div className="eyebrow">PROJECT SUPERVISOR</div><h3>Dr. Ulaş Güleç</h3><p>TED University</p></article><article className="advisor-block"><div className="eyebrow">JURY MEMBERS</div><h3>Prof. Dr. Saiful Islam</h3><h3>Prof. Dr. Tolga Kurtuluş Çapın</h3><p>As listed in the Low-Level Design Report · 16 October 2026</p></article></div></section><div className="report-callout"><div><div className="eyebrow">FOLLOW THE PROJECT</div><h2>Research is a collaborative process.</h2><p>Explore the implementation and project updates in our source repository.</p></div><a className="button button-light" href={project.repository} target="_blank" rel="noreferrer">Project repository <ArrowUpRight size={17} /></a></div></div>;
}
