"use client";

import { useState } from "react";
import { documents } from "@/lib/project";
import { DocumentRow } from "@/components/DocumentRow";

export function ReportArchive() {
  const [filter, setFilter] = useState("All documents");
  const filtered = documents.filter(doc => filter === "All documents" || doc.course === filter || (filter === "Available" && doc.href));
  return <>
    <div className="filter-bar" aria-label="Filter reports">{["All documents", "CMPE 492", "CMPE 491", "Available"].map(item => <button type="button" key={item} className="filter-button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
    <p className="sr-only" role="status">{filtered.length} documents shown</p>
    <div className="document-list">{filtered.map(doc => <DocumentRow doc={doc} key={doc.title + doc.version} />)}</div>
  </>;
}
