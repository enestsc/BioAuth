"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useBioAuthStore } from "@/lib/store";

export function SpectrumChart() {
  const { latestResult, state } = useBioAuthStore();
  
  const data = useMemo(() => {
    if (!latestResult?.spectrum_data) return Array.from({ length: 60 }).map((_, i) => ({ freq: i * 0.05, power: 0 }));
    return latestResult.spectrum_data.map((val, i) => ({ freq: i * 0.05, power: val }));
  }, [latestResult]);

  return (
    <Card className="border-border/40 bg-card/50">
      <CardHeader className="p-4 py-3 border-b border-border/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          Frequency Spectrum (FFT)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 h-48 sm:h-64">
        {state === 'analyzing' ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground text-sm">
            <BarChart3 className="w-8 h-8 animate-bounce text-indigo-500 mb-2 opacity-50" />
            <p className="animate-pulse">Computing FFT...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="freq" hide />
              <YAxis hide domain={[0, 'dataMax']} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.4} />
              <Bar 
                dataKey="power" 
                fill="currentColor" 
                className="fill-indigo-500/80 dark:fill-indigo-400/80"
                radius={[2, 2, 0, 0]}
                isAnimationActive={state === 'complete'}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
