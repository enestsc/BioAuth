"use client";

import { useBioAuthStore } from "@/lib/store";
import { type Scenario, type ChallengeType } from "@/lib/server/demo-simulation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Settings2, Play, RotateCcw } from "lucide-react";

export function DemoControlsPanel() {
  const { 
    scenario, setScenario, 
    challengeType, setChallengeType,
    state, startAnalysis, initSession, resetDemo, sessionId
  } = useBioAuthStore();

  const isSimulating = state === 'initializing' || state === 'analyzing';

  return (
    <Card className="border-border/40 bg-card/50">
      <CardHeader className="p-4 py-3 border-b border-border/40">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-primary" />
          Simulation Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Threat Scenario</label>
          <Select 
            value={scenario} 
            onValueChange={(val) => setScenario(val as Scenario)}
            disabled={isSimulating}
          >
            <SelectTrigger className="w-full bg-background/50">
              <SelectValue placeholder="Select Threat Scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genuine">Genuine (Live Human)</SelectItem>
              <SelectItem value="replay">Replay Attack (Video)</SelectItem>
              <SelectItem value="deepfake_like">Animated Deepfake / Puppet</SelectItem>
              <SelectItem value="poor_lighting">Poor Lighting Conditions</SelectItem>
              <SelectItem value="high_motion">High Motion / Blurry</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Visual Challenge</label>
          <Select 
            value={challengeType} 
            onValueChange={(val) => setChallengeType(val as ChallengeType)}
            disabled={isSimulating}
          >
            <SelectTrigger className="w-full bg-background/50">
              <SelectValue placeholder="Select Challenge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mixed">Mixed (Head Turn & Blink)</SelectItem>
              <SelectItem value="head_turn">Head Turn Only</SelectItem>
              <SelectItem value="blink">Blink Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-2 flex flex-col gap-2">
           {!sessionId ? (
             <Button onClick={() => initSession()} disabled={state === 'initializing'} className="w-full bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20">
               Initialize Session
             </Button>
           ) : (
             <>
               <Button 
                onClick={() => startAnalysis()} 
                disabled={isSimulating} 
                className="w-full font-semibold shadow-lg shadow-primary/20"
               >
                 {state === 'analyzing' ? 'Analyzing Signals...' : 'Start Synthesis Analysis'}
                 {!isSimulating && <Play className="w-4 h-4 ml-2 fill-current" />}
               </Button>
               {state === 'complete' || state === 'error' ? (
                 <Button onClick={resetDemo} variant="outline" className="w-full border-border/40">
                   <RotateCcw className="w-4 h-4 mr-2" />
                   Reset Demo
                 </Button>
               ) : null}
             </>
           )}
        </div>
      </CardContent>
    </Card>
  );
}
