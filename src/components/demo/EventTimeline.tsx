"use client";

import { useBioAuthStore } from "@/lib/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { List } from "lucide-react";

export function EventTimeline() {
  const { events } = useBioAuthStore();

  return (
    <Card className="border-border/40 bg-card/50 flex flex-col h-full">
      <CardHeader className="p-4 py-3 border-b border-border/40">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <List className="w-4 h-4 text-primary" />
          Event Log
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-48 sm:h-full p-4">
          <div className="space-y-4">
            {events.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">No events recorded.</p>
            ) : (
              events.map((event, index) => {
                let colorClass = "text-muted-foreground";
                if (event.type === 'success') colorClass = "text-green-500";
                if (event.type === 'warning') colorClass = "text-amber-500";
                if (event.type === 'error') colorClass = "text-destructive";
                if (event.type === 'info') colorClass = "text-primary/70";

                return (
                  <div key={event.id} className="flex gap-3 text-sm">
                    <div className="flex flex-col items-center">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${colorClass.replace('text-', 'bg-')}`} />
                      {index !== events.length - 1 && <div className="w-px h-full bg-border mt-1" />}
                    </div>
                    <div className="flex flex-col pb-2">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                      <span className={`text-xs ${colorClass}`}>{event.message}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
