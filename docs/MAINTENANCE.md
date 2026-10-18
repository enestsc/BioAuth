# Website maintenance

## Repositories

| Repository | Branch | Purpose | Remote |
| --- | --- | --- | --- |
| `enestsc/BioAuth` | `master` | Public project source | `origin` |
| `enestsc/bioauth-deploy` | `main` | Vercel production source | `deploy` |

The live site is https://bioauth-deploy.vercel.app. Production follows `bioauth-deploy/main`. Both repositories contain the same released website files and retain separate Git histories.

## Development

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

The development server runs at http://localhost:3000.

```sh
npx tsc --noEmit
npm run build
npm start
```

`npm start` serves the previously built production output.

## Publishing changes

1. Review the changes and merge them into `BioAuth/master`.
2. Synchronize the released files into `bioauth-deploy/main`, preserving its history.
3. Confirm the Vercel production deployment succeeds and verify the affected live pages.

After fetching both remotes, an empty diff confirms matching website content:

```sh
git fetch origin
git fetch deploy
git diff --stat origin/master deploy/main
```

## Content

- `src/lib/project.ts`: project team, report registry and course milestones.
- `public/reports/`: original published report PDFs.
- `src/app/progress/page.tsx`: backlog publication archive.
- `docs/assets/bioauth-banner.svg`: README banner.

Add a PDF under a stable filename, update its registry entry with its actual date and availability, and retain previous document versions. Publish only supplied reports and backlog snapshots. The CMPE 492 Low-Level Design Report defines the current project scope; CMPE 491 reports preserve earlier stages.

The public scenario console generates illustrative signals and decisions. Its optional camera preview stays in the browser and does not feed the mock API.
