export function sum(a: number, b: number): number {
  return a + b;
}

export type Api = {
  sum: (a: number, b: number) => number;
};

const api: Api = { sum };

export default api;
