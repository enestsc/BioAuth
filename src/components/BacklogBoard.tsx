"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCheck, Search, UsersRound } from "lucide-react";
import backlog from "@/data/backlog.json";

const statuses = ["All statuses", "Planned", "Review", "Needs confirmation", "Complete", "Deferred"];

function targetDate(value: string | null) {
  if (!value) return "Future scope";
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export function BacklogBoard() {
  const [owner, setOwner] = useState("All members");
  const [status, setStatus] = useState("All statuses");
  const [query, setQuery] = useState("");
  const filtered = backlog.tasks.filter(task =>
    (owner === "All members" || (owner === "Unassigned" ? task.owner === null : task.owner === owner)) &&
    (status === "All statuses" || task.status === status) &&
    `${task.id} ${task.title} ${task.workstream} ${task.reference}`.toLocaleLowerCase("en").includes(query.trim().toLocaleLowerCase("en"))
  );

  return <>
    <div className="backlog-proposal"><UsersRound size={24} strokeWidth={1.4} aria-hidden="true" /><div><h3>One project backlog. Four proposed owners.</h3><p>Group {backlog.group} · {backlog.dateLabel}. Assignments, reviewers and internal targets are a planning proposal awaiting team agreement. This snapshot records available evidence; it does not confirm course submission.</p></div></div>
    <div className="backlog-owners">{backlog.members.map(member => <article key={member.name}><span className="eyebrow">PROPOSED RESPONSIBILITY</span><h3>{member.name}</h3><p>{member.area}</p></article>)}</div>
    <div className="backlog-summary" aria-label="Backlog snapshot summary">{["Planned", "Review", "Needs confirmation", "Complete", "Deferred"].map(label => <div key={label}><strong>{backlog.tasks.filter(task => task.status === label).length}</strong><span>{label}</span></div>)}</div>
    <p className="backlog-caption">P0 · core correctness / course delivery &nbsp; P1 · integration / evaluation / packaging &nbsp; P2 · future scope. Counts describe backlog items, not an implementation completion percentage.</p>
    <div className="backlog-filters">
      <label className="backlog-search"><span>Search tasks</span><span className="backlog-search-input"><Search size={16} aria-hidden="true" /><input type="search" placeholder="Task, requirement or test ID" value={query} onChange={event => setQuery(event.target.value)} /></span></label>
      <label><span>Proposed owner</span><select value={owner} onChange={event => setOwner(event.target.value)}><option>All members</option>{backlog.members.map(member => <option key={member.name}>{member.name}</option>)}<option>Unassigned</option></select></label>
      <label><span>Status</span><select value={status} onChange={event => setStatus(event.target.value)}>{statuses.map(item => <option key={item}>{item}</option>)}</select></label>
    </div>
    <p className="backlog-result" role="status">{filtered.length} of {backlog.tasks.length} tasks shown</p>
    <div className="backlog-task-list">{filtered.map(task => <article className="backlog-task" key={task.id} id={`task-${task.id.toLowerCase()}`}>
      <div className="backlog-task-top"><span className="backlog-task-id">{task.id}</span><span className="backlog-priority">{task.priority}</span><span className={task.status === "Complete" ? "status-tag available" : "status-tag"}>{task.status === "Complete" && <CheckCheck size={12} aria-hidden="true" />}{task.status}</span></div>
      <h3>{task.title}</h3><div className="backlog-task-meta"><span>{task.workstream}</span><span>{task.target ? "Target: " : ""}{targetDate(task.target)}</span></div>
      <dl><div><dt>Proposed owner</dt><dd>{task.owner ?? "Unassigned"}</dd></div><div><dt>Proposed reviewer</dt><dd>{task.reviewer ?? "Unassigned"}</dd></div></dl>
      <details><summary>Acceptance criteria &amp; traceability</summary><p><strong>Done when:</strong> {task.acceptance}</p><p><strong>Depends on:</strong> {task.dependsOn.length ? task.dependsOn.join(", ") : "No prerequisite tasks"}</p><p><strong>Design / tests:</strong> {task.reference}</p>{task.evidence && <p><strong>Evidence / record:</strong> {task.evidence}</p>}</details>
    </article>)}</div>
    {filtered.length === 0 && <div className="backlog-empty"><p>No tasks match these filters.</p><button type="button" className="text-link" onClick={() => { setOwner("All members"); setStatus("All statuses"); setQuery(""); }}>Reset filters <ArrowUpRight size={14} /></button></div>}
    <p className="inline-note">The owner coordinates delivery; the reviewer checks the evidence. Complete requires the acceptance criteria plus a commit, test result or reviewed artifact. Proposed ownership does not establish past individual contribution. Deferred work has no current delivery promise.</p>
  </>;
}
