import { cn } from '@/utils/helper';

interface BurgerButtonProps {
  isOpened: boolean;
  onClick: () => void;
  className?: string;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({
  isOpened,
  onClick,
  className,
}) => {
  return (
    <button
      type='button'
      aria-expanded={isOpened}
      aria-label='Menu'
      onClick={onClick}
      className={cn(
        `tham tham-e-squeeze tham-w-7`,
        {
          'tham-active': isOpened,
        },
        className
      )}
    >
      <div className='tham-box'>
        <div className='tham-inner bg-site-ink' />
      </div>
    </button>
  );
};

export default BurgerButton;
