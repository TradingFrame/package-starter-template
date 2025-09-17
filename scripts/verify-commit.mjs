#!/usr/bin/env node

/**
 * Verify commit message and branch name.
 * Rules:
 *  1) Commit message first line: "<type>: any message"
 *     where <type> ∈ {chore, feat, refactor, fix, hotfix, release}
 *  2) Branch naming (except whitelisted): "<type>/<anything>"
 *     where <type> ∈ same set as above.
 *
 * Not too strict:
 *  - Allows "Merge ..." and "Revert ..." messages.
 *  - Whitelist branches can be edited below.
 */

import fs from 'node:fs';
import { execSync } from 'node:child_process';

const TYPES = ['chore', 'feat', 'refactor', 'fix', 'hotfix', 'release'];
const COMMIT_RE = new RegExp(`^(${TYPES.join('|')}):\\s.+`);
const BRANCH_RE = new RegExp(`^(${TYPES.join('|')})\\/[a-z0-9._\\-/]+$`, 'i');

// Edit the whitelist if needed (e.g., add "develop", "release")
const WHITELIST_BRANCHES = ['main', 'master'];

// ------------- helpers -------------
function fail(msg) {
  console.error('\n✖ Commit validation failed:\n');
  console.error(msg);
  process.exit(1);
}

function readFirstLine(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const first = raw.split(/\r?\n/, 1)[0]?.trim() ?? '';
    return first;
  } catch {
    return '';
  }
}

function getBranchName() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
  } catch {
    return '';
  }
}

// ------------- main -------------
const msgFile = process.argv[2];
if (!msgFile) {
  fail('Internal error: no commit message file path was provided to the hook.');
}

const firstLine = readFirstLine(msgFile);
const branch = getBranchName();

// Allow merges/reverts to pass without format
const isMergeOrRevert = firstLine.startsWith('Merge ') || firstLine.startsWith('Revert ');

// 1) Check commit message
if (!isMergeOrRevert && !COMMIT_RE.test(firstLine)) {
  fail(
    [
      `• Commit message must start with one of: ${TYPES.map((t) => `"${t}:"`).join(', ')}`,
      `• Current: "${firstLine || '(empty)'}"`,
      '',
      'Examples:',
      '  feat: add configurable cache TTL',
      '  fix: handle empty input arrays',
      '  chore: bump dependencies',
    ].join('\n'),
  );
}

// 2) Check branch name (unless whitelisted)
const isWhitelisted = WHITELIST_BRANCHES.includes(branch);
if (!isWhitelisted && !BRANCH_RE.test(branch)) {
  fail(
    [
      `• Branch must be named as "<type>/<name>" where <type> ∈ {${TYPES.join(', ')}}`,
      `• Or be one of whitelisted branches: ${WHITELIST_BRANCHES.join(', ')}`,
      `• Current branch: "${branch || '(unknown)'}"`,
      '',
      'Examples:',
      '  feat/add-ohlcv-csv-loader',
      '  fix/handle-empty-series',
      '  refactor/streaming-pipeline',
    ].join('\n'),
  );
}

// All good
process.exit(0);
