import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { cn } from '@/utils/helper';

interface SimplePaginationControlsProps {
  currentPage: number;
  totalPages: number;
  locale: Locale;
}

export function SimplePaginationControls({
  currentPage,
  totalPages,
  locale,
}: SimplePaginationControlsProps) {
  const createPageUrl = (page: number) => {
    if (page === 1) {
      return `/${locale}/blog`;
    }
    return `/${locale}/blog?page=${page}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  const linkClass = 'transition-colors hover:text-site-accent';
  const disabledClass = 'pointer-events-none opacity-40';

  return (
    <nav
      aria-label='pagination'
      className='mt-10 flex items-center justify-between border-t border-site-line pt-5 text-[15px]'
    >
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        aria-disabled={!hasPrev}
        tabIndex={hasPrev ? undefined : -1}
        className={cn(linkClass, !hasPrev && disabledClass)}
      >
        ← Previous
      </Link>
      <span className='font-site-mono text-[12px] text-site-soft'>
        {currentPage} / {totalPages}
      </span>
      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        aria-disabled={!hasNext}
        tabIndex={hasNext ? undefined : -1}
        className={cn(linkClass, !hasNext && disabledClass)}
      >
        Next →
      </Link>
    </nav>
  );
}
