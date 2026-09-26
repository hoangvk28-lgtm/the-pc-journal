/** Deterministic helpers: same slug → same output; different slugs → different order/phrasing. */

export function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function pick<T>(items: readonly T[], seed: string): T {
  return items[hash(seed) % items.length];
}

export function shuffle<T>(items: readonly T[], seed: string): T[] {
  const out = [...items];
  let s = hash(seed) || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = Math.imul(s ^ (s >>> 15), 2246822507) >>> 0;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function listJoin(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
