import type React from 'react';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function getAuthUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user.email) {
    return null;
  }

  // Optional: Check if user has admin role
  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
  });

  return user;
  //   return user?.role === "ADMIN" ? user : null
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Check if user is authenticated and is an admin
  const user = await getAuthUser();

  // If not authenticated or not an admin, redirect to login
  if (!user) {
    redirect('/login?callbackUrl=/admin');
  }

  return (
    <div className='flex min-h-screen bg-gray-100 dark:bg-gray-900'>
      {/* Sidebar */}
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

      {/* Main content */}
      <main className='flex-1 p-8'>{children}</main>
    </div>
  );
}

// Navigation item component
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
