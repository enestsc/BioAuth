"""Export the original DOCX paragraphs and tables for the in-site reader."""
import json
from pathlib import Path
from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph
from docx.oxml.ns import qn

source = Path(__file__).resolve().parents[1] / 'public/backlog/bioauth-backlog-v1-original.docx'
document = Document(source)
blocks = []
for element in document.element.body.iterchildren():
    if element.tag == qn('w:p'):
        paragraph = Paragraph(element, document)
        if paragraph.text.strip():
            blocks.append({'kind': 'paragraph', 'style': paragraph.style.name, 'text': paragraph.text})
    elif element.tag == qn('w:tbl'):
        table = Table(element, document)
        blocks.append({'kind': 'table', 'rows': [[cell.text for cell in row.cells] for row in table.rows]})
destination = source.with_suffix('.preview.json')
destination.write_text(json.dumps({'blocks': blocks}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Exported {len(blocks)} document blocks to {destination.name}')
