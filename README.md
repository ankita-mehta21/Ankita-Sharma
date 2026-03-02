# Dr. Ankita Sharma Portfolio

Frontend-only portfolio site powered by `site-content.json`.

## Stack
- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- React Router
- `zod` content validation
- `react-helmet-async` for page SEO metadata

## Content Editing Flow
1. Update `site-content.json` (at project root).
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
- `npm run build`: production build (output: `dist/`)
- `npm run preview`: preview production build
- `npm run check`: full local quality gate
- `npm run start`: serve `dist/` (production)

## Key Paths
- `site-content.json`: single source of editable content (at project root)
- `src/content/siteContentSchema.ts`: content schema and validator
- `scripts/validate-content.ts`: build-time content checks
- `.github/workflows/quality-checks.yml`: CI checks
