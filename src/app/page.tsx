import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Activity, Fingerprint, Eye, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="relative z-10 max-w-4xl space-y-8">
          <Badge className="px-3 py-1 bg-primary/20 text-primary border-primary/20 rounded-full font-medium text-xs tracking-wider uppercase mb-6 inline-flex">
            Research Prototype
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Identity Liveness Beyond <br className="hidden md:block"/> Blink and Head-Turn Checks
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Protect against AI-era spoofing with physiology-based liveness verification. BioAuth extracts remote photoplethysmography (rPPG) signals to confirm the presence of a live human subject.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25">
              <Link href="/demo">
                Try Interactive Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base border-border/60 hover:bg-muted/50">
              <Link href="/technology">Explore Technology</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">The Limit of Visual Challenge-Response</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Advanced deepfakes, puppet animations, and high-fidelity replay attacks can easily bypass traditional visual tests like blinking or smiling.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border/40">
              <CardContent className="pt-6">
                <div className="bg-destructive/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Fingerprint className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Synthetic Media</h3>
                <p className="text-sm text-muted-foreground">Generative AI enables attackers to create convincing portraits that mimic visual responses perfectly.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/40">
              <CardContent className="pt-6">
                <div className="bg-destructive/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Passive Spoofing</h3>
                <p className="text-sm text-muted-foreground">Replay attacks using high-res tablet screens easily stress test basic 2D active liveness checks.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/40">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">The Physiological Gap</h3>
                <p className="text-sm text-muted-foreground">What synthetic media lacks is the hidden, natural physiological signal—a biometric heartbeat.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">How BioAuth Enhances Trust</h2>
              <p className="text-muted-foreground text-lg">
                By performing a fusion of active challenge-response evaluation and passive physiological measurement, BioAuth provides an explainable, spoof-resilient layer of security.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Detect Face Region & Extract ROI",
                  "Synthesize Sub-dermal Blood Flow Variations (rPPG)",
                  "Filter Ambient Noise and Motion Artifacts",
                  "Determine Signal Quality and Measure Confidence",
                  "Output Fused Decision with Reason Codes"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-foreground/90 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full bg-card/30 border border-border/50 rounded-2xl p-8 relative overflow-hidden flex flex-col gap-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="flex justify-between items-center text-sm font-mono border-b border-border/40 pb-4">
                <span className="text-muted-foreground">Pipeline Status</span>
                <span className="text-green-400">OPTIMAL</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-border/40">
                  <span className="text-sm font-medium">Extracting ROI</span>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">12ms</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-border/40">
                  <span className="text-sm font-medium">Spectrum Analysis</span>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">VDC-FFT</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-border/40">
                  <span className="text-sm font-medium">Confidence Scoring</span>
                  <span className="text-xs text-green-400 font-bold">94.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Banner */}
      <section className="py-24 bg-primary/5 border-y border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-grid-white/5 opacity-10"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 space-y-8">
          <Shield className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold">Ready to test the simulation?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access the capstone demo console, select threat vectors, and observe how physiological signals impact the final liveness decision.
          </p>
          <Button asChild size="lg" className="h-14 px-10 text-lg shadow-xl shadow-primary/20">
            <Link href="/demo">Launch Console</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className: string }) {
  return <span className={className}>{children}</span>;
}
