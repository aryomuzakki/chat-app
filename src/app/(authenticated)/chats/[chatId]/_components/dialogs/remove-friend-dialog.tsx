'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/shadcn/alert-dialog';
import { useMutationState } from '@/hooks/useMutationState';
import { api } from '@rootdir/convex/_generated/api';
import type { Id } from '@rootdir/convex/_generated/dataModel';
import { ConvexError } from 'convex/values';
import type { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';

type Props = {
  chatId: Id<'chats'>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function RemoveFriendDialog({ chatId, open, setOpen }: Props) {
  const { mutate: removeFriend, pending } = useMutationState(api.friend.remove);

  const handleRemoveFriend = async () => {
    removeFriend({ chatId })
      .then(() => {
        toast.success('Removed friend');
      })
      .catch(error => {
        toast.error(error instanceof ConvexError ? error.data : 'Unexpected error occured');
      });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All messages will be deleted and you will not be able to
            message this user. All group chats will still work as normal.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={handleRemoveFriend}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
