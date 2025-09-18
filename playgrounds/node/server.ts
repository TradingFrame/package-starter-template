/* eslint-env node */
// Ensure "@/..." alias works in SRC mode before imports
import 'tsconfig-paths/register';

import express, { type Request, type Response } from 'express';
import { loadLibrary, USE_DIST } from './lib/load-lib';

const { sum } = await loadLibrary();

const app = express();

/** Simple health check */
app.get('/ping', (_req: Request, res: Response) => {
  res.json({ ok: true, ts: Date.now(), mode: USE_DIST ? 'dist' : 'src' });
});

/** Demo endpoint: /sum?a=1&b=2 */
app.get('/sum', (req: Request, res: Response) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res.status(400).json({
      error: "Invalid query: 'a' and 'b' must be numbers",
      example: '/sum?a=1&b=2',
    });
  }

  return res.json({ a, b, result: sum(a, b), mode: USE_DIST ? 'dist' : 'src' });
});

const PORT = Number(process.env.PORT ?? 3001);
app.listen(PORT, () => {
  console.log(`[node-playground] listening on http://localhost:${PORT}`);
});
