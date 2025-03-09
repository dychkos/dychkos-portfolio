import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { EventForm } from '@/components/admin/events/EventForm';

interface EditEventPageProps {
  params: {
    id: string;
  };
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const id = Number.parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    notFound();
  }

  return (
    <div>
      <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
        Edit Post
      </h1>
      <EventForm event={event} />
    </div>
  );
}
