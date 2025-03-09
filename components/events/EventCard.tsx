import { Card } from '@/components/ui/card';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import type React from 'react';
import type { Event } from '@/types/event';

export default function EventCard({ event }: { event: Event }) {
  return (
    <Card className='overflow-hidden rounded-xl border-2 border-gray-100 bg-gray-50 shadow transition hover:shadow-md dark:border-gray-800 dark:bg-gray-800'>
      <div className='p-6'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
              <CalendarDays className='h-4 w-4' />
              <span>{formatDate(new Date(event.date))}</span>
            </div>
            <Badge variant='outline' className='dark:borer-none bg-neutral-700'>
              {event.type}
            </Badge>
          </div>

          <h3 className='text-lg font-semibold'>{event.title}</h3>
          <p className='text-muted-foreground'>{event.description}</p>

          {event.link && (
            <div className='pt-2'>
              <Button asChild variant='ghost' size='sm' className='h-auto p-1'>
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
