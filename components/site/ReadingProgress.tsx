'use client';
import React from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const ReadingProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden
      className='fixed left-0 top-0 z-20 h-0.5 bg-site-accent'
      style={{ width: `${progress * 100}%` }}
    />
  );
};

export default ReadingProgress;
