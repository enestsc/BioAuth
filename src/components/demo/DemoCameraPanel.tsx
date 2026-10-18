"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DemoCameraPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let stream: MediaStream | null = null;
    async function startPreview() {
      try {
        const incoming = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 640, height: 480 }, audio: false });
        if (cancelled) { incoming.getTracks().forEach(track => track.stop()); return; }
        stream = incoming;
        if (videoRef.current) videoRef.current.srcObject = incoming;
        setConnected(true);
      } catch {
        if (!cancelled) { setError("Camera unavailable or permission denied. The simulation works without it."); setEnabled(false); }
      }
    }
    void startPreview();
    return () => {
      cancelled = true;
      stream?.getTracks().forEach(track => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [enabled]);

  function stopPreview() { setEnabled(false); setConnected(false); }

  return <Card className="border-border/60 overflow-hidden">
    <CardHeader className="p-4 py-3 border-b border-border/60"><CardTitle className="text-sm font-medium flex items-center gap-2"><Camera className="w-4 h-4 text-primary" />Optional camera preview</CardTitle></CardHeader>
    <CardContent className="p-0">
      <div className="relative bg-[#153b32] aspect-video flex items-center justify-center">
        <video ref={videoRef} autoPlay playsInline muted aria-label="Local camera preview" className={connected ? "object-cover w-full h-full -scale-x-100" : "hidden"} />
        {!connected && <div className="text-center text-[#afc8b5] px-5"><CameraOff className="w-7 h-7 mx-auto mb-2" /><p className="text-xs">No camera required</p></div>}
      </div>
      <div className="p-4 space-y-3"><p className="text-xs text-muted-foreground">Local preview only. Camera frames are not analysed or sent to the simulation API.</p>{error && <p className="text-xs text-destructive" role="status">{error}</p>}{enabled ? <Button variant="outline" size="sm" className="w-full" onClick={stopPreview}>Stop camera preview</Button> : <Button variant="outline" size="sm" className="w-full" onClick={() => { setError(""); setEnabled(true); }}>Enable camera preview</Button>}</div>
    </CardContent>
  </Card>;
}
