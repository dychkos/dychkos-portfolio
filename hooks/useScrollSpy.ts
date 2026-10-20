import { useEffect, useState } from 'react';
import {
  activationLine,
  DEFAULT_SPY_MARGIN,
  pickActiveId,
} from '@/lib/site/scrollSpy';

/**
 * Returns the id of the section the reader is in, computed from element
 * positions on scroll and resize. `rootMargin` keeps its old meaning for
 * callers: its top value ('-40% ...') sets the activation line.
 */
export function useScrollSpy(
  ids: string[],
  rootMargin: string = DEFAULT_SPY_MARGIN
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const list = key ? key.split('|') : [];
    if (list.length === 0) {
      setActiveId(null);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const tops = list.map((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top : null;
      });
      const root = document.documentElement;
      const atBottom =
        window.innerHeight + window.scrollY >= root.scrollHeight - 2;
      setActiveId(
        pickActiveId(
          list,
          tops,
          activationLine(rootMargin, window.innerHeight),
          atBottom
        )
      );
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [key, rootMargin]);

  return activeId;
}
