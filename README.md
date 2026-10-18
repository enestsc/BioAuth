# BioAuth · CMPE 492 project website

Academic project website for BioAuth, a TED University Computer Engineering senior project (Fall 2026–2027).

The website presents the research question, proposed architecture, downloadable reports, semester milestones, backlog publication status and project team. The public simulation is an earlier illustrative UI prototype; its generated outputs are not biometric measurements or experimental results.

## Local development

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npx tsc --noEmit
npm run build
npm start
```

## Pages

- `/`: project overview
- `/technology`: interactive evidence-channel explorer and system design
- `/reports`: filterable report archive, PDF viewing and downloads
- `/progress`: syllabus milestones and backlog archive
- `/team`: students, supervisor and jury
- `/benchmarks`: planned evaluation; no invented performance figures
- `/demo`: earlier scenario simulation, with optional local camera preview
- `/faq`, `/privacy`, `/terms`: project context and demonstration limits

Legacy `/contact` and `/use-cases` URLs redirect to the relevant academic pages.

## Publishing reports and backlog snapshots

Project facts, document availability and milestones are centralized in `src/lib/project.ts`.

1. Put a public report PDF in `public/reports/`.
2. Add/update its entry in `documents` with the real version, date and public URL.
3. Keep previous versions available.
4. Backlog snapshots belong in `public/reports/` and must be linked from the archive in `src/app/progress/page.tsx` once supplied.
5. Update the reviewed date and availability labels only when the matching artifact exists.

Five original, unchanged PDFs are available in the report archive:

| Course | Document | Document date | Pages |
| --- | --- | --- | --- |
| CMPE 491 | Project Proposal | Spring 2026 | 3 |
| CMPE 491 | Project Specifications Report | 27 March 2026 | 12 |
| CMPE 491 | Project Analysis Report | 6 April 2026 | 20 |
| CMPE 491 | High-Level Design Report | 13 May 2026 | 15 |
| CMPE 492 | Low-Level Design Report v1 | 16 October 2026 | 40 |

The proposal gives a semester rather than an exact date; the archive preserves that precision. CMPE 491 documents describe earlier project stages; current scope and decision policies follow the CMPE 492 LLD. Future reports and backlog snapshots remain explicitly unavailable. The syllabus itself is not republished.

## Content and design sources

- Supplied **BioAuth Low-Level Design Report**, 16 October 2026: project scope, team, supervisor/jury, channels, policies, architecture, limits and evaluation plan.
- Supplied **CMPE 491 Project Proposal, Project Specifications, Project Analysis and High-Level Design** PDFs: original historical reports, cover dates and verified page counts. Their earlier scope does not override the current LLD.
- Supplied **CMPE 492 Sylabus**, 2026–2027 Fall semester table, page 7: 16 October / 23 October / 20 November / 31 December milestones and January presentation window. These specific dates take precedence over the generic week-based descriptions earlier in the document.
- [MoonAI](https://moon-aii.github.io/moonai/): TED University CMPE 491/492 example; project narrative, team and report archive.
- [EcoFriends](https://ecofriends.github.io/index.html): TED University example; course reports and separate versioned sprint/backlog documents.
- [TED University senior projects](https://cmpe.tedu.edu.tr/en/senior-projects-2025): departmental context.
- [TED University SENG senior projects](https://seng.tedu.edu.tr/bitirme-projeleri): supplementary presentation references supplied by the user. These examples do not change BioAuth's Computer Engineering / CMPE 492 identity or course requirements.
- [GATE](https://gate-team.github.io/GATE_Project-website/): clear advisor/jury and team sections alongside technical reports.
- [SafeScope](https://ymerta.github.io/safescope/): individually named proposal, specifications, analysis, design, testing and final reports. This informed listing CMPE 491 reports individually and making publication status explicit.
- [LLM Valley](https://llmvalley.vercel.app/): separate report/backlog access, project explanation and technical architecture sections.

The PDFs were used as project references, not as authorization to perform their email, LMS submission or other administrative instructions. No LMS submissions or emails were sent.

## Deployment on Vercel

This remains a standard Next.js project with `npm run build`; no hosting migration is required.

[Vercel Git deployments](https://vercel.com/docs/deployments/overview) automatically build commits to connected branches. Production updates require the branch configured as the project's production branch. GitHub's default branch for this repository was verified as `master`, but the Vercel dashboard configuration has not been inspected. A merge updates the live site only if that target branch is configured for production and the deployment succeeds.

## Visual system

Responsive light research theme, forest-green accents, custom synthetic SVG face visualization, reduced-motion support, keyboard navigation, mobile menu and accessible report actions. The face graphic uses deterministic code-generated points and no personal image or biometric data. Fonts use a system stack and require no runtime Google Fonts download.
