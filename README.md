# Typescript Boilerplate

> Production-ready TypeScript library template for Node 22+ and browsers.
> Batteries included: pnpm, tsdown, dual ESM/CJS, strict TS, path alias @/, Vitest, ESLint (flat) + Prettier, Git hooks, and GitHub Actions.

## Requirements
- Node ≥ 22.6
- pnpm 10.x

## Quick start

```
pnpm i
pnpm run verify   # typecheck → lint → prettier check → test → build
```

Dev loop:

```
pnpm dev    # tsdown watch
pnpm test   # vitest
pnpm build  # tsdown build (esm + cjs + d.ts)
```

## What you get

- Dual builds: ESM (`.mjs`) + CJS (`.cjs`) + types (`.d.ts`) in dist/
- Modern TS config (ES2022, bundler resolution, strict but ergonomic)
- Path alias: `@/` → `src/` (wired in TS, tsdown, Vitest, ESLint)
- Testing: Vitest, clear `test/**` layout (typed tests; no coverage in CI by default)
- Quality: ESLint (flat, 2025 best-practice rules) + Prettier
- DX: VS Code settings, `.editorconfig`, fast pre-commit with lint-staged
- CI: GitHub Actions (install → typecheck → lint → format check → test → build)
- Conventions: Commit/branch validator (Conventional-ish)

## Path aliases

- TypeScript (`tsconfig.json`):
```
"baseUrl": ".",
"paths": { "@/*": ["src/*"] }
```

- Bundler (tsdown) (`tsdown.config.ts`):
```
alias: { "@/": "src/" }
```

- Vitest (`vitest.config.ts`):
```
resolve: { alias: { "@": "/src" } }
```

- ESLint (`eslint.config.js`):
  - Resolves TS paths
  - Marks `@/**` as internal in import ordering

Use it like:
```
import { sum } from "@/index";
```

## Scripts

| Script           | What it does                                         |
| ---------------- | ---------------------------------------------------- |
| `dev`            | tsdown watch                                         |
| `build`          | build ESM+CJS+d.ts to `dist/`                        |
| `test`           | run tests (Vitest)                                   |
| `test:watch`     | run tests in watch mode                              |
| `test:coverage`  | (optional local) tests with coverage report          |
| `typecheck`      | `tsc --noEmit` on library                            |
| `typecheck:test` | `tsc --noEmit` on tests                              |
| `typecheck:all`  | typecheck lib + tests                                |
| `lint`           | ESLint (strict; no warnings allowed in CI)           |
| `lint:fix`       | ESLint with fixes                                    |
| `format`         | Prettier write                                       |
| `format:check`   | Prettier check                                       |
| `verify`         | typecheck\:all → lint → format\:check → test → build |

## Linting & formatting

- ESLint (flat config) with `@typescript-eslint` and `eslint-plugin-import-x`:
  - focuses on correctness/safety (no style bikeshedding)
  - typed rules only for `src/**` tests are fast/relaxed
- Prettier handles formatting (rules in `prettier.config.js`)
- VS Code auto-formats on save; ESLint fixes on explicit save (configurable)

Run:

```
pnpm run lint
pnpm run lint:fix
pnpm run format
```

## Git hooks & commit/branch rules

Configured via simple-git-hooks + lint-staged:
- Pre-commit: ESLint + Prettier on staged files
- Pre-push: typecheck + tests
- Commit message must start with one of:
```
chore: … | feat: … | refactor: … | fix: … | hotfix: … | release: …
```
- Branch names (except main/master/manually added exceptions) must match:
```
<type>/<anything>     # e.g., feat/add-ohlcv-loader
```

Types: `chore`, `feat`, `refactor`, `fix`, `hotfix`, `release`.

Bypass (not recommended): `--no-verify`

## License & Usage

**Proprietary — Internal Use Only**

Copyright (c) 2025 TradingFrame. All rights reserved.

You may use, copy, and modify this software **solely for TradingFrame’s internal business purposes**.  
You may **not** distribute, publish, sublicense, host as a service (SaaS/API), or otherwise make the software (or derivative works) available to any third party.

See [LICENSE](./LICENSE) for the full terms.

**Contact:** tradingframe.solutions@gmail.com for questions about licensing or exceptions.
