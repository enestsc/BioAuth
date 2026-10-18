# BioAuth · CMPE 492 Senior Project

BioAuth is a **TED University Computer Engineering** senior project researching quality- and attack-aware fusion of face verification, visual presentation attack detection (PAD) and remote photoplethysmography (rPPG).

This repository contains the **academic project website**: research context, system design, downloadable reports, course milestones and the project team. The proposed Python biometric engine is described in the reports; it is not implemented by this Next.js website.

**Live website:** [bioauth-deploy.vercel.app](https://bioauth-deploy.vercel.app)

## Repositories and production

| Repository | Default branch | Purpose | Local remote |
| --- | --- | --- | --- |
| [enestsc/BioAuth](https://github.com/enestsc/BioAuth) | `master` | Public development source and project documentation | `origin` |
| [enestsc/bioauth-deploy](https://github.com/enestsc/bioauth-deploy) | `main` | Private deployment source connected to Vercel | `deploy` |

**Vercel production follows `bioauth-deploy/main`.** Merging a change into `BioAuth/master` alone does not update the live website. Both repositories contain the same website files at a synchronized release, while retaining their own Git histories and commit IDs.

The existing local checkout is `D:\bioauth`, with both remotes configured. A separate local deployment folder is not required.

### Release workflow

1. Develop and review changes in a branch of `BioAuth`.
2. Run the production build and relevant checks, then merge into `master`.
3. Synchronize the reviewed website files into a branch based on `bioauth-deploy/main`, preserving that repository's history.
4. Merge the deployment pull request into `main`. Vercel builds and publishes the production site.
5. Verify the live pages and report downloads.

After fetching both remotes, compare the released source trees with:

```sh
git fetch origin
git fetch deploy
git diff --stat origin/master deploy/main
```

An empty diff means the website files match. The commit IDs can differ because the repositories have separate histories.

## Local development

Requires **Node.js 20.9+** and npm.

```sh
git clone https://github.com/enestsc/BioAuth.git
cd BioAuth
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

To connect an additional checkout to the private deployment repository, authenticate with a GitHub account that has access and add the deployment remote:

```sh
git remote add deploy https://github.com/enestsc/bioauth-deploy.git
git fetch deploy
```

The existing `D:\bioauth` checkout already has this remote.

### Validation and production preview

```sh
npx tsc --noEmit
npm run build
npm start
```

`npm start` serves the previously built production output. Use `npm run dev` for development.

## Website structure

| Route | Content |
| --- | --- |
| `/` | Project overview and research question |
| `/technology` | Interactive evidence-channel explorer, fusion policies and proposed architecture |
| `/reports` | Filterable CMPE 491/492 report archive with PDF viewing and downloads |
| `/progress` | Semester milestones, planned workstreams and backlog publication status |
| `/team` | Students, supervisor and jury |
| `/benchmarks` | Evaluation plan and intended metrics |
| `/demo` | Earlier illustrative scenario simulation with optional local camera preview |
| `/faq` | Project questions and limitations |
| `/privacy` | Website data handling and demonstration scope |
| `/terms` | Academic demonstration context |

Legacy `/contact` and `/use-cases` addresses redirect to the relevant academic pages.

### Source layout

```text
src/app/                       Pages and simulation API routes
src/components/                Project UI, visualization and simulation components
src/lib/project.ts             Team, report registry and semester milestones
src/lib/server/                Synthetic scenario responses
public/reports/                Original published report PDFs
public/icon.svg                BioAuth website icon
```

The website uses Next.js 16, React 19, TypeScript, Tailwind CSS 4, Radix UI and Lucide. The illustrative console uses Recharts and Zustand. The synthetic SVG face graphic contains no photograph or personal biometric data. System fonts avoid external font-download dependencies.

## Published reports

The archive contains five unchanged original PDFs:

| Course | Document | Document date | Pages |
| --- | --- | --- | --- |
| CMPE 491 | [Project Proposal](public/reports/bioauth-project-proposal.pdf) | Spring 2026 | 3 |
| CMPE 491 | [Project Specifications Report](public/reports/bioauth-project-specifications.pdf) | 27 March 2026 | 12 |
| CMPE 491 | [Project Analysis Report](public/reports/bioauth-project-analysis.pdf) | 6 April 2026 | 20 |
| CMPE 491 | [High-Level Design Report](public/reports/bioauth-high-level-design.pdf) | 13 May 2026 | 15 |
| CMPE 492 | [Low-Level Design Report v1](public/reports/bioauth-low-level-design-v1.pdf) | 16 October 2026 | 40 |

The proposal specifies a semester rather than an exact date. CMPE 491 reports preserve earlier project stages; the CMPE 492 Low-Level Design Report defines the current system scope and decision policies.

### Adding reports and backlog snapshots

1. Place the original public PDF in `public/reports/`, using a stable filename.
2. Update its registry entry in `src/lib/project.ts` with the actual document date, version, URL and availability.
3. Preserve earlier versions when publishing a revision.
4. Add supplied backlog snapshots to the archive in `src/app/progress/page.tsx`.
5. Update the reviewed date and synchronize both repositories through the release workflow.

Future CMPE 492 reports and unsupplied backlog snapshots are explicitly marked unavailable. Website publication does not indicate LMS submission or jury approval.

## Course milestones

Dates follow the **2026–2027 Fall semester table** in the supplied CMPE 492 syllabus:

| Date | Deliverable |
| --- | --- |
| 16 October 2026 | Low-Level Design v1 and backlog snapshot |
| 23 October 2026 | Low-Level Design v2 and updated backlog |
| 20 November 2026 | Test Plan and updated backlog |
| 31 December 2026 | Final Report and final backlog |
| 4–17 January 2027 | Presentation and demonstration; exact date to be announced |

The specified report deadlines are 23:59 on the due date. The syllabus itself is not republished.

## Project team

All four students are in Computer Engineering at TED University:

- Esra Eda Kılıç
- Enes Taşçı
- Ömer Taylan Alemdar
- Batuhan Mert Korkmaz

**Supervisor:** Dr. Ulaş Güleç

**Jury:** Prof. Dr. Saiful Islam and Prof. Dr. Tolga Kurtuluş Çapın

## Research and demonstration scope

The research evaluates evidence reliability, attack indications and three outcomes: **ACCEPT, REJECT and RETRY**. rPPG is one evidence channel; it does not independently prove liveness or capture freshness. Performance claims require the controlled evaluation described in the design report.

The public console is an earlier **illustrative simulation**. Its scores, signals and decisions are generated from selected scenarios and are not biometric measurements. Camera preview is optional, remains local to the browser and is not uploaded to the mock API. Measured biometric evaluation results have not yet been published.

## References

Project content is grounded in the supplied CMPE 491 reports, CMPE 492 Low-Level Design Report and CMPE 492 syllabus.

Presentation references include TED University CMPE projects [MoonAI](https://moon-aii.github.io/moonai/) and [EcoFriends](https://ecofriends.github.io/index.html), the [CMPE senior project directory](https://cmpe.tedu.edu.tr/en/senior-projects-2025), and supplementary examples from the [SENG project directory](https://seng.tedu.edu.tr/bitirme-projeleri): [GATE](https://gate-team.github.io/GATE_Project-website/), [SafeScope](https://ymerta.github.io/safescope/) and [LLM Valley](https://llmvalley.vercel.app/). BioAuth's course identity remains **CMPE 492**.

Deployment behaviour is documented in [Vercel's Git integration guide](https://vercel.com/docs/git).
