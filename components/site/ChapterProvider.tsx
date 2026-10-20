'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

type ChapterContextValue = {
  label: string;
  setLabel: (label: string) => void;
};

const ChapterContext = createContext<ChapterContextValue>({
  label: '',
  setLabel: () => {},
});

export const ChapterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [label, setLabel] = useState('');
  const value = useMemo(() => ({ label, setLabel }), [label]);

  return (
    <ChapterContext.Provider value={value}>{children}</ChapterContext.Provider>
  );
};

export const useChapter = () => useContext(ChapterContext);
