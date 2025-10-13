# Cypress Cucumber POC

This repository is a proof-of-concept for Cypress + Cucumber (BDD) with a small set of repository-level validation checks enforced by CodeRabbit (GitHub Actions).

## 🐰 CodeRabbit naming checks

CodeRabbit automatically validates naming and traceability for test artifacts on every pull request that touches `.js` or `.feature` files.

- Read the full checks reference: [CODE_RABBIT_CHECKS.md](./CODE_RABBIT_CHECKS.md) ✅

### TL;DR

- Run the same validator locally with:

```powershell
npm install
npm run validate:names
```

This runs `node ./tools/validate-naming.js` and prints any naming problems. Fix filenames / feature headers and re-run until the output is `Naming validation passed.`
