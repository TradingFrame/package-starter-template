# Contributing Guide

Thanks for helping improve this template! This repo is a production-ready TypeScript library scaffold for Node 22+ and modern browsers. It includes pnpm, tsdown, strict TS configs, path alias `@/`, Vitest, ESLint (flat) + Prettier, Git hooks, and CI.

## Requirements

- **Node** ≥ 22.6
- **pnpm** 10.x

> If hooks seem missing after cloning, run `pnpm run prepare` to (re)install local git hooks.

## Getting Started

```bash
pnpm i
pnpm run dev       # tsdown watch (builds on change)
pnpm test          # run tests (Vitest)
pnpm run build     # build ESM+CJS+d.ts to dist/
pnpm run verify    # typecheck → lint → prettier check → test → build
```

## Branch & Commit Conventions

We use a lightweight Conventional Commits-style policy and branch naming.

### Allowed commit types

Your commit message **must** start with exactly one of:

```
chore: … | feat: … | refactor: … | fix: … | hotfix: … | release: …
```

**Examples**

```
feat: add OHLCV CSV loader
fix: handle empty series edge case
refactor: simplify range detection
chore: bump dev dependencies
```

> Commits that start with `Merge …` or `Revert …` are allowed as-is.

### Branch names

Branches **other than** `main`/`master` must follow:

```
<type>/<your-branch-name>
```

**Examples**

```
feat/add-ohlcv-loader
fix/empty-input-guard
refactor/streaming-pipeline
hotfix/revert-bad-publish
```

> The commit-msg hook enforces message format, and branch names are validated unless you’re on `main`/`master`. You can update the whitelist or types in `scripts/verify-commit.mjs`.

_Bypass (emergency only):_

```
git commit --no-verify -m "feat: emergency"
```

## Code Style & Linting

- **Prettier** is the source of truth for formatting (`prettier.config.js`). VS Code formats on save; Prettier requires a config (`prettier.requireConfig: true` in workspace).
- **ESLint (flat)** focuses on correctness:
  - `@typescript-eslint` with typed rules for `src/**`
  - `eslint-plugin-import-x` for import hygiene/order
  - `eslint-config-prettier` to avoid style conflicts
- **Path alias**: prefer `@/…` over deep `../../..`:
  ```ts
  import { something } from '@/utils/something';
  ```
- **Node/tooling scripts** under `scripts/**` allow Node globals (`process`, `console`) and are linted with relaxed rules.

**Useful commands**

```bash
pnpm run lint
pnpm run lint:fix
pnpm run format
pnpm run format:check
```

## TypeScript Guidelines

- Library is strict but ergonomic:
  - `strict`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`
  - Modern ESM: `moduleResolution: "Bundler"`, `verbatimModuleSyntax`
- Keep **DOM types out** of the base library (universal output). If a file needs DOM:
  ```ts
  /// <reference lib="dom" />
  ```
- Prefer **type imports/exports**:
  ```ts
  import type { Foo } from '@/types';
  export type { Foo };
  ```

## Tests (Vitest)

- Environment: **node**
- Place tests in `test/**`, file names `*.test.ts` or `*.spec.ts`.
- Import code via the alias (`@/…`) when appropriate.
- Coverage is available locally (`pnpm run test:coverage`) but not enforced in CI by default.

**Commands**

```bash
pnpm test
pnpm test:watch
pnpm run test:coverage   # optional, local insight
```

> For browser-like testing later, switch `vitest.config.ts` to `environment: "jsdom"` and add `"DOM", "DOM.Iterable"` to `tsconfig.test.json` `lib`.

## Build & Outputs

- `pnpm run build` emits:
  - **ESM** → `dist/index.mjs`
  - **CJS** → `dist/index.cjs`
  - **Types** → `dist/index.d.ts`
- `exports` map in `package.json` is set for modern bundlers and Node.

## CI

**GitHub Actions** (`.github/workflows/ci.yml`) runs on PRs and pushes to `main`/`master`:

1. Install deps (pnpm)
2. Typecheck (lib + tests)
3. Lint + Prettier check
4. Tests (no coverage)
5. Build (tsdown)

## Git Hooks

Managed via **simple-git-hooks**:

- **pre-commit**: lint-staged (ESLint + Prettier on staged files)
- **commit-msg**: enforces commit message format & branch naming
- **pre-push**: `typecheck:all` + `test`

Reinstall hooks if needed:

```bash
pnpm run prepare
```

## PR Checklist

- [ ] `pnpm run verify` passes (typecheck → lint → format:check → test → build)
- [ ] Imports sorted/clean; use `@/` where appropriate
- [ ] Commit message follows `type: message`
- [ ] Branch name follows `type/your-branch-name`
- [ ] Updated docs (README or code comments) when changing behavior
- [ ] No unrelated changes or noisy diffs

## License & Usage

This repo is **Proprietary — Internal Use Only**.  
You may use/modify solely for TradingFrame’s internal business purposes.  
No redistribution, sublicensing, or hosting as a service without written permission.  
See [LICENSE](./LICENSE) for terms.

**Contact:** tradingframe.solutions@gmail.com
