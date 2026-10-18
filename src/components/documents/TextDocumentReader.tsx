"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { parseCSV, type WordBlock } from "@/lib/document-preview";

type DocumentData = { format: "docx"; blocks: WordBlock[] } | { format: "csv"; rows: string[][] };
const columnLabels: Record<string, string> = { id: "ID", title: "Work item", priority: "Priority", status: "Status", owner: "Owner", reviewer: "Reviewer", target: "Target", workstream: "Workstream", dependsOn: "Dependencies", reference: "Reference", acceptance: "Completion criteria", evidence: "Record", assignmentStatus: "Assignment", snapshotDate: "Snapshot date" };

export function TextDocumentReader({ href, format }: { href: string; format: "docx" | "csv" }) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [error, setError] = useState(false);
  const [allColumns, setAllColumns] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(format === "docx" ? href.replace(/\.docx$/i, ".preview.json") : href, { signal: controller.signal });
        if (!response.ok) throw new Error("Document unavailable");
        const result: DocumentData = format === "docx" ? { format, blocks: (await response.json()).blocks } : { format, rows: parseCSV(await response.text()) };
        if (!controller.signal.aborted) setData(result);
      } catch { if (!controller.signal.aborted) setError(true); }
    }
    void load();
    return () => controller.abort();
  }, [href, format]);

  if (error) return <p className="document-reader-error" role="alert">The document could not be loaded. Close this window and try again, or use the options above.</p>;
  if (!data) return <p className="document-reader-loading" role="status"><LoaderCircle size={20} className="reader-spinner" aria-hidden="true" />Loading document…</p>;
  if (data.format === "docx") return <div className="text-reader-viewport"><article className="word-document">{data.blocks.map((block, index) => block.kind === "table" ? <div className="word-table-scroll" key={index}><table><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, columnIndex) => rowIndex === 0 ? <th key={columnIndex}>{cell}</th> : <td key={columnIndex}>{cell}</td>)}</tr>)}</tbody></table></div> : block.style === "Title" ? <h2 key={index}>{block.text}</h2> : /^Heading/.test(block.style) ? <h3 key={index}>{block.text}</h3> : <p key={index}>{block.text}</p>)}</article></div>;

  const [headers = [], ...rows] = data.rows;
  const visible = headers.map((name, index) => ({ name, index })).filter(column => allColumns || ["id", "title", "priority", "status", "owner", "target"].includes(column.name));
  return <div className="csv-reader" data-expanded={allColumns}><div className="csv-reader-controls"><span>{rows.length} work items</span><label><input type="checkbox" checked={allColumns} onChange={event => setAllColumns(event.target.checked)} />Show all columns</label></div><div className="csv-reader-scroll"><table><thead><tr>{visible.map(column => <th key={column.index} scope="col">{columnLabels[column.name] ?? column.name}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{visible.map(column => <td key={column.index}>{row[column.index] || "—"}</td>)}</tr>)}</tbody></table></div></div>;
}
