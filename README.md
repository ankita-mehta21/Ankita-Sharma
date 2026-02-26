# Dr. Ankita Sharma Portfolio

Frontend-only portfolio site powered by `src/content/site-content.json`.

## Stack
- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- React Router
- `zod` content validation
- `react-helmet-async` for page SEO metadata

## Content Editing Flow
1. Update `src/content/site-content.json`.
2. Commit to GitHub.
3. Auto-deploy publishes the updated site.

## Quality Safeguards
- Schema validation for `site-content.json` before build.
- Reference checks (icons, image keys, duplicate IDs).
- CI workflow runs `validate:content`, `lint`, and `build`.

## Scripts
- `npm run dev`: local dev server
- `npm run validate:content`: validate JSON schema + references
- `npm run lint`: lint codebase
- `npm run build`: production build (output: `site-build/`)
- `npm run preview`: preview production build
- `npm run check`: full local quality gate
- `npm run start`: serve `site-build/` (production)

## Key Paths
- `src/content/site-content.json`: single source of editable content
- `src/content/siteContentSchema.ts`: content schema and validator
- `scripts/validate-content.ts`: build-time content checks
- `.github/workflows/quality-checks.yml`: CI checks
