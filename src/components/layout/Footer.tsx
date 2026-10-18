import Link from "next/link";
import { ArrowUpRight, Fingerprint } from "lucide-react";
import { project } from "@/lib/project";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div><Link href="/" className="brand"><Fingerprint size={25} /><span>bio<span className="brand-auth">auth</span><span className="brand-dot">.</span></span></Link><p>Exploring trust through biometric evidence.</p></div>
          <div className="footer-academic"><span className="eyebrow">A TED UNIVERSITY SENIOR PROJECT</span><p>Computer Engineering · CMPE 492<br />{project.term}</p></div>
          <div className="footer-links"><Link href="/reports">Reports</Link><Link href="/team">The team</Link><a href={project.repository} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 BioAuth Project Team</span><span>Academic research · Design and implementation in progress</span><div><Link href="/privacy">Privacy</Link><Link href="/faq">FAQ</Link></div></div>
      </div>
    </footer>
  );
}
