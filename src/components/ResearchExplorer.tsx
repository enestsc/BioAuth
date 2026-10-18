"use client";

import { useState } from "react";
import { Activity, ScanFace, ShieldCheck, SlidersHorizontal, ArrowRight } from "lucide-react";

const channels = [
  { id: "face", label: "Face verification", icon: ScanFace, code: "01 / IDENTITY", title: "Is this the expected person?", description: "A one-to-one facial comparison evaluates a live capture against an approved reference template. Model and preprocessing versions must be compatible before evidence can be interpreted.", method: "Face embeddings · cosine similarity", output: "Match evidence + quality + model version", limit: "A face match alone cannot distinguish a person from a replay of that person." },
  { id: "pad", label: "Visual PAD", icon: ShieldCheck, code: "02 / PRESENTATION", title: "Does the presentation look suspicious?", description: "A dedicated presentation attack detection module examines sampled face crops. Its evidence includes a bona-fide score, attack flags and temporal stability, independently of identity matching.", method: "Visual PAD adapter · sampled frames", output: "Presentation evidence + attack indicators", limit: "Physical presentation attacks and digital camera injection require separate evaluation protocols." },
  { id: "rppg", label: "Physiological evidence", icon: Activity, code: "03 / PHYSIOLOGY", title: "Is the physiological signal usable?", description: "Subtle colour changes in forehead and cheek regions are processed with classical CHROM and POS methods. Signal quality, sampling gaps and agreement between regions determine whether the evidence is usable.", method: "CHROM / POS · filtering · Welch PSD", output: "Usability + signal quality + nullable pulse estimate", limit: "Replayed or synthetic video may contain pulse-like signals. rPPG alone does not prove liveness or freshness." },
  { id: "quality", label: "Capture quality", icon: SlidersHorizontal, code: "04 / RELIABILITY", title: "Can the measurements be trusted?", description: "Lighting, motion, alignment, blur and sampling quality affect each channel differently. Reliability is kept separate from identity and attack scores so poor capture conditions can lead to a retry.", method: "Channel-specific, validation-fitted quality mappings", output: "Reliability vector + capture diagnostics", limit: "An unreliable measurement is missing evidence; it must not silently become a zero score or a match failure." },
];

export function ResearchExplorer() {
  const [active, setActive] = useState(0);
  const current = channels[active];
  const Icon = current.icon;
  return <div className="research-explorer"><div className="explorer-tabs" role="tablist" aria-label="Evidence channels">{channels.map((channel, i) => <button key={channel.id} id={`tab-${channel.id}`} type="button" role="tab" aria-selected={active === i} aria-controls={`panel-${channel.id}`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={event => {
    const next = event.key === "ArrowRight" ? (i + 1) % channels.length : event.key === "ArrowLeft" ? (i + channels.length - 1) % channels.length : event.key === "Home" ? 0 : event.key === "End" ? channels.length - 1 : null;
    if (next !== null) { event.preventDefault(); setActive(next); document.getElementById(`tab-${channels[next].id}`)?.focus(); }
  }}><channel.icon size={18} />{channel.label}<ArrowRight size={15} /></button>)}</div><div className="explorer-panel" id={`panel-${current.id}`} role="tabpanel" aria-labelledby={`tab-${current.id}`} tabIndex={0}><div className="explorer-top"><span className="eyebrow">{current.code}</span><Icon size={33} strokeWidth={1.2} /></div><h3>{current.title}</h3><p>{current.description}</p><dl><div><dt>METHOD</dt><dd>{current.method}</dd></div><div><dt>OUTPUT</dt><dd>{current.output}</dd></div></dl><p className="explorer-limit">{current.limit}</p></div></div>;
}
