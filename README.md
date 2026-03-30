# Dr. Ankita Sharma Portfolio

Frontend-only portfolio site powered by simple `.txt` content files in the `content/` folder.

## Stack
- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- React Router
- `zod` content validation
- `react-helmet-async` for page SEO metadata

## Content Editing Flow
1. Open the `content/` folder.
2. Update `site-settings.txt`, `home.txt`, `about.txt`, `reviews.txt`, or `contact.txt`.
3. Commit to GitHub.
4. Auto-deploy publishes the updated site.

## Quality Safeguards
- Schema validation for parsed TXT content before build.
- Reference checks (icons, image keys, duplicate IDs).
- CI workflow runs `validate:content`, `lint`, and `build`.

## Scripts
- `npm run dev`: local dev server
- `npm run validate:content`: validate TXT content + references
- `npm run test:content`: parser and content-loader tests
- `npm run lint`: lint codebase
- `npm run build`: production build (output: `dist/`)
- `npm run preview`: preview production build
- `npm run check`: full local quality gate
- `npm run start`: serve `dist/` (production)

## Key Paths
- `content/READ-ME-FIRST.txt`: quick editing instructions for the doctor
- `content/site-settings.txt`: shared doctor/site details
- `content/home.txt`, `content/about.txt`, `content/reviews.txt`, `content/contact.txt`: page content files
- `src/content/siteContentSchema.ts`: content schema and validator
- `src/content/siteTextContent.ts`: TXT parser and content builder
- `scripts/validate-content.ts`: build-time content checks
- `.github/workflows/quality-checks.yml`: CI checks
