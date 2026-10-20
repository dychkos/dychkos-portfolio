'use client';
import React, { useEffect, useRef, useState } from 'react';
import { PHONE_GROUPS } from '@/lib/site/phone';
import { scrambleFrame } from '@/lib/site/scramble';
import { cn } from '@/utils/helper';

const FRAMES = 10;
const FRAME_MS = 28;
const START_GAP_IN = 90;
const START_GAP_OUT = 60;

interface PhoneEggProps {
  active: boolean;
}

const PhoneEgg: React.FC<PhoneEggProps> = ({ active }) => {
  const [texts, setTexts] = useState<string[]>(() =>
    PHONE_GROUPS.map((g) => g.text)
  );
  const current = useRef<string[]>(PHONE_GROUPS.map((g) => g.text));
  const generation = useRef(0);
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const clearTimers = () => {
    timers.current.forEach((id) => {
      clearTimeout(id);
      clearInterval(id);
    });
    timers.current.clear();
  };

  const setGroup = (i: number, value: string) => {
    current.current[i] = value;
    setTexts((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  };

  useEffect(() => {
    generation.current += 1;
    const gen = generation.current;
    clearTimers();

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const gap = active ? START_GAP_IN : START_GAP_OUT;
    let order = 0;

    PHONE_GROUPS.forEach((group, i) => {
      if (!group.egg) return;
      const target = active ? group.egg : group.text;
      if (current.current[i] === target) return;
      if (reduced) {
        setGroup(i, target);
        return;
      }
      const from = current.current[i];
      const delay = order * gap;
      order += 1;
      const startId = setTimeout(() => {
        timers.current.delete(startId);
        if (gen !== generation.current) return;
        let step = 0;
        const intervalId = setInterval(() => {
          if (gen !== generation.current) {
            clearInterval(intervalId);
            timers.current.delete(intervalId);
            return;
          }
          step += 1;
          setGroup(i, scrambleFrame(from, target, step, FRAMES, Math.random));
          if (step >= FRAMES) {
            clearInterval(intervalId);
            timers.current.delete(intervalId);
          }
        }, FRAME_MS);
        timers.current.add(intervalId);
      }, delay);
      timers.current.add(startId);
    });

    return () => {
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <span className='inline-flex gap-[0.32em]'>
      {PHONE_GROUPS.map((group, i) => (
        <span
          key={i}
          className={cn(
            'transition-colors duration-200',
            group.egg && active && 'text-site-accent'
          )}
        >
          {texts[i]}
        </span>
      ))}
    </span>
  );
};

export default PhoneEgg;
