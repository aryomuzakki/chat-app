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

export default function DeleteGroupDialog({ chatId, open, setOpen }: Props) {
  const { mutate: deleteGroup, pending } = useMutationState(api.chat.deleteGroup);

  const handleDeleteGroup = async () => {
    deleteGroup({ chatId })
      .then(() => {
        toast.success('Group Deleted');
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
            This action cannot be undone. All messages will be deleted for all group member and no
            one will be able to send message to this group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={handleDeleteGroup}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
