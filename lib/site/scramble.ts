export const SCRAMBLE_CHARS = '0123456789#%&*';

export function scrambleFrame(
  from: string,
  to: string,
  step: number,
  steps: number,
  rand: () => number
): string {
  if (step >= steps) return to;
  const len = Math.max(from.length, to.length);
  const done = Math.floor((len * step) / steps);
  let out = '';
  for (let i = 0; i < len; i++) {
    if (i < done) out += to[i] ?? '';
    else if (to[i] === ' ') out += ' ';
    else out += SCRAMBLE_CHARS[Math.floor(rand() * SCRAMBLE_CHARS.length)];
  }
  return out;
}
