# CodeRabbit — Naming Checks & Validation ✅

This document describes the automated naming and traceability checks that run as part of the CodeRabbit (GitHub Actions) review for this repository.

## Quick facts
- Trigger: Pull Requests that modify `**/*.js` or `**/*.feature`
- Runner: GitHub Actions (`.github/workflows/validate-names.yml`) on `ubuntu-latest`
- Node version used in CI: `16`
- Local reproduction: `npm run validate:names` (runs `node ./tools/validate-naming.js`)

## Workflow steps (what CI runs)
1. Checkout repository
2. Setup Node.js (Node 16)
3. Install dependencies (`npm install`)
4. Run naming validation (`npm run validate:names`)

## What is validated (detailed rules)

- 🏷️ Feature filenames
  - Rule: Every `.feature` filename must start with the prefix `codenbox_`.
  - Why: Groups feature files consistently and makes their intent obvious.
  - Example failure: `cypress/integration/.../some.feature: feature filename must start with 'codenbox_'`

- 🧾 Feature file header
  - Rule: The first few lines of each `.feature` must include a comment containing a feature ID or userstory ID. Recognized tokens include `feat`, `feature`, `us`, `userstory`, `US`, `FEAT` and the comment must include an ID (for example: `# FEAT-123` or `# US-45`).
  - Why: Ensures traceability between automated tests and requirements or tickets.
  - Example failure: `.../some.feature: feature file should start with a comment containing a feature ID or userstory ID`

- 🔧 Step definition files (Cypress)
  - Rule: Step definition filenames under `cypress/integration` should contain the word `Steps` (capital S) and the filename must start with a lowercase letter.
  - Why: Standardizes how step files are named and avoids mixed-case surprises.
  - Example failures:
    - `.../practiceSteps.js: step definition filename must contain the word 'Steps' (capital S)`
    - `.../PracticeSteps.js: step definition filename must start with a lowercase letter`

- 🏛️ Page object files
  - Rule: Page object filenames must include the word `page` (case-insensitive) and start with a capital letter (class-like naming).
  - Why: Makes page objects easily discoverable and consistent with class naming.
  - Example failures:
    - `.../Practicepage.js: page object filename must contain the word 'page'`
    - `.../practicePage.js: page object filename must start with a capital letter`

## Where results appear
- Pull Request page → Checks section shows pass/fail status for the workflow.
- GitHub Actions UI → open the workflow run and inspect the logs; the `Run naming validation` step prints the validator output.
- Locally → console output when running `npm run validate:names`.

## How to reproduce locally (Windows PowerShell)
```powershell
# install deps (run once or when dependencies change)
npm install

# run the validator (same script CI runs)
npm run validate:names
# or directly
node .\tools\validate-naming.js
```

Output examples
- Success: `Naming validation passed.` (exit code 0)
- Failure: `Naming validation failed:` followed by error lines (exit code 2)

## Simple fix loop (recommended developer flow)
1. Open a PR with your changes.
2. CI runs the naming validator automatically.
3. If the validator fails, read the error lines in the check logs.
4. Fix filenames / headers as indicated and push new commits.
5. CI re-runs; repeat until all checks pass, then proceed to code review and merge.

## Edge cases & limitations
- The validator uses filename heuristics and a simple header regex. It may produce false positives for non-standard layouts.
- The feature header check reads only the first few lines — long metadata blocks may be missed.
- Some checks assume files live in `cypress/integration`; if you move tests, update the validator accordingly.

## Suggested improvements
- Post errors as a PR comment (Action step) to improve visibility for the PR author.
- Add unit tests for `tools/validate-naming.js` to prevent future regressions.
- Narrow checks to specific directories if you want stricter scope.

---

File location (for reference): `.github/workflows/validate-names.yml`
