import { Card, CardContent } from "@/components/ui/card";
import { Activity, Shield, Cpu, RefreshCcw, EyeOff, LightbulbOff } from "lucide-react";

export default function TechnologyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-16">
      
      <div className="space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Technology & Architecture</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Understanding the mechanics of physiology-based liveness and our capstone prototype architecture.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border/40 pb-4">What is rPPG?</h2>
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
          <p>
            Remote Photoplethysmography (rPPG) is an optical technique that measures variations in blood volume within the microvascular bed of tissue just beneath the skin. As the heart beats, blood volume in the face changes, subtly altering the amount of ambient light absorbed and reflected.
          </p>
          <p>
            While these color variations are generally invisible to the naked human eye, standard RGB webcam sensors can detect them. By isolating the facial region (ROI), tracking it over frames, and analyzing the color channel fluctuations (specifically the green channel, which has strong absorption characteristics for hemoglobin), we can extract a time-series signal corresponding to the subject's pulse.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold border-b border-border/40 pb-4">The Threat Model</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card/50 border-border/40">
            <CardContent className="pt-6 space-y-2">
              <RefreshCcw className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold">Replay Attacks</h3>
              <p className="text-sm text-muted-foreground">Presenting a pre-recorded video on a phone or tablet. High-res screens lack the dynamic physiological depth and specular reflections of living skin.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/40">
            <CardContent className="pt-6 space-y-2">
              <EyeOff className="w-8 h-8 text-destructive mb-4" />
              <h3 className="text-lg font-semibold">Synthetic Deepfakes</h3>
              <p className="text-sm text-muted-foreground">AI-generated facial animations applied to a real incoming feed. Generative networks struggle to maintain consistent physiological frequencies across different facial patches.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border/40 pb-4">MVP Limitations & Serverless Simulation</h2>
        <div className="bg-muted/30 border border-border/50 rounded-xl p-6 space-y-4 text-muted-foreground">
          <div className="flex items-center gap-3 text-foreground font-semibold">
            <Cpu className="w-5 h-5" />
            <span>Capstone Prototype Constraints</span>
          </div>
          <p className="text-sm leading-relaxed">
            Because this application runs entirely on Vercel's serverless infrastructure without a persistent backend or Python-based computer vision servers, the demo provided uses a <strong>simulation engine</strong>. 
          </p>
          <p className="text-sm leading-relaxed">
            The frontend securely transmits parameters to the Next.js API route, which procedurally generates deterministic physiological signals, frequency spectra, and decisions aligned with real-world rPPG failure modes. Production-grade systems require heavy OpenCV/PyTorch integrations that exceed Vercel function size and timeout limitations.
          </p>
        </div>
      </section>

    </div>
  );
}
