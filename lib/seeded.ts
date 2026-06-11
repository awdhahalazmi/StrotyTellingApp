/**
 * Hash-based PRNG using only integer ops (Math.imul).
 * Unlike Math.sin, Math.imul is spec'd to produce bit-identical
 * results in every JS environment, so SSR and browser always agree.
 */
export function seeded(n: number): number {
  let h = Math.imul(n + 1, 2654435769) | 0;
  h ^= h >>> 16;
  h  = Math.imul(h, 0x85ebca6b) | 0;
  h ^= h >>> 13;
  h  = Math.imul(h, 0xc2b2ae35) | 0;
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/** Round to n decimal places so server/client style strings are identical. */
export function r(value: number, decimals = 3): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}
