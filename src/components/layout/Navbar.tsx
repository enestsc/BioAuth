"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Fingerprint, Menu, X } from "lucide-react";
import { project } from "@/lib/project";

const links = [
  { href: "/", label: "Overview" },
  { href: "/technology", label: "Research" },
  { href: "/reports", label: "Reports" },
  { href: "/progress", label: "Progress" },
  { href: "/team", label: "Team" },
];

export function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-container nav-inner">
        <Link href="/" className="brand" aria-label="BioAuth home" onClick={() => setOpen(false)}>
          <span className="brand-icon"><Fingerprint size={25} strokeWidth={1.7} /></span>
          <span>bio<span className="brand-auth">auth</span><span className="brand-dot">.</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(link => <Link key={link.href} href={link.href} className={path === link.href ? "nav-link active" : "nav-link"} aria-current={path === link.href ? "page" : undefined}>{link.label}</Link>)}
        </nav>
        <a className="repository-link" href={project.repository} target="_blank" rel="noreferrer">Project repository <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
      {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={path === link.href ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={16} /></Link>)}<a href={project.repository} target="_blank" rel="noreferrer">Project repository <ArrowUpRight size={16} /></a></nav>}
    </header>
  );
}
