import React from 'react';

interface ReadingLayoutProps {
  aside?: React.ReactNode;
  children: React.ReactNode;
}

const ReadingLayout: React.FC<ReadingLayoutProps> = ({ aside, children }) => {
  return (
    <div className='mx-auto w-full max-w-[1080px] overflow-x-clip px-6'>
      <div className='grid gap-16 min-[1000px]:grid-cols-[200px_minmax(0,640px)]'>
        <aside className='hidden min-[1000px]:block'>
          <div className='sticky top-[84px] max-h-[calc(100vh-100px)] overflow-auto pt-[72px]'>
            {aside}
          </div>
        </aside>
        <main className='min-w-0'>{children}</main>
      </div>
    </div>
  );
};

export default ReadingLayout;
