// Enable TS path aliases (e.g., "@/index") at runtime:
import 'tsconfig-paths/register';

import express, { type Request, type Response } from 'express';
import { sum } from '@/index';

const app = express();

/** Simple health check */
app.get('/ping', (_req: Request, res: Response) => {
  res.json({ ok: true, ts: Date.now() });
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

  return res.json({ a, b, result: sum(a, b) });
});

const PORT = Number(process.env.PORT ?? 3001);
app.listen(PORT, () => {
  console.log(`[node-playground] listening on http://localhost:${PORT}`);
});
