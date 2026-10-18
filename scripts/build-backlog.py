"""Build the dated PDF and CSV from the website's shared backlog data."""
import csv
import json
from collections import Counter
from datetime import date
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "src/data/backlog.json").read_text(encoding="utf-8"))
OUT = ROOT / "public/backlog"
OUT.mkdir(parents=True, exist_ok=True)
for name, file in [("BioAuthArial", "arial.ttf"), ("BioAuthArialBold", "arialbd.ttf")]:
    pdfmetrics.registerFont(TTFont(name, str(Path("C:/Windows/Fonts") / file)))
pdfmetrics.registerFontFamily("BioAuthArial", normal="BioAuthArial", bold="BioAuthArialBold")
styles = getSampleStyleSheet()
styles.add(ParagraphStyle("BodyBio", fontName="BioAuthArial", fontSize=10.5, leading=14.4, spaceAfter=6, textColor=colors.HexColor("#222222")))
styles.add(ParagraphStyle("SmallBio", parent=styles["BodyBio"], fontSize=9, leading=11.5, spaceAfter=3))
styles.add(ParagraphStyle("TitleBio", parent=styles["BodyBio"], fontName="BioAuthArialBold", fontSize=24, leading=29, spaceAfter=11, textColor=colors.black))
styles.add(ParagraphStyle("H1Bio", parent=styles["BodyBio"], fontName="BioAuthArialBold", fontSize=15, leading=19, spaceBefore=17, spaceAfter=9, keepWithNext=True, textColor=colors.black))
styles.add(ParagraphStyle("TaskBio", parent=styles["BodyBio"], fontName="BioAuthArialBold", fontSize=11, leading=15, spaceBefore=9, spaceAfter=5, keepWithNext=True, textColor=colors.black))
styles.add(ParagraphStyle("CellBio", parent=styles["BodyBio"], fontSize=9.5, leading=13, spaceAfter=0))

def p(value, style="BodyBio"):
    return Paragraph(value, styles[style])

def text(value):
    return escape(str(value))

def target(value):
    return date.fromisoformat(value).strftime("%d %b %Y") if value else "Future scope"

def table(rows, widths):
    result = Table([[p(text(c), "CellBio") for c in row] for row in rows], colWidths=widths, repeatRows=1, hAlign="LEFT")
    result.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E9EDE8")),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#D9D9D9")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return result

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("BioAuthArial", 8)
    canvas.setFillColor(colors.HexColor("#555555"))
    canvas.drawString(48, 30, "BioAuth | CMPE 492 | Group 1 | Planning proposal | 18 October 2026")
    canvas.drawRightString(letter[0] - 48, 30, str(doc.page))
    canvas.restoreState()

tasks = DATA["tasks"]
counts = Counter(t["status"] for t in tasks)
story = [
    p("BioAuth Project Backlog", "TitleBio"),
    p("TED University CMPE 492 Senior Design Project II<br/>Group 1 | Planning revision 1 | 18 October 2026"),
    p("<b>Planning proposal.</b> Use one project backlog to coordinate the four members. Each active item has one proposed accountable owner and a second proposed reviewer. The team must agree the assignments and internal targets before treating them as commitments."),
    p("The original 15 October v1 remains unchanged in the archive. This revision preserves B01-B29, adds the early feasibility check B30, and separates documented progress from unconfirmed implementation and submission status."),
    p("Proposed responsibilities", "H1Bio"),
    table([["Member", "Primary planning area"]] + [[m["name"], m["area"]] for m in DATA["members"]], [165, 351]),
    Spacer(1, 8),
    p("The owner coordinates delivery; the reviewer checks the acceptance evidence. Everyone contributes to integration, reporting and the final presentation. Item counts are not effort estimates or individual contribution grades.", "SmallBio"),
    p("Course delivery dates", "H1Bio"),
    table([
        ["Course date", "Required snapshot and deliverable"],
        ["16 Oct 2026", "LLD v1 and backlog; actual submission record needs confirmation"],
        ["23 Oct 2026", "LLD v2 following advisor feedback and updated backlog"],
        ["20 Nov 2026", "Test Plan and updated backlog"],
        ["31 Dec 2026", "Final Report and updated backlog"],
        ["04-17 Jan 2027", "Presentation and demo; exact date TBA"],
    ], [110, 406]),
    Spacer(1, 8),
    p("The dated Fall 2026-2027 table on syllabus page 7 sets the course deadlines at 23:59. Task targets below are proposed internal checkpoints unless they coincide with those deliverables. The 18 October revision does not prove publication or submission by 16 October.", "SmallBio"),
    PageBreak(),
    p("Backlog items", "H1Bio"),
    p("P0: core correctness or course delivery. P1: integration, evaluation or packaging. P2: deferred extension. Status records the evidence available on 18 October; it does not establish individual contribution.", "SmallBio"),
    p("Snapshot: " + "; ".join(f"{counts[s]} {s.lower()}" for s in ["Planned", "Review", "Needs confirmation", "Complete", "Deferred"]) + ". No implementation completion percentage is inferred.", "SmallBio"),
]
for task in tasks:
    deps = ", ".join(task["dependsOn"]) or "None"
    lines = [
        p(f'{task["id"]} {text(task["title"])}', "TaskBio"),
        p(f'<b>{task["priority"]} | {text(task["status"])} | Target: {target(task["target"])}</b>', "SmallBio"),
        p(f'Proposed owner: {text(task["owner"] or "Unassigned")} | Proposed reviewer: {text(task["reviewer"] or "Unassigned")}<br/>Dependencies: {deps} | {text(task["workstream"])}', "SmallBio"),
        p(f'<b>Done when</b> {text(task["acceptance"])}'),
        p(f'<b>Trace</b> {text(task["reference"])}', "SmallBio"),
    ]
    if task["evidence"]:
        lines.append(p(f'<b>Record</b> {text(task["evidence"])}', "SmallBio"))
    story.append(KeepTogether(lines))
