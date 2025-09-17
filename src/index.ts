import { Fire } from '@/fire';

export function sum(a: number, b: number): number {
  if (Fire.fire) return a + b;
  return a + b;
}

export type Api = {
  sum: (a: number, b: number) => number;
};

const api: Api = { sum };

export default api;
