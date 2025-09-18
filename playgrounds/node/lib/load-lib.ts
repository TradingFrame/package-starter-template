// Centralized toggle for SRC vs DIST
export const PLAY_FROM = (process.env.PLAY_FROM || 'src').toLowerCase();
export const USE_DIST = PLAY_FROM === 'dist';

// 👇 Auto-infer the module type from your source entry.
// This stays accurate as your public API evolves.
type Lib = typeof import('@/index');

/**
 * Load the library either from live source (SRC) or built output (DIST).
 * - SRC: imports via alias "@/index" (great DX; works with tsx watch)
 * - DIST: imports the built ESM "./dist/index.mjs" (what you ship)
 */
export async function loadLibrary(): Promise<Lib> {
  if (USE_DIST) {
    const distUrl = new URL('../../../dist/index.mjs', import.meta.url);
    // TS can’t infer a dynamic import from a runtime URL, so we assert to Lib.
    // This is safe because dist ships matching .d.ts for index.
    return (await import(distUrl.href)) as Lib;
  }
  return await import('@/index');
}
