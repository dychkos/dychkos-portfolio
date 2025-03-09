import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Pencil } from 'lucide-react';
import EventsTable from '@/components/admin/events/EventsTable';

export default function AdminEventsPage() {
  return (
    <div>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Manage Events
        </h1>
        <Button asChild>
          <Link href='/admin/events/new'>
            <Plus className='mr-2 h-4 w-4' /> New event
          </Link>
        </Button>
      </div>

      <div className='max-w-[1200px] overflow-auto rounded-lg bg-white shadow dark:bg-gray-800'>
        <Suspense
          fallback={<div className='p-4 text-center'>Loading events...</div>}
        >
          <EventsTable />
        </Suspense>
      </div>
    </div>
  );
}
