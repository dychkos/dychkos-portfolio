import { getTranslations } from 'next-intl/server';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/partials/Heading';
import type React from 'react';
import type { Event as EventType } from '@prisma/client';
import EventCard from '@/components/events/EventCard';
import prisma from '@/lib/prisma';
import { useLocale } from 'next-intl';

interface EventPreviewProps {
  limit?: number;
  showHeading?: boolean;
}

async function getEvents(limit = 3, locale: string): Promise<EventType[]> {
  // Get all events with all fields
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  });

  if (locale === 'en') {
    return events.map((event) => ({
      ...event,
      title: event.title_en,
      description: event.description_en,
    }));
  }

  return events;
}

export default async function EventsPreview({
  limit = 3,
  showHeading = true,
}: EventPreviewProps) {
  const locale = useLocale();
  const events = await getEvents(limit, locale);
  const t = await getTranslations('EventsPreview');

  return (
    <Card className='border-none shadow-none'>
      {showHeading && (
        <CardHeader>
          <CardTitle>
            <Heading>{t('heading')}</Heading>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className='px-0 sm:px-6'>
        <div className='space-y-4'>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className='mt-8 flex justify-center'>
          <Button asChild variant='outline' className='dark:bg-neutral-700'>
            <Link href='/events'>{t('more') || 'View All Events'}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
