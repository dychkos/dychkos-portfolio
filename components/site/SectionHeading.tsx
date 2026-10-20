import React from 'react';

interface SectionHeadingProps {
  num: string;
  title: string;
  lead?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  num,
  title,
  lead,
}) => {
  return (
    <div>
      <div className='mb-2 font-site-mono text-[12px] text-site-accent'>
        {num}
      </div>
      <h2 className='text-[30px] font-semibold tracking-[-0.6px]'>{title}</h2>
      {lead && <p className='mt-3 text-[17px] text-site-soft'>{lead}</p>}
    </div>
  );
};

export default SectionHeading;
