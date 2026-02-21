"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useBioAuthStore } from "@/lib/store";

export function SignalChart() {
  const { latestResult, state } = useBioAuthStore();
  
  const data = useMemo(() => {
    if (!latestResult?.pulse_signal) return Array.from({ length: 60 }).map((_, i) => ({ time: i, signal: 0 }));
    return latestResult.pulse_signal.map((val, i) => ({ time: i, signal: val }));
  }, [latestResult]);

  return (
    <Card className="border-border/40 bg-card/50">
      <CardHeader className="p-4 py-3 border-b border-border/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Synthetic rPPG Signal
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-48 sm:h-64">
        {state === 'analyzing' ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground text-sm">
            <Activity className="w-8 h-8 animate-pulse text-primary mb-2 opacity-50" />
            <p className="animate-pulse">Extracting waveform...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSignal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis hide domain={['dataMin - 0.5', 'dataMax + 0.5']} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.4} />
              <Area 
                type="monotone" 
                dataKey="signal" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorSignal)" 
                isAnimationActive={state === 'complete'}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
