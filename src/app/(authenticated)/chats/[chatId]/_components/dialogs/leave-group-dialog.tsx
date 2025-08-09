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

export default function LeaveGroupDialog({ chatId, open, setOpen }: Props) {
  const { mutate: leaveGroup, pending } = useMutationState(api.chat.leaveGroup);

  const handleLeaveGroup = async () => {
    leaveGroup({ chatId })
      .then(() => {
        toast.success('You left the group');
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
            This action cannot be undone. You will not be able to see any previous messages or send
            messages to this group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={handleLeaveGroup}
          >
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
