'use client';

import ChatBody from '@/app/(authenticated)/chats/[chatId]/_components/chat-body';
import ChatHeader from '@/app/(authenticated)/chats/[chatId]/_components/chat-header';
import ChatInput from '@/app/(authenticated)/chats/[chatId]/_components/chat-input';
import DeleteGroupDialog from '@/app/(authenticated)/chats/[chatId]/_components/dialogs/delete-group-dialog';
import LeaveGroupDialog from '@/app/(authenticated)/chats/[chatId]/_components/dialogs/leave-group-dialog';
import RemoveFriendDialog from '@/app/(authenticated)/chats/[chatId]/_components/dialogs/remove-friend-dialog';
import ChatContainer from '@/components/chats/chat-container';
import { api } from '@rootdir/convex/_generated/api';
import type { Id } from '@rootdir/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import { use, useState } from 'react';

type Props = {
  params: Promise<{ chatId: Id<'chats'> }>;
};

export default function ChatDetailPage({ params }: Props) {
  const { chatId } = use(params);

  const chat = useQuery(api.chat.get, { id: chatId });

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);

  return chat === undefined ? (
    <div className='flex size-full items-center justify-center'>
      <Loader2Icon className='size-8 animate-spin' />
    </div>
  ) : chat === null ? (
    <div className='flex size-full items-center justify-center'>Chat not found</div>
  ) : (
    <ChatContainer>
      <RemoveFriendDialog
        chatId={chatId}
        open={removeFriendDialogOpen}
        setOpen={setRemoveFriendDialogOpen}
      />
      <DeleteGroupDialog
        chatId={chatId}
        open={deleteGroupDialogOpen}
        setOpen={setDeleteGroupDialogOpen}
      />
      <LeaveGroupDialog
        chatId={chatId}
        open={leaveGroupDialogOpen}
        setOpen={setLeaveGroupDialogOpen}
      />
      <ChatHeader
        name={(chat.isGroup ? chat.name : chat.otherMember.username) || ''}
        imageUrl={chat.isGroup ? undefined : chat.otherMember.imageUrl}
        options={
          chat.isGroup
            ? [
                {
                  label: 'Leave group',
                  destructive: false,
                  onClick: () => {
                    setLeaveGroupDialogOpen(true);
                  },
                },
                {
                  label: 'Delete group',
                  destructive: true,
                  onClick: () => {
                    setDeleteGroupDialogOpen(true);
                  },
                },
              ]
            : [
                {
                  label: 'Remove friend',
                  destructive: true,
                  onClick: () => {
                    setRemoveFriendDialogOpen(true);
                  },
                },
              ]
        }
      />
      <ChatBody />
      <ChatInput />
    </ChatContainer>
  );
}
