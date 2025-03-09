import prisma from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import DeleteEventButton from '@/components/admin/events/EventDeleteButton';

export default async function EventsTable() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' },
  });

  if (events.length === 0) {
    return (
      <div className='p-8 text-center text-gray-500 dark:text-gray-400'>
        No events found. Create your first event to get started.
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead className='bg-gray-50 dark:bg-gray-700'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
              Content
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
              Link
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
              Type
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
              Date
            </th>
            <th className='px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
          {events.map((event) => (
            <tr
              key={event.id}
              className='dark:hover:bg-gray-750 hover:bg-gray-50'
            >
              <td className='whitespace-nowrap px-6 py-4'>
                <div className='max-w-md truncate text-sm font-bold text-gray-500 dark:text-gray-400'>
                  {event.title?.substring(0, 100) || 'No content'}
                </div>
                <div className='max-w-md truncate text-sm text-gray-500 dark:text-gray-400'>
                  {event.description?.substring(0, 100) || 'No content'}
                </div>
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400'>
                {event.link || 'No link'}
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400'>
                {event.type}
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400'>
                {event.date
                  ? formatDistanceToNow(new Date(event.date), {
                      addSuffix: true,
                    })
                  : 'Unknown'}
              </td>
              <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                <div className='flex justify-end space-x-2'>
                  <Button variant='outline' size='sm' asChild>
                    <Link href={`/admin/events/${event.id}/edit`}>
                      <Pencil className='h-4 w-4' />
                    </Link>
                  </Button>
                  <DeleteEventButton id={event.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