story += [
    p("Weekly review and completion evidence", "H1Bio"),
    p("At each weekly meeting, update status, blockers, dependencies and evidence. The owner proposes next steps; the reviewer checks the acceptance criteria and records the review date."),
    p("Planned has no completion evidence; Review awaits acceptance; Needs confirmation requires an external record. Complete needs a commit, test result or reviewed artifact. Deferred has no delivery commitment."),
    p("Record actual contributors and test IDs separately from proposed owners. At each checkpoint, preserve the dated PDF and task export. Keep submission receipts and public publication dates as separate records; never backdate a snapshot."),
    p("Implementation safeguards", "H1Bio"),
    p("Usable rPPG remains mandatory for actionable ACCEPT across L1, C-Q, L2 and L3. A pulse is physiological evidence, not proof of fresh capture. Missing evidence cannot be hidden by weighting, an admin review or a learned model. Camera-derived templates require successful biometric enrollment and a bound approval."),
    p("C, C-Q and D must use the same evidence, shared gates and evaluation splits. Report ACCEPT, REJECT, RETRY, technical outcomes, coverage and latency together. Keep final-test labels out of threshold selection. L3 availability depends on adequate data; it cannot be claimed by relabelling an L2 result."),
    p("Priority risks", "H1Bio"),
    p("Address short-window and transport feasibility early in B30, then qualify the complete path in B13. Secure data access and consent in B19 before finalizing experiments. Keep core correctness, the Test Plan and controlled evaluation ahead of optional light challenge, native capture and deep-rPPG extensions."),
    p("Source and revision record", "H1Bio"),
    p("CMPE 492 syllabus, Fall 2026-2027: backlog requirement on p. 4, example on p. 5, grading on p. 6 and dated delivery table on p. 7. The example is not a required template.", "SmallBio"),
    p("BioAuth Low-Level Design Report, 16 October 2026: ADRs in 1.1.3, implementation contracts in 3.1-3.12, evaluation in 3.13, delivery in 3.14 and traceability in 3.15. This is the detailed implementation baseline.", "SmallBio"),
    p("BioAuth V2 Technical Foundation, Product Architecture and Implementation Roadmap, Design Baseline v2.0, 12 October 2026: research scope in 9, roadmap in 19-20 and paired-evidence experiments in 21. The LLD refines this reference.", "SmallBio"),
    p("BioAuth_Backlog_v1.docx, version 1 dated 15 October 2026: original B01-B29. This revision adds proposed named owners/reviewers, updates dependency targets, separates publication from course submission, records completed presentation work B25, and adds B30.", "SmallBio"),
]
pdf_path = OUT / Path(DATA["pdf"]).name
document = SimpleDocTemplate(str(pdf_path), pagesize=letter, rightMargin=48, leftMargin=48, topMargin=43, bottomMargin=49,
    title="BioAuth Project Backlog", author="BioAuth Project Team", subject="CMPE 492 Group 1 planning proposal dated 18 October 2026")
document.build(story, onFirstPage=footer, onLaterPages=footer)
csv_path = OUT / Path(DATA["csv"]).name
columns = ["id", "title", "priority", "status", "owner", "reviewer", "target", "workstream", "dependsOn", "reference", "acceptance", "evidence", "assignmentStatus", "snapshotDate"]
with csv_path.open("w", newline="", encoding="utf-8-sig") as stream:
    writer = csv.DictWriter(stream, fieldnames=columns)
    writer.writeheader()
    for task in tasks:
        writer.writerow({**task, "dependsOn": ", ".join(task["dependsOn"]), "assignmentStatus": DATA["assignmentStatus"], "snapshotDate": DATA["date"]})
print(f"Built {pdf_path.name} and {csv_path.name} from {len(tasks)} shared records.")
