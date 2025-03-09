import { EventForm } from '@/components/admin/events/EventForm';

export default function NewEventPage() {
  return (
    <div>
      <h1 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>
        Create New Event
      </h1>
      <EventForm />
    </div>
  );
}
