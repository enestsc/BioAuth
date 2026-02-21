"use client";

import { useEffect, useRef } from "react";
import { useBioAuthStore } from "@/lib/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, RefreshCcw } from "lucide-react";

export function DemoCameraPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { setCameraConnected, setFaceDetected, setLightingGood } = useBioAuthStore();

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user", width: 640, height: 480 } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        setCameraConnected(true);
        setFaceDetected(true); // Simulated for MVP
        setLightingGood(true); // Simulated for MVP
      } catch (err) {
        console.error("Camera access denied", err);
        setCameraConnected(false);
      }
    }
    setupCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [setCameraConnected, setFaceDetected, setLightingGood]);

  const { cameraConnected, faceDetected, lightingGood } = useBioAuthStore();

  return (
    <Card className="border-border/40 bg-card/50 overflow-hidden">
      <CardHeader className="p-4 py-3 border-b border-border/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Camera className="w-4 h-4 text-primary" />
          Live Capture
        </CardTitle>
        <div className="flex gap-2">
          {cameraConnected ? (
            <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/10">Active</Badge>
          ) : (
            <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/10">Offline</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 relative bg-black aspect-video flex items-center justify-center overflow-hidden">
        {cameraConnected ? (
           <video 
             ref={videoRef} 
             autoPlay 
             playsInline 
             muted 
             className="object-cover w-full h-full -scale-x-100"
           />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
             <Camera className="w-8 h-8 opacity-50" />
             <p className="text-sm">Camera permission denied</p>
          </div>
        )}
        
        {/* Face tracking bounding box graphic */}
        {cameraConnected && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className={`w-48 h-64 border-2 rounded-xl border-dashed transition-colors duration-500 ${faceDetected ? 'border-primary/60' : 'border-destructive/60'}`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white">
                ROI Extractor
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {/* Status Chips */}
      <div className="bg-background/40 backdrop-blur-sm p-3 grid grid-cols-2 gap-2 text-xs border-t border-border/40">
        <div className="flex items-center gap-2 justify-center py-1 rounded bg-muted/40 border border-border/50">
          <div className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
          Face Centered
        </div>
        <div className="flex items-center gap-2 justify-center py-1 rounded bg-muted/40 border border-border/50">
          <div className={`w-2 h-2 rounded-full ${lightingGood ? 'bg-primary' : 'bg-destructive'}`}></div>
          Lighting Acceptable
        </div>
      </div>
    </Card>
  );
}
