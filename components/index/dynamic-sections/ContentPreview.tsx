'use client';

import type React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, FileText } from 'lucide-react';
import Container from '@/components/Container';

interface ContentWrapperProps {
  recentEventsTitle: string;
  notesTitle: string;
  postsContent: React.ReactNode;
  eventsContent: React.ReactNode;
  defaultTab?: 'posts' | 'events';
}

export default function ContentWrapper({
  recentEventsTitle,
  notesTitle,
  postsContent,
  eventsContent,
  defaultTab = 'events',
}: ContentWrapperProps) {
  return (
    <Container className='pb-4 pt-24'>
      <Tabs defaultValue={defaultTab} className='h-auto'>
        <TabsList className='mx-auto mb-8 grid min-h-[48px] w-full max-w-md grid-cols-2'>
          <TabsTrigger value='events' className='flex items-center gap-2 py-2'>
            <CalendarDays className='h-4 w-4' />
            {recentEventsTitle}
          </TabsTrigger>

          <TabsTrigger value='posts' className='flex items-center gap-2 py-2'>
            <FileText className='h-4 w-4' />
            {notesTitle}
          </TabsTrigger>
        </TabsList>

        <TabsContent value='posts' className='focus-visible:outline-none'>
          {postsContent}
        </TabsContent>

        <TabsContent value='events' className='focus-visible:outline-none'>
          {eventsContent}
        </TabsContent>
      </Tabs>
    </Container>
  );
}
