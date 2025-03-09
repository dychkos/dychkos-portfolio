import type React from 'react';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Sidebar from '@/components/admin/Sidebar';

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
  const user = await getAuthUser();

  if (!user) {
    redirect('/login?callbackUrl=/admin');
  }

  return (
    <div className='flex min-h-screen bg-gray-100 dark:bg-gray-900'>
      <Sidebar />

      {/* Main content */}
      <main className='flex-1 p-8'>{children}</main>
    </div>
  );
}

// Navigation item component
