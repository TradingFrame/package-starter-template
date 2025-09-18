// eslint.config.js (2025-ready, flat config, balanced strictness)
import js from '@eslint/js';
import { configs as tsConfigs } from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { importX } from 'eslint-plugin-import-x';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import globals from 'globals';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
  // 0) Global ignores + hygiene
  {
    ignores: [
      // deps & package-manager cache
      'node_modules/**',
      '.pnpm-store/**',

      // build outputs & caches
      'dist/**',
      'coverage/**',
      'build/**',
      'reports/**',
      '.out/**',
      '.tmp/**',
      '.cache/**',
      '.turbo/**',
      '.nyc_output/**',
      'tmp/**',

      // editors/IDE caches
      '.vscode/**',
      '.idea/**',
      '.eslintcache',

      // generated / noise
      '**/*.d.ts',
      '**/*.generated.*',
      '**/*.config.*', // e.g. tsdown.config.ts, vitest.config.ts
      '*.min.js',
      '*.log',
      '.DS_Store',
    ],
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    // import-x resolver & extensions for TS/JS
    settings: {
      'import-x/resolver': { typescript: true, node: true },
      'import-x/extensions': ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'],
      // Treat "@/..." as "internal" imports for ordering & grouping
      'import-x/internal-regex': '^@/',
    },
  },

  // 1) Base JS + TS recommended (no type info required here)
  js.configs.recommended,
  ...tsConfigs.recommended,

  // 2) import-x recommended + TS support
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,

  // 3) Typed rules ONLY for library source
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // --- General safety (not style) ---
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-implicit-coercion': 'warn',
      'dot-notation': 'error',
      'no-console': 'warn',

      // --- Import hygiene ---
      'import-x/no-duplicates': 'error',
      'import-x/no-self-import': 'error',
      'import-x/newline-after-import': ['error', { count: 1 }],
      'import-x/no-cycle': ['warn', { maxDepth: '∞' }],
      'import-x/no-useless-path-segments': 'warn',
      'import-x/order': [
        'error',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index', 'object', 'type'],
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before', // keep aliases above relative internal imports
            },
          ],
        },
      ],

      // --- Typed safety (balanced) ---
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error', // great for unions
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      '@typescript-eslint/no-unnecessary-condition': [
        'warn',
        { allowConstantLoopConditions: true },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'warn',
        {
          ignoreConditionalTests: true,
          ignoreMixedLogicalExpressions: true,
          ignoreTernaryTests: true,
        },
      ],
      '@typescript-eslint/prefer-optional-chain': 'warn',
    },
  },

  // 4) Tests: relaxed & fast (no typed linting, no import order noise)
  {
    files: ['test/**/*.ts', 'test/**/*.tsx'],
    rules: {
      'no-console': 'off',
      'import-x/order': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // 5) Node scripts (git hooks, tooling): enable Node globals & allow console
  {
    files: ['scripts/**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      // Mark Node globals so "process"/"console" are defined
      globals: globals.node,
      // Our hook uses ESM (.mjs)
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
    },
  },

  // 6) Browser playground: enable DOM globals, relax console
  {
    files: ['playgrounds/browser/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        // browser globals (window, document, etc.)
        ...globals.browser,
      },
    },
    // Make the TS path alias work for the playground’s own tsconfig
    settings: {
      'import-x/resolver': {
        typescript: { project: './playgrounds/browser/tsconfig.json' },
        node: true,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // 7) Node playground: enable Node globals, relax console
  {
    files: ['playgrounds/node/**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        // node globals (process, __dirname, etc.)
        ...globals.node,
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: { project: './playgrounds/node/tsconfig.json' },
        node: true,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // 8) Let Prettier own formatting (turns off conflicting rules)
  prettier,
];
