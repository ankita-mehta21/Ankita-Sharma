# TXT Content Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace JSON-based site editing with root TXT files while preserving rendered content and static deployment behavior.

**Architecture:** Add parser utilities that build the existing `SiteContent` shape from five root TXT files, then keep the current selector/normalization layer intact. Validation and tests target the parsed content so content safety remains enforced before build and deploy.

**Tech Stack:** React, Vite, TypeScript, Zod, Node test runner via `node --import tsx --test`

---

### Task 1: Parser Test Harness

**Files:**
- Create: `tests/content/siteTextContentParser.test.ts`

- [ ] **Step 1: Write the failing test**
- [ ] **Step 2: Run test to verify it fails**
- [ ] **Step 3: Write minimal implementation**
- [ ] **Step 4: Run test to verify it passes**

### Task 2: TXT Parser And Loader

**Files:**
- Create: `src/content/siteTextContent.ts`
- Modify: `src/content/siteContent.ts`

- [ ] **Step 1: Add parser helpers for labels, sections, repeated blocks, and list parsing**
- [ ] **Step 2: Build the editable content object from TXT inputs**
- [ ] **Step 3: Keep normalization and selectors unchanged where possible**
- [ ] **Step 4: Verify parser tests and app build usage**

### Task 3: Build-Time Validation

**Files:**
- Modify: `scripts/validate-content.ts`

- [ ] **Step 1: Redirect validation script to TXT-derived content**
- [ ] **Step 2: Keep schema validation and custom reference checks**
- [ ] **Step 3: Add file-oriented error context**

### Task 4: Content Migration

**Files:**
- Create: `site-settings.txt`
- Create: `home.txt`
- Create: `about.txt`
- Create: `reviews.txt`
- Create: `contact.txt`
- Remove runtime dependency on: `site-content.json`

- [ ] **Step 1: Transcribe current JSON values into TXT format without altering copy**
- [ ] **Step 2: Verify parsed TXT output preserves expected content**
- [ ] **Step 3: Update README for the new editing workflow**

### Task 5: Verification

**Files:**
- Modify: `package.json` if needed for test script support

- [ ] **Step 1: Run parser tests**
- [ ] **Step 2: Run `npm run validate:content`**
- [ ] **Step 3: Run `npm run lint`**
- [ ] **Step 4: Run `npm run build`**
- [ ] **Step 5: Confirm no known route/static-host regression**
