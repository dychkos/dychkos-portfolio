'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import type { Event } from '@prisma/client';
import { DatePicker } from '@/components/ui/datepicker';
import { createEvent, updateEvent } from '@/app/admin/events/actions';

interface EventFormProps {
  event?: Event;
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    event?.date ? new Date(event.date) : undefined
  );

  const isEditing = !!event;

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setIsSubmitting(true);
    setErrors(null);
    setFormError(null);

    console.log('submit', event);

    const formData = new FormData(formEvent.currentTarget);

    if (date) {
      formData.append('date', date.toISOString());
    }

    try {
      const result = isEditing
        ? await updateEvent(event.id, formData)
        : await createEvent(formData);

      if (result?.error) {
        setErrors(result.error as Record<string, string[]>);
        setIsSubmitting(false);
      } else {
        router.push('/admin/events');
      }
    } catch (error) {
      setFormError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardContent className='pt-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {formError && (
            <div className='rounded border border-red-400 bg-red-100 p-3 text-red-700'>
              {formError}
            </div>
          )}

          <div className='space-y-2'>
            <label
              htmlFor='title'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Title
            </label>
            <Input
              id='title'
              name='title'
              defaultValue={event?.title || ''}
              className={errors?.title ? 'border-red-500' : ''}
            />
            {errors?.title && (
              <p className='text-sm text-red-500'>{errors.title[0]}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='description'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Description
            </label>
            <Textarea
              id='description'
              name='description'
              rows={10}
              defaultValue={event?.description || ''}
              className={errors?.description ? 'border-red-500' : ''}
            />
            {errors?.description && (
              <p className='text-sm text-red-500'>{errors.description[0]}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='title_en'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Title in English
            </label>
            <Input
              id='title_en'
              name='title_en'
              defaultValue={event?.title_en || ''}
              className={errors?.title_en ? 'border-red-500' : ''}
            />
            {errors?.title_en && (
              <p className='text-sm text-red-500'>{errors.title_en[0]}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='description_en'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Description in English
            </label>
            <Textarea
              id='description_en'
              name='description_en'
              rows={10}
              defaultValue={event?.description_en || ''}
              className={errors?.description_en ? 'border-red-500' : ''}
            />
            {errors?.description_en && (
              <p className='text-sm text-red-500'>{errors.description_en[0]}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='link'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Link
            </label>
            <Input
              id='link'
              name='link'
              defaultValue={event?.link || ''}
              className={errors?.link ? 'border-red-500' : ''}
            />
            {errors?.link && (
              <p className='text-sm text-red-500'>{errors.link[0]}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='type'
              className='text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Type
            </label>
            <Input
              id='type'
              name='type'
              defaultValue={event?.type || ''}
              className={errors?.type ? 'border-red-500' : ''}
            />
            {errors?.type && (
              <p className='text-sm text-red-500'>{errors.type[0]}</p>
            )}
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='date'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Date
            </label>
            <DatePicker selected={date} onSelect={setDate} />
            {errors?.date && (
              <p className='text-sm text-red-500'>{errors.date[0]}</p>
            )}
          </div>

          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.push('/admin/events')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting
                ? 'Saving...'
                : isEditing
                  ? 'Update Event'
                  : 'Create Event'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
