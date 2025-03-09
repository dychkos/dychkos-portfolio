import Container from '@/components/Container';
import EventCard from '@/components/events/EventCard';
import type { Event } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

const getEvents = async (): Promise<Event[]> => {
  try {
    return await prisma.event.findMany({
      orderBy: [
        {
          date: 'asc', // Show upcoming events first
        },
      ],
      take: 6, // Limit to 6 events
    });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
};

interface EventsPageProps {
  params: {
    locale: string;
  };
}

export default async function EventsPage({
  params: { locale },
}: EventsPageProps) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Events');

  return (
    <Container className='mt-12'>
      <div className='mx-auto mb-12 max-w-2xl text-center'>
        <h2 className='mt-6 text-3xl font-bold text-gray-900 dark:text-gray-50 sm:text-4xl'>
          {t('title')}
        </h2>
        <p className='mx-auto mt-4 max-w-xl text-center text-lg text-gray-600 dark:text-gray-300'>
          {t('text')}
        </p>
      </div>

      <Suspense fallback={<EventsLoading />}>
        <EventsList />
      </Suspense>
    </Container>
  );
}

function EventsLoading() {
  return (
    <div className='grid gap-8 md:grid-cols-2'>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className='h-64 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800'
        />
      ))}
    </div>
  );
}

async function EventsList() {
  const events = await getEvents();

  if (events.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center rounded-xl bg-gray-50 p-12 text-center dark:bg-gray-800/50'>
        <CalendarDays className='mb-4 h-12 w-12 text-gray-400' />
        <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
          No upcoming events
        </h3>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          Check back later for new events.
        </p>
      </div>
    );
  }

  return (
    <div className='grid gap-8 md:grid-cols-2'>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
