import { DemoCameraPanel } from "@/components/demo/DemoCameraPanel";
import { DemoControlsPanel } from "@/components/demo/DemoControlsPanel";
import { SignalChart } from "@/components/demo/SignalChart";
import { SpectrumChart } from "@/components/demo/SpectrumChart";
import { ScoreCards } from "@/components/demo/ScoreCards";
import { DecisionCard } from "@/components/demo/DecisionCard";
import { EventTimeline } from "@/components/demo/EventTimeline";
import { Shield } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="site-container py-10 flex flex-col gap-6">
      <aside className="simulation-notice"><strong>Illustrative simulation · earlier UI prototype.</strong> All signals, scores and decisions below are generated from the selected scenario. This console does not implement the current design report, perform biometric analysis or establish liveness. Camera access is optional.</aside>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Interactive Simulation Console</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-3xl">
          Explore generated responses for different scenarios. Initialize a session, select simulation parameters and run the example. These outputs are separate from the project's planned controlled evaluation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Camera and Controls (cols 1-3) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <DemoCameraPanel />
          <DemoControlsPanel />
        </div>

        {/* Center Column: Signal Analysis and Scores (cols 4-8) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <ScoreCards />
          <SignalChart />
          <SpectrumChart />
        </div>

        {/* Right Column: Decision Engine and Logs (cols 9-12) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="h-64 lg:h-auto lg:flex-1">
            <DecisionCard />
          </div>
          <div className="h-48 lg:h-80">
            <EventTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}
