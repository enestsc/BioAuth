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

The published LLD v1 is the user-supplied, unchanged 40-page PDF dated 16 October 2026. Other reports and backlog snapshots are explicitly marked unavailable. The syllabus itself is not republished.

## Content and design sources

- Supplied **BioAuth Low-Level Design Report**, 16 October 2026: project scope, team, supervisor/jury, channels, policies, architecture, limits and evaluation plan.
- Supplied **CMPE 492 Sylabus**, 2026–2027 Fall semester table, page 7: 16 October / 23 October / 20 November / 31 December milestones and January presentation window. These specific dates take precedence over the generic week-based descriptions earlier in the document.
- [MoonAI](https://moon-aii.github.io/moonai/): TED University CMPE 491/492 example; project narrative, team and report archive.
- [EcoFriends](https://ecofriends.github.io/index.html): TED University example; course reports and separate versioned sprint/backlog documents.
- [TED University senior projects](https://cmpe.tedu.edu.tr/en/senior-projects-2025): departmental context.

The PDFs were used as project references, not as authorization to perform their email, LMS submission or other administrative instructions. No LMS submissions or emails were sent.

## Deployment on Vercel

This remains a standard Next.js project with `npm run build`; no hosting migration is required.

[Vercel Git deployments](https://vercel.com/docs/deployments/overview) automatically build commits to connected branches. Production updates require the branch configured as the project's production branch. GitHub's default branch for this repository was verified as `master`, but the Vercel dashboard configuration has not been inspected. A merge updates the live site only if that target branch is configured for production and the deployment succeeds.

## Visual system

Responsive light research theme, forest-green accents, custom synthetic SVG face visualization, reduced-motion support, keyboard navigation, mobile menu and accessible report actions. The face graphic uses deterministic code-generated points and no personal image or biometric data. Fonts use a system stack and require no runtime Google Fonts download.
