import { cn } from "@/utils/helper";

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
    <div
      onClick={onClick}
      className={cn(
        `tham tham-e-squeeze tham-w-7`,
        {
          "tham-active": isOpened,
        },
        className
      )}
    >
      <div className="tham-box">
        <div className="tham-inner bg-gray-600 dark:bg-gray-50" />
      </div>
    </div>
  );
};

export default BurgerButton;
