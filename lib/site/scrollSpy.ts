export const DEFAULT_SPY_MARGIN = '-40% 0px -55% 0px';

/**
 * Distance in px from the top of the viewport at which a heading becomes
 * active. Read from the top value of an IntersectionObserver-style rootMargin:
 * '-40% ...' means 40% of the viewport height, '-96px ...' means 96px.
 */
export function activationLine(
  rootMargin: string | undefined,
  viewportHeight: number
): number {
  const parse = (margin: string): number | null => {
    const match = /^(-?\d*\.?\d+)(%|px)?$/.exec(margin.trim().split(/\s+/)[0]);
    if (!match) return null;
    const value = Math.abs(parseFloat(match[1]));
    return match[2] === '%' ? (value / 100) * viewportHeight : value;
  };
  return (
    parse(rootMargin ?? DEFAULT_SPY_MARGIN) ??
    (parse(DEFAULT_SPY_MARGIN) as number)
  );
}

/**
 * Picks the active id: the last one whose element top (relative to the
 * viewport) is at or above the activation line. At the bottom of the page the
 * last present id wins, so short final sections still activate. Before the
 * first heading reaches the line nothing is active. A null top means the
 * element is missing and is skipped.
 */
export function pickActiveId(
  ids: string[],
  tops: (number | null)[],
  line: number,
  atBottom: boolean
): string | null {
  let active: string | null = null;
  let last: string | null = null;
  for (let i = 0; i < ids.length; i++) {
    const top = tops[i];
    if (top === null || top === undefined) continue;
    last = ids[i];
    if (top <= line) active = ids[i];
  }
  return atBottom ? last : active;
}
