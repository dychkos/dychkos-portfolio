import {
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  CalendarCheck2,
} from 'lucide-react';
import type React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className='w-64 bg-white shadow-md dark:bg-gray-800'>
      <div className='p-6'>
        <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
          Admin Panel
        </h1>
      </div>
      <nav className='mt-6'>
        <div className='space-y-1 px-4'>
          <NavItem
            href='/admin'
            icon={<LayoutDashboard size={18} />}
            label='Dashboard'
          />
          <NavItem
            href='/admin/posts'
            icon={<FileText size={18} />}
            label='Posts'
          />
          <NavItem
            href='/admin/events'
            icon={<CalendarCheck2 size={18} />}
            label='Events'
          />
          <NavItem
            href='/admin/settings'
            icon={<Settings size={18} />}
            label='Settings'
          />
          <div className='mt-6 border-t border-gray-200 pt-6 dark:border-gray-700'>
            <NavItem
              href='/api/auth/signout'
              icon={<LogOut size={18} />}
              label='Logout'
            />
          </div>
        </div>
      </nav>
    </aside>
  );
};

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className='flex items-center rounded-md px-4 py-3 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
    >
      <span className='mr-3'>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default Sidebar;
