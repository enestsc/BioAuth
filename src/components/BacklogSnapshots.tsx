"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, Eye, FileClock } from "lucide-react";
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
      <div><strong>{activeIndex < 0 ? "All course backlog deadlines have passed" : `Active snapshot: SS${activeIndex + 1}`}</strong><p>{activeIndex < 0 ? "All four checkpoints remain accessible in the archive." : `Due ${snapshots[activeIndex].date} at 23:59 · Turkey time (UTC+03:00)`}</p></div>
    </div>
    <div className="snapshot-selector" role="group" aria-label="Backlog snapshots">
      {snapshots.map((snapshot, index) => {
        const future = activeIndex >= 0 && index > activeIndex;
        const active = index === activeIndex;
        return <button type="button" key={snapshot.iso} id={`snapshot-selector-${index + 1}`} disabled={future} aria-pressed={selectedIndex === index} aria-controls="snapshot-document" data-current={active} onClick={() => setSelection({ period: activeIndex, index })}>
          <span className="snapshot-number">SS{index + 1}</span><strong>Snapshot {index + 1}</strong><span className="snapshot-due">Due {snapshot.date}</span><span className={active ? "status-tag available" : "status-tag"}>{active ? "Active" : future ? "Upcoming" : "Past checkpoint"}</span>
        </button>;
      })}
    </div>
    <section className="snapshot-document" id="snapshot-document" aria-labelledby={`snapshot-selector-${selectedIndex + 1}`}>
      <div className="eyebrow">SNAPSHOT {selectedIndex + 1} · {selected.label}</div>
      {selectedIndex === 0 ? <>
        <h3>The original backlog</h3><p>The original v1 was prepared on 15 October 2026 for the 16 October checkpoint. This role-based document is preserved unchanged; its preparation date does not confirm course submission.</p>
        <a href={backlog.original} download className="text-link">Download original DOCX <ArrowDownToLine size={15} /></a>
      </> : selectedIndex === 1 ? <>
        <h3>Proposed team backlog</h3><p>The 18 October planning revision supports the 23 October checkpoint. Thirty items include proposed owners, reviewers, targets and LLD/test references. Team agreement and course submission remain separate records.</p>
        <div className="backlog-download-links"><ReportPreview href={backlog.pdf} title="BioAuth Project Backlog" description="CMPE 492 · Group 1 · Planning revision · 18 October 2026" className="text-link">Open PDF <Eye size={15} /></ReportPreview><a href={backlog.csv} download className="text-link">Editable CSV <ArrowDownToLine size={15} /></a></div>
      </> : <>
        <h3>Snapshot document awaiting publication</h3><p>A dated backlog document has not been published for this checkpoint. New versions appear here when added; the calendar does not create or submit a new backlog version.</p>
      </>}
    </section>
    <p className="inline-note">The next snapshot becomes active after the previous deadline ends at 23:59 in Turkey. Earlier snapshots stay accessible; future snapshots unlock in order. Calendar status and document availability are tracked separately.</p>
  </>;
}
