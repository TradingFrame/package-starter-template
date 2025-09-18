import { useMemo, useState } from 'react';
import { sum } from '@/index';

export default function App() {
  const [a, setA] = useState<string>('2');
  const [b, setB] = useState<string>('3');

  const result = useMemo(() => {
    const na = Number(a);
    const nb = Number(b);
    if (Number.isNaN(na) || Number.isNaN(nb)) return '—';
    return String(sum(na, nb));
  }, [a, b]);

  return (
    <main
      style={{
        fontFamily: 'ui-sans-serif, system-ui, -apple-system',
        padding: 16,
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ margin: 0 }}>Browser Playground</h1>
      <p style={{ marginTop: 8 }}>
        Live-importing from <code>@/index</code>. Edit <code>src/</code> and see HMR.
      </p>

      <div style={{ display: 'grid', gap: 12, maxWidth: 420, marginTop: 12 }}>
        <label style={{ display: 'grid', gap: 4 }}>
          <span>A</span>
          <input
            value={a}
            onChange={(e) => setA(e.target.value)}
            inputMode="decimal"
            placeholder="Enter a number"
            style={{ padding: '8px 10px' }}
          />
        </label>

        <label style={{ display: 'grid', gap: 4 }}>
          <span>B</span>
          <input
            value={b}
            onChange={(e) => setB(e.target.value)}
            inputMode="decimal"
            placeholder="Enter a number"
            style={{ padding: '8px 10px' }}
          />
        </label>

        <div>
          <span style={{ opacity: 0.7 }}>sum(a, b) = </span>
          <strong>{result}</strong>
        </div>
      </div>
    </main>
  );
}
