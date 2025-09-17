/** @type {import("prettier").Config} */
export default {
  // === General style, tuned for TS libraries ===
  printWidth: 100, // balanced diffs + readability in TS/JS
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true, // JS/TS with single quotes
  jsxSingleQuote: false, // JSX double quotes (ecosystem default)
  trailingComma: 'all', // better diffs; JSON override below disables it
  bracketSpacing: true,
  bracketSameLine: false, // put `>` on its own line in JSX
  arrowParens: 'always',
  quoteProps: 'as-needed',
  endOfLine: 'lf', // avoid cross-OS EOL churn
  embeddedLanguageFormatting: 'auto',

  // === Per-file overrides (stability & readability) ===
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 80, // prose reads better narrower
        proseWrap: 'preserve',
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: { printWidth: 80 },
    },
    {
      files: ['*.json', '*.jsonc'],
      options: {
        trailingComma: 'none', // JSON spec
      },
    },
  ],
};
