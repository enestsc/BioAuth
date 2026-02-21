import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BenchmarksPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl space-y-12">
      
      <div className="space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Performance Benchmarks</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experimental validation protocols and simulated accuracy metrics.
        </p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500/90 p-4 rounded-xl flex items-start gap-4 text-sm">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          <strong>Placeholder Notice:</strong> The charts and figures below represent <em>expected target metrics</em> for a full-scale rPPG pipeline. As this MVP relies on a generalized serverless simulation layer, these values are synthesized for demonstration continuity and do not reflect an audited evaluation.
        </p>
      </div>

      <Tabs defaultValue="liveness" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 border border-border/40">
          <TabsTrigger value="liveness">Liveness Performance</TabsTrigger>
          <TabsTrigger value="attacks">Attack Outcomes</TabsTrigger>
          <TabsTrigger value="environment">Environmental Robustness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="liveness" className="mt-6 space-y-6">
          <Card className="bg-card/40 border-border/40">
            <CardHeader>
              <CardTitle>Error Rate Projections (EER)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-64 border border-dashed border-border flex items-center justify-center rounded-lg bg-muted/20">
                <p className="text-muted-foreground font-mono text-sm">[ EER vs BPCER ROC Curve Placeholder ]</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border/40">
                  <div className="text-xs text-muted-foreground uppercase">Target False Accept Rate</div>
                  <div className="text-xl font-bold font-mono text-green-500">{"< 0.1%"}</div>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/40">
                  <div className="text-xs text-muted-foreground uppercase">Target False Reject Rate</div>
                  <div className="text-xl font-bold font-mono text-amber-500">{"< 2.5%"}</div>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/40">
                  <div className="text-xs text-muted-foreground uppercase">Decision Latency</div>
                  <div className="text-xl font-bold font-mono text-primary">{"~ 1,200ms"}</div>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/40">
                  <div className="text-xs text-muted-foreground uppercase">Signal Stability</div>
                  <div className="text-xl font-bold font-mono text-primary">{"> 0.8 SNR"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attacks" className="mt-6">
          <Card className="bg-card/40 border-border/40">
            <CardHeader>
              <CardTitle>Scenario-Wise Outcomes Context</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left relative">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border/40">
                    <tr>
                      <th className="py-3 px-4 rounded-tl-lg">Threat Vector</th>
                      <th className="py-3 px-4">Challenge Result (Visual)</th>
                      <th className="py-3 px-4">rPPG Liveness Output</th>
                      <th className="py-3 px-4 rounded-tr-lg">Final System Decision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20 text-muted-foreground">
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">Genuine User</td>
                      <td className="py-3 px-4">Pass</td>
                      <td className="py-3 px-4 text-green-500 font-mono">HIGH_CONFIDENCE</td>
                      <td className="py-3 px-4 font-semibold text-green-500">ACCEPT</td>
                    </tr>
                    <tr className="bg-muted/10">
                      <td className="py-3 px-4 font-medium text-foreground">Replay (Tablet)</td>
                      <td className="py-3 px-4">Pass (Deceived)</td>
                      <td className="py-3 px-4 text-destructive font-mono">NO_SIGNAL</td>
                      <td className="py-3 px-4 font-semibold text-destructive">REJECT</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">Deepfake Animation</td>
                      <td className="py-3 px-4">Pass (Deceived)</td>
                      <td className="py-3 px-4 text-destructive font-mono">INCONSISTENT</td>
                      <td className="py-3 px-4 font-semibold text-destructive">REJECT</td>
                    </tr>
                    <tr className="bg-muted/10">
                      <td className="py-3 px-4 font-medium text-foreground">3D Mask (Static)</td>
                      <td className="py-3 px-4">Fail</td>
                      <td className="py-3 px-4 text-destructive font-mono">NO_SIGNAL</td>
                      <td className="py-3 px-4 font-semibold text-destructive">REJECT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="environment" className="mt-6">
          <Card className="bg-card/40 border-border/40">
            <CardHeader>
              <CardTitle>Lighting and Motion Constraints</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-64 border border-dashed border-border flex items-center justify-center rounded-lg bg-muted/20">
                <p className="text-muted-foreground font-mono text-sm">[ Environmental Constraints Chart Placeholder ]</p>
              </div>
              <p className="text-sm text-muted-foreground mt-6 leading-relaxed">
                rPPG techniques are inherently sensitive to ambient lighting due to their reliance on optical absorption. Below ~50 lux (very dim lighting), pixel quantization noise overwhelms the microvascular color variations. Under such circumstances, the system defaults to a <span className="font-mono text-amber-500">RETRY_BETTER_LIGHTING</span> state rather than an outright rejection.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-4 border-t border-border/40">
        <Button variant="outline" className="text-muted-foreground border-border/60 hover:text-foreground" disabled>
          <Download className="w-4 h-4 mr-2" />
          Export Datasets (Coming Soon)
        </Button>
      </div>

    </div>
  );
}
