export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
      <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Last Updated: [Placeholder Date]</p>
      
      <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed mt-8">
        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing the BioAuth capstone portal, you acknowledge that this is a research and academic prototype representing a concept for identity verification. It is not an enterprise-grade security framework certified for banking integration.</p>

        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">2. Limitation of Liability</h2>
        <p>The concepts demonstrated—including remote Photoplethysmography (rPPG) and physiological spoof-detection—are simulated via constrained heuristics in this specific software version. Relying upon this iteration for actual identity verification in a mission-critical or financial context is strictly prohibited.</p>

        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">3. Prohibited Uses</h2>
        <p>You agree not to exploit the simulation API endpoints via automated high-volume traffic. This project is hosted on serverless architecture intended for light academic demonstration.</p>

        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">4. Intellectual Property</h2>
        <p>The overarching UI/UX styling, specific implementation patterns using Next.js, and simulated backend architecture belong to the respective capstone research owners.</p>
      </div>
    </div>
  );
}
