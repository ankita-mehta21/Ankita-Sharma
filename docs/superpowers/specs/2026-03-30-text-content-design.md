# TXT Content Editing Design

**Date:** 2026-03-30

**Goal:** Replace the root `site-content.json` editing workflow with doctor-friendly root `.txt` files while preserving the current website content, visual behavior, static hosting compatibility, and existing page/component contracts.

## Scope

Editable content moves to these root files:

- `site-settings.txt`
- `home.txt`
- `about.txt`
- `reviews.txt`
- `contact.txt`

Non-editorial technical configuration remains in code:

- layout class names
- icon/image registries
- rare admin labels
- not found page text unless later promoted into editable content

## Format

Each file uses simple labeled fields plus bracketed section blocks.

Examples:

- `TITLE: Contact Ankita`
- `PRIMARY_BUTTON_LINK: /contact`
- `[HERO_DESCRIPTION] ...`
- `[SERVICES]` followed by repeated `-` list items

Repeatable content is expressed in plain text blocks with separators instead of JSON arrays or objects. The parser is responsible for converting these blocks into the existing internal content shape.

## Shared Vs Page Content

Shared details live in `site-settings.txt`:

- doctor name
- credentials
- clinic name
- email
- phone
- address/location
- review form URL
- navbar labels
- footer summary and CTA labels
- SEO defaults

Page-specific content lives in page files:

- homepage hero, services, testimonials labels, CTA copy
- about page summary, credentials, experience, publications, languages
- reviews page headings and review entries
- contact page title/subtitle

## Architecture

1. Add a text-content parser module that converts the five `.txt` files into the same `SiteContent` object shape currently consumed by the app.
2. Keep normalization and downstream selectors in `src/content/siteContent.ts`.
3. Update build-time validation to validate parsed text content instead of imported JSON.
4. Preserve current output content exactly by generating the initial `.txt` files from the current JSON values.

## Error Handling

- Missing required labels must fail validation with a clear file/field message.
- Invalid repeatable blocks must report the file, block type, and missing field.
- Unknown service icon keys and image keys must continue to fail in build validation.

## Hosting

The site remains a static Vite build. The `.txt` files are bundled at build time and no backend or runtime service is introduced. This remains compatible with Render Static Site and Vercel static deployment.
