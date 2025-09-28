import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/components/partials/Heading';
import type React from 'react';
import EventCard from '@/components/events/EventCard';
import { useLocale } from 'next-intl';
import { getEvents } from '@/actions/event.action';
import Container from '@/components/Container';

interface EventPreviewProps {
  limit?: number;
  showHeading?: boolean;
}

export default async function EventsPreview({
  limit = 2,
  showHeading = true,
}: EventPreviewProps) {
  const locale = useLocale();
  const events = await getEvents(limit, locale);
  const t = await getTranslations('EventsPreview');

  return (
    <Container className='pb-4 pt-24'>
      <Card className='border-none shadow-none'>
        {showHeading && (
          <CardHeader>
            <CardTitle>
              <Heading>{t('heading')}</Heading>
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className='px-0 sm:px-6'>
          <div className='grid grid-cols-1 items-baseline gap-8 space-y-4 md:grid-cols-2'>
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
    </Container>
  );
}
