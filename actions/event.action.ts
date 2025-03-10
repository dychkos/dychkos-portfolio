'use server';

import type { Event as EventType } from '@prisma/client';
import prisma from '@/lib/prisma';

export async function getEvents(
  limit = 3,
  locale = 'en'
): Promise<EventType[]> {
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
