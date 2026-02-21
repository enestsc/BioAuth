import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">BioAuth</span>
        </Link>
        
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/technology" className="transition-colors hover:text-foreground/80 text-foreground/60">Technology</Link>
          <Link href="/use-cases" className="transition-colors hover:text-foreground/80 text-foreground/60">Use Cases</Link>
          <Link href="/benchmarks" className="transition-colors hover:text-foreground/80 text-foreground/60">Benchmarks</Link>
          <Link href="/faq" className="transition-colors hover:text-foreground/80 text-foreground/60">FAQ</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
            Contact
          </Link>
          <Button asChild className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 shadow-none">
            <Link href="/demo">Try Demo</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
