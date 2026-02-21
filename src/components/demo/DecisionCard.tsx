"use client";

import { useBioAuthStore } from "@/lib/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

export function DecisionCard() {
  const { latestResult, state } = useBioAuthStore();

  if (state !== 'complete' || !latestResult) {
    return (
      <Card className="border-border/40 bg-card/50 h-full">
        <CardContent className="p-8 flex flex-col items-center justify-center h-full text-muted-foreground opacity-50 space-y-4">
          <ShieldQuestion className="w-16 h-16" />
          <p className="text-sm">Awaiting simulation results...</p>
        </CardContent>
      </Card>
    );
  }

  const { decision, reason_codes, explanation, recommendation } = latestResult;

  let badgeColor = "";
  let Icon = ShieldQuestion;
  let decisionText = "";

  if (decision === 'accept') {
    badgeColor = "bg-green-500/10 text-green-500 border-green-500/20";
    Icon = ShieldCheck;
    decisionText = "LIVENESS APPROVED";
  } else if (decision === 'retry') {
    badgeColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
    Icon = ShieldAlert;
    decisionText = "RETRY REQUESTED";
  } else {
    badgeColor = "bg-destructive/10 text-destructive border-destructive/20";
    Icon = ShieldAlert;
    decisionText = "LIVENESS REJECTED";
  }

  return (
    <Card className="border-border/40 bg-card/50 h-full flex flex-col">
      <CardHeader className="p-4 py-3 border-b border-border/40">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          Decision Output
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <div className={`p-4 rounded-full border ${badgeColor}`}>
            <Icon className="w-12 h-12" />
          </div>
          <Badge className={`text-lg px-4 py-1.5 font-bold tracking-widest ${badgeColor}`} variant="outline">
            {decisionText}
          </Badge>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Explanation</h4>
            <p className="text-sm leading-relaxed">{explanation}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Reason Codes</h4>
            <div className="flex flex-wrap gap-2">
              {reason_codes.map(code => (
                <Badge key={code} variant="secondary" className="font-mono text-[10px] bg-background">
                  {code}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Suggested Action</h4>
            <div className="text-sm font-medium px-3 py-2 bg-background border border-border/40 rounded-md capitalize">
              {recommendation.replace(/_/g, " ")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
