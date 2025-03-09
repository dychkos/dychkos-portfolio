'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
// import { useToast } from "@/hooks/use-toast"
import { deleteEvent } from '@/app/admin/events/actions';

export default function DeleteEventButton({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  //   const { toast } = useToast()

  async function handleDelete() {
    try {
      setIsDeleting(true);
      await deleteEvent(id);
      //   toast({
      //     title: "Post deleted",
      //     description: "The post has been successfully deleted.",
      //   })
      setOpen(false);
      // Refresh the current page to update the list
      window.location.reload();
    } catch (error) {
      //   toast({
      //     title: "Error",
      //     description: "Failed to delete the post. Please try again.",
      //     variant: "destructive",
      //   })
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Button variant='destructive' size='sm' onClick={() => setOpen(true)}>
        <Trash2 className='h-4 w-4' />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className='bg-red-600 hover:bg-red-700 focus:ring-red-600'
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
