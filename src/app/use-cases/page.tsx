import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, Landmark, RefreshCw, Smartphone, ShieldCheck, Microscope } from "lucide-react";

export default function UseCasesPage() {
  const useCases = [
    {
      title: "Fintech Onboarding",
      icon: <Landmark className="w-8 h-8 text-primary" />,
      problem: "Traditional KYC checks rely on static selfie uploads, which are easily spoofed by generative AI.",
      solution: "BioAuth extracts a physiological pulse from the live onboarding session, proving the applicant is a living human being in real-time.",
      benefit: "Reduces synthetic identity fraud by up to 90% during account creation."
    },
    {
      title: "High-Risk Login Verification",
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      problem: "Account takeovers (ATO) utilizing deepfake video streams completely bypass 2D facial recognition.",
      solution: "Fusion of active challenges with background rPPG extraction catches inconsistent signal patterns inherent to puppet animations.",
      benefit: "Secures high-value transactions or banking app authentications robustly."
    },
    {
      title: "Account Recovery",
      icon: <RefreshCw className="w-8 h-8 text-primary" />,
      problem: "Scammers use socially-engineered information to claim lost passwords via automated video-chat bots.",
      solution: "BioAuth enforces an interaction requirement that guarantees liveness, preventing automated bot recoveries.",
      benefit: "Prevents credential stuffing from moving into ATO."
    },
    {
      title: "Suspicious Media Screening",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      problem: "Fraud teams spend hours manually reviewing submitted identity videos, guessing at liveness.",
      solution: "BioAuth outputs explainable confidence scores and reason codes (e.g., SPATIAL_ARTIFACTS_DETECTED).",
      benefit: "Augments human analysts with machine-readable physiological data."
    },
    {
      title: "Corporate Identity Integration",
      icon: <Building2 className="w-8 h-8 text-primary" />,
      problem: "Remote teams are susceptible to deepfake CEO fraud during sensitive internal meetings or access control.",
      solution: "Running in the background of a video stream, BioAuth passively asserts liveness without disturbing workflow.",
      benefit: "Zero-friction continuous identity validation."
    },
    {
      title: "R&D Prototype Testbed",
      icon: <Microscope className="w-8 h-8 text-primary" />,
      problem: "Researchers need a realistic interactive UI to demonstrate theoretical biometric fusion techniques to stakeholders.",
      solution: "Our capstone interface simulates realistic outcomes seamlessly.",
      benefit: "Rapidly communicates complex biometric concepts."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl space-y-16">
      
      <div className="space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Industry Use Cases</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore how physiology-based liveness verification defends against next-generation spoofing across sectors.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((uc, i) => (
          <Card key={i} className="bg-card/40 border-border/40 hover:bg-card/60 transition-colors">
            <CardHeader className="space-y-4 pb-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                {uc.icon}
              </div>
              <CardTitle className="text-xl">{uc.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <span className="font-semibold text-destructive block mb-1">Problem</span>
                <p className="text-muted-foreground">{uc.problem}</p>
              </div>
              <div>
                <span className="font-semibold text-green-500 block mb-1">BioAuth Approach</span>
                <p className="text-muted-foreground">{uc.solution}</p>
              </div>
              <div className="pt-4 border-t border-border/40">
                <span className="font-semibold text-primary block mb-1">Expected Benefit</span>
                <p className="text-muted-foreground">{uc.benefit}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
