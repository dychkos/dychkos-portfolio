import { getTranslations } from 'next-intl/server';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date | string;
  type: string;
  link?: string;
}

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
          <CardTitle className='flex items-center justify-center gap-2 text-center text-2xl font-bold'>
            <CalendarDays className='h-5 w-5' />
            {t('title') || 'Recent Events'}
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
          <Button asChild variant='outline'>
            <Link href='/events'>{t('more') || 'View All Events'}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card className='overflow-hidden'>
      <div className='p-6'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
              <CalendarDays className='h-4 w-4' />
              <span>{formatDate(new Date(event.date))}</span>
            </div>
            <Badge variant='outline'>{event.type}</Badge>
          </div>

          <h3 className='text-lg font-semibold'>{event.title}</h3>
          <p className='text-muted-foreground'>{event.description}</p>

          {event.link && (
            <div className='pt-2'>
              <Button asChild variant='ghost' size='sm' className='h-auto px-0'>
                <Link
                  href={event.link}
                  className='flex items-center gap-1 text-primary'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View Details
                  <ExternalLink className='ml-1 h-3.5 w-3.5' />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
