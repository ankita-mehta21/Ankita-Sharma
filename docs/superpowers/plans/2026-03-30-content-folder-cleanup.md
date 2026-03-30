# Content Folder Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move doctor-editable TXT files into a single `content/` folder and reduce root-directory confusion without affecting site behavior.

**Architecture:** Keep the existing TXT parser and internal `SiteContent` shape, but change the loader and validation entry points to read from `content/*.txt`. Add one doctor-facing guide file inside `content/` and update tests/docs to reference the new location.

**Tech Stack:** React, Vite, TypeScript, Node test runner via `node --import tsx --test`

---

### Task 1: Path-Safety Test Update

**Files:**
- Modify: `tests/content/siteTextContentParser.test.ts`

- [ ] **Step 1: Write the failing test for `content/*.txt` path usage**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Update the minimal code to pass**
- [ ] **Step 4: Re-run the test**

### Task 2: Content Folder Migration

**Files:**
- Create: `content/READ-ME-FIRST.txt`
- Move: `site-settings.txt` -> `content/site-settings.txt`
- Move: `home.txt` -> `content/home.txt`
- Move: `about.txt` -> `content/about.txt`
- Move: `reviews.txt` -> `content/reviews.txt`
- Move: `contact.txt` -> `content/contact.txt`

- [ ] **Step 1: Move the editable content files into `content/`**
- [ ] **Step 2: Add a short doctor-facing guide**
- [ ] **Step 3: Remove obsolete root editing clutter**

### Task 3: Loader/Docs Update

**Files:**
- Modify: `src/content/siteContent.ts`
- Modify: `scripts/validate-content.ts`
- Modify: `README.md`
- Modify: `src/pages/Reviews.tsx`

- [ ] **Step 1: Update runtime imports and validation reads**
- [ ] **Step 2: Update editor-facing text/documentation**
- [ ] **Step 3: Keep all rendered content behavior unchanged**

### Task 4: Verification

**Files:**
- Modify: `.gitignore` only if needed

- [ ] **Step 1: Run `npm run test:content`**
- [ ] **Step 2: Run `npm run validate:content`**
- [ ] **Step 3: Run `npm run lint`**
- [ ] **Step 4: Run `npm run build`**
