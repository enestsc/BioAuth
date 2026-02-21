import Link from "next/link";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-8 md:py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg tracking-tight">BioAuth</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Next-generation identity verification and liveness assurance platform. 
          </p>
          <div className="text-xs text-muted-foreground/60 mt-4">
            <p>Research Prototype / Capstone Demo</p>
            <p>© {new Date().getFullYear()} BioAuth Project.</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/demo" className="hover:text-foreground transition-colors">Interactive Demo</Link></li>
            <li><Link href="/technology" className="hover:text-foreground transition-colors">Technology</Link></li>
            <li><Link href="/use-cases" className="hover:text-foreground transition-colors">Use Cases</Link></li>
            <li><Link href="/benchmarks" className="hover:text-foreground transition-colors">Benchmarks</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
