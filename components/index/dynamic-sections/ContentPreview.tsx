'use client';

import type React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import Container from '@/components/Container';

interface ContentWrapperProps {
  postsContent: React.ReactNode;
  eventsContent: React.ReactNode;
  className?: string;
  defaultTab?: 'posts' | 'events';
}

export default function ContentWrapper({
  postsContent,
  eventsContent,
  className,
  defaultTab = 'posts',
}: ContentWrapperProps) {
  return (
    <Container className='py-24'>
      <Tabs defaultValue={defaultTab} className='w-full'>
        <TabsList className='mx-auto mb-8 grid w-full max-w-md grid-cols-2'>
          <TabsTrigger value='posts' className='flex items-center gap-2'>
            <FileText className='h-4 w-4' />
            Blog Posts
          </TabsTrigger>
          <TabsTrigger value='events' className='flex items-center gap-2'>
            <CalendarDays className='h-4 w-4' />
            Recent Events
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
