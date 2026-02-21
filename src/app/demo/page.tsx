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
    <div className="container mx-auto p-4 py-8 max-w-7xl flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Interactive Simulation Console</h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-3xl">
          Test BioAuth's liveness logic against different spoofing vectors. Adjust the threat scenario and challenge requirement, and click "Start Analysis" to observe the mock response pipeline in action.
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
