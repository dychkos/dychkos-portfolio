'use client';
import React, { useEffect, useState } from 'react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useChapter } from '@/components/site/ChapterProvider';
import { cn } from '@/utils/helper';

export type ContentsItem = {
  id: string;
  label: string;
  num?: string;
  level?: 2 | 3;
};

interface ContentsNavProps {
  title: string;
  items: ContentsItem[];
  rootMargin?: string;
}

const ContentsNav: React.FC<ContentsNavProps> = ({
  title,
  items,
  rootMargin,
}) => {
  const spyId = useScrollSpy(
    items.map((item) => item.id),
    rootMargin
  );
  // The entry the reader clicked stays active until they scroll by themselves.
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const activeId = pinnedId ?? spyId;
  const progress = useScrollProgress();
  const { setLabel } = useChapter();

  const active = items.find((item) => item.id === activeId);
  const chapterLabel = active
    ? active.num
      ? `${active.num} · ${active.label}`
      : active.label
    : '';

  useEffect(() => {
    setLabel(chapterLabel);
  }, [chapterLabel, setLabel]);

  useEffect(() => () => setLabel(''), [setLabel]);

  useEffect(() => {
    if (!pinnedId) return;
    const release = () => setPinnedId(null);
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
    events.forEach((name) =>
      window.addEventListener(name, release, { passive: true })
    );
    return () =>
      events.forEach((name) => window.removeEventListener(name, release));
  }, [pinnedId]);

  return (
    <nav aria-label={title}>
      <div className='mb-4 text-[13px] font-medium text-site-soft'>{title}</div>
      <ul className='flex flex-col gap-1'>
        {items.map((item) => {
          const isActive = item.id === activeId;
          const isSub = item.level === 3;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'flex items-baseline gap-2 py-1 transition-colors hover:text-site-ink',
                  isSub ? 'pl-3 text-[12.5px]' : 'text-[13.5px]',
                  isActive ? 'text-site-ink' : 'text-site-soft'
                )}
                onClick={(event) => {
                  const target = document.getElementById(item.id);
                  if (!target) return;
                  event.preventDefault();
                  setPinnedId(item.id);
                  const reduce = window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                  ).matches;
                  target.scrollIntoView({
                    behavior: reduce ? 'auto' : 'smooth',
                  });
                  history.replaceState(null, '', `#${item.id}`);
                  if (!target.hasAttribute('tabindex'))
                    target.setAttribute('tabindex', '-1');
                  target.focus({ preventScroll: true });
                }}
              >
                {item.num ? (
                  <span
                    className={cn(
                      'font-site-mono text-[11px]',
                      isActive ? 'text-site-accent' : 'text-site-soft'
                    )}
                  >
                    {item.num}
                  </span>
                ) : (
                  isActive && (
                    <span
                      aria-hidden
                      className='h-[5px] w-[5px] shrink-0 -translate-y-px self-center rounded-full bg-site-accent'
                    />
                  )
                )}
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <div className='mt-5 h-px w-full bg-site-line'>
        <div
          className='h-px origin-left bg-site-accent'
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </nav>
  );
};

export default ContentsNav;
