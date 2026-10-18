"use client";

import { useEffect, useState } from "react";
import { Eye, FileClock } from "lucide-react";
import { ReportPreview } from "@/components/ReportPreview";
import { activeSnapshotIndex, nextSnapshotRefreshDelay } from "@/lib/backlog-schedule";
import { milestones } from "@/lib/project";
import backlog from "@/data/backlog.json";

const snapshots = milestones.slice(0, 4);
const dates = snapshots.map(snapshot => snapshot.iso);

export function BacklogSnapshots({ initialNow }: { initialNow: number }) {
  const [now, setNow] = useState(initialNow);
  const [selection, setSelection] = useState<{ period: number; index: number } | null>(null);
  const activeIndex = activeSnapshotIndex(dates, now);
  const selectedIndex = selection?.period === activeIndex ? selection.index : activeIndex < 0 ? snapshots.length - 1 : activeIndex;
  const selected = snapshots[selectedIndex];

  useEffect(() => {
    let timer: number;
    const refresh = () => {
      window.clearTimeout(timer);
      const current = Date.now();
      setNow(current);
      timer = window.setTimeout(refresh, nextSnapshotRefreshDelay(dates, current));
    };
    const resume = () => { if (document.visibilityState === "visible") refresh(); };
    timer = window.setTimeout(refresh, 0);
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("focus", refresh);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return <>
    <div className="snapshot-current" aria-live="polite">
      <FileClock size={22} strokeWidth={1.4} aria-hidden="true" />
      <div><strong>{activeIndex < 0 ? "Backlog archive" : `Current snapshot: SS${activeIndex + 1}`}</strong><p>{activeIndex < 0 ? "Explore the semester backlog documents." : `Due ${snapshots[activeIndex].date}`}</p></div>
    </div>
    <div className="snapshot-selector" role="group" aria-label="Backlog snapshots">
      {snapshots.map((snapshot, index) => {
        const future = activeIndex >= 0 && index > activeIndex;
        const active = index === activeIndex;
        return <button type="button" key={snapshot.iso} id={`snapshot-selector-${index + 1}`} disabled={future} aria-pressed={selectedIndex === index} aria-controls="snapshot-document" data-current={active} onClick={() => setSelection({ period: activeIndex, index })}>
          <span className="snapshot-number">SS{index + 1}</span><strong>Snapshot {index + 1}</strong><span className="snapshot-due">Due {snapshot.date}</span><span className={active ? "status-tag available" : "status-tag"}>{active ? "Current" : future ? "Upcoming" : "Archive"}</span>
        </button>;
      })}
    </div>
    <section className="snapshot-document" id="snapshot-document" aria-labelledby={`snapshot-selector-${selectedIndex + 1}`}>
      <div className="eyebrow">SNAPSHOT {selectedIndex + 1} · {selected.label}</div>
      {selectedIndex === 0 ? <>
        <h3>Initial project backlog</h3><p>The first implementation roadmap, covering project priorities, milestones and delivery criteria. Version 1 · 15 October 2026.</p>
        <ReportPreview href={backlog.original} title="BioAuth TODO and Backlog" description="CMPE 492 · Group 1 · Version 1 · 15 October 2026" className="text-link">View document <Eye size={15} /></ReportPreview>
      </> : selectedIndex === 1 ? <>
        <h3>Team implementation plan</h3><p>A shared roadmap for system development, integration and evaluation. Updated 18 October 2026.</p>
        <div className="backlog-download-links"><ReportPreview href={backlog.pdf} title="BioAuth Project Backlog" description="CMPE 492 · Group 1 · 18 October 2026" className="text-link">View document <Eye size={15} /></ReportPreview><ReportPreview href={backlog.csv} title="BioAuth Task List" description="CMPE 492 · Group 1 · 30 work items · 18 October 2026" className="text-link">View task list <Eye size={15} /></ReportPreview></div>
      </> : <>
        <h3>Coming soon</h3><p>The backlog document for this milestone will be available here.</p>
      </>}
    </section>
  </>;
}
