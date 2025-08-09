'use client';

import ChatBody from '@/app/(authenticated)/chats/[chatId]/_components/chat-body';
import ChatHeader from '@/app/(authenticated)/chats/[chatId]/_components/chat-header';
import ChatInput from '@/app/(authenticated)/chats/[chatId]/_components/chat-input';
import ChatContainer from '@/components/chats/chat-container';
import { api } from '@rootdir/convex/_generated/api';
import type { Id } from '@rootdir/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import { use } from 'react';

type Props = {
  params: Promise<{ chatId: Id<'chats'> }>;
};

export default function ChatDetailPage({ params }: Props) {
  const { chatId } = use(params);

  const chat = useQuery(api.chat.get, { id: chatId });

  return chat === undefined ? (
    <div className='flex size-full items-center justify-center'>
      <Loader2Icon className='size-8 animate-spin' />
    </div>
  ) : chat === null ? (
    <div className='flex size-full items-center justify-center'>Chat not found</div>
  ) : (
    <ChatContainer>
      <ChatHeader
        name={(chat.isGroup ? chat.name : chat.otherMember.username) || ''}
        imageUrl={chat.isGroup ? undefined : chat.otherMember.imageUrl}
      />
      <ChatBody />
      <ChatInput />
    </ChatContainer>
  );
}
