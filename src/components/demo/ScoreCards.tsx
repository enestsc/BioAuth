"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useBioAuthStore } from "@/lib/store";

function MetricBlock({ label, value, description, colorClass = "text-foreground" }: { label: string, value: string | number, description?: string, colorClass?: string }) {
  return (
    <div className="flex flex-col space-y-1 p-3 rounded-lg border border-border/40 bg-background/50">
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
      <span className={`text-2xl font-bold font-mono tracking-tight ${colorClass}`}>{value}</span>
      {description && <span className="text-xs text-muted-foreground/80">{description}</span>}
    </div>
  );
}

export function ScoreCards() {
  const { latestResult, state } = useBioAuthStore();

  const isIdle = state !== 'complete';
  const r = latestResult;

  const getQualityColor = (score: number) => score >= 0.7 ? "text-green-500" : score >= 0.4 ? "text-amber-500" : "text-destructive";
  
  return (
    <Card className="border-border/40 bg-card/50 overflow-hidden">
      <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricBlock 
          label="Est. BPM" 
          value={isIdle ? "--" : r?.bpm_estimate || 0} 
          description="Heart Rate Estimate" 
          colorClass={isIdle ? "" : "text-primary"} 
        />
        <MetricBlock 
          label="Signal Quality" 
          value={isIdle ? "--" : `${Math.round((r?.signal_quality || 0) * 100)}%`} 
          description="SNR Ratio" 
          colorClass={isIdle ? "" : getQualityColor(r?.signal_quality || 0)} 
        />
        <MetricBlock 
          label="Challenge Score" 
          value={isIdle ? "--" : `${Math.round((r?.challenge_score || 0) * 100)}%`} 
          description="Visual match" 
          colorClass={isIdle ? "" : getQualityColor(r?.challenge_score || 0)} 
        />
        <MetricBlock 
          label="Liveness Conf." 
          value={isIdle ? "--" : `${Math.round((r?.liveness_confidence || 0) * 100)}%`} 
          description="Fusion metric" 
          colorClass={isIdle ? "" : getQualityColor(r?.liveness_confidence || 0)}
        />
      </CardContent>
    </Card>
  );
}
