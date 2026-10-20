'use client';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { cn } from '@/utils/helper';

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface RevealProps {
  as?: 'section' | 'div';
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const Reveal: React.FC<RevealProps> = ({
  as: Tag = 'div',
  id,
  className,
  children,
}) => {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-shown');
    }
    document.documentElement.classList.add('reveal-ready');

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-shown');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add('is-shown');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      id={id}
      className={cn('reveal', className)}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
