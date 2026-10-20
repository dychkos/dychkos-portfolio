import { useEffect, useState } from 'react';

export function useScrollSpy(
  ids: string[],
  rootMargin: string = '-40% 0px -55% 0px'
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const list = key ? key.split('|') : [];
    const elements = list
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin }
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [key, rootMargin]);

  return activeId;
}
