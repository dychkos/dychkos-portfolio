import { getTranslations } from 'next-intl/server';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Heading from '@/components/partials/Heading';
import type React from 'react';
import type { Event } from '@/types/event';
import EventCard from '@/components/events/EventCard';

interface EventPreviewProps {
  limit?: number;
  showHeading?: boolean;
}

// This would typically come from your database
// For now using mock data, but you could replace with prisma call
async function getEvents(limit = 3): Promise<Event[]> {
  // Mock events - replace with actual data fetching
  const events: Event[] = [
    {
      id: '1',
      title: 'Completed Advanced React Course',
      description:
        'Finished a comprehensive course on React hooks, context API, and performance optimization techniques.',
      date: new Date('2023-12-15'),
      type: 'Education',
      link: 'https://example.com/certificate',
    },
    {
      id: '2',
      title: 'Published Article on Medium',
      description:
        'Wrote an in-depth article about building accessible web applications with modern frameworks.',
      date: new Date('2024-01-20'),
      type: 'Publication',
      link: 'https://medium.com/example-article',
    },
    {
      id: '3',
      title: 'Spoke at Local Developer Meetup',
      description:
        'Gave a talk on best practices for state management in frontend applications.',
      date: new Date('2024-02-10'),
      type: 'Speaking',
      link: 'https://meetup.com/event',
    },
  ];

  return events.slice(0, limit);
}

export default async function EventsPreview({
  limit = 3,
  showHeading = true,
}: EventPreviewProps) {
  const events = await getEvents(limit);
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
