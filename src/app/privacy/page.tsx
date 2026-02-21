export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Last Updated: [Placeholder Date]</p>
      
      <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed mt-8">
        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">1. Introduction</h2>
        <p>This is a placeholder Privacy Policy for the BioAuth capstone project demonstration. In a production environment, this page would detail the complex operational protocols regarding biometric data handling.</p>

        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">2. Data Collection (MVP)</h2>
        <p><strong>Strict Adherence:</strong> No Personally Identifiable Information (PII) or biometric facial data (e.g., webcam footage) is stored, transmitted beyond ephemeral memory, or logged by the serverless Vercel backend during routine demonstration usage.</p>
        <p>The interactive Demo processes localized streams exclusively. Telemetry metadata (timestamps, inferred signal ratios) may be passed for dashboard visualizations but is instantly discarded post-request.</p>

        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">3. Contact Forms</h2>
        <p>If you utilize the Contact page form, the email and name provided will be parsed statelessly for demonstration. No persistent database is attached.</p>

        <h2 className="text-xl font-bold text-foreground mt-8 mb-4">4. Biometric Assertions</h2>
        <p>Because BioAuth attempts to resolve rPPG outputs, any real production integration would be strictly governed under GDPR, CCPA, and BIPA regulations, necessitating explicit user consent flows omitted in this research prototype architecture.</p>
      </div>
    </div>
  );
}
