'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const EventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  link: z.string().nullable(),
  type: z.string().min(1, 'Type is required'),
  date: z.string().min(1, 'Date is required'),
});

type EventFormData = z.infer<typeof EventSchema>;

export async function createEvent(formData: FormData) {
  const title = formData.get('title') as string;
  const title_en = formData.get('title_en') as string;
  const description = formData.get('description') as string;
  const description_en = formData.get('description_en') as string;
  const link = formData.get('link') as string;
  const type = formData.get('type') as string;
  const date = formData.get('date') as string;

  const validatedFields = EventSchema.safeParse({
    title,
    description,
    title_en,
    description_en,
    link,
    type,
    date,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.event.create({
      data: {
        title,
        description,
        title_en,
        description_en,
        link,
        type,
        date,
      },
    });
  } catch (error) {
    return {
      error: {
        _form: 'Failed to create event. Please try again.',
      },
    };
  }

  revalidatePath('/admin/events');
  redirect('/admin/events');
}

export async function updateEvent(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const title_en = formData.get('title_en') as string;
  const description = formData.get('description') as string;
  const description_en = formData.get('description_en') as string;
  const link = formData.get('link') as string;
  const type = formData.get('type') as string;
  const date = formData.get('date') as string;

  const validatedFields = EventSchema.safeParse({
    title,
    description,
    title_en,
    description_en,
    link,
    type,
    date,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        title_en,
        description_en,
        link,
        type,
        date,
      },
    });
  } catch (error) {
    return {
      error: {
        _form: 'Failed to update event. Please try again.',
      },
    };
  }

  revalidatePath('/admin/events');
  redirect('/admin/events');
}

export async function deleteEvent(id: number) {
  try {
    await prisma.event.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Failed to delete event');
  }

  revalidatePath('/admin/events');

  return { success: true };
}
