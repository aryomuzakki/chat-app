'use client';

import MessageItem from '@/app/(authenticated)/chats/[chatId]/_components/body/message-item';
import useChats from '@/hooks/useChats';
import { api } from '@rootdir/convex/_generated/api';
import type { Id } from '@rootdir/convex/_generated/dataModel';
import { useQuery } from 'convex/react';

type Props = {};

export default function ChatBody({}: Props) {
  const { chatId } = useChats();

  const messages = useQuery(api.messages.get, {
    id: chatId as Id<'chats'>,
  });

  return (
    <div className='no-scrollbar flex w-full flex-1 flex-col-reverse gap-2 overflow-y-scroll p-3'>
      {messages?.map(({ message, senderImage, senderName, isCurrentUser }, index) => {
        const lastByUser =
          messages[index - 1]?.message.senderId === messages[index].message.senderId;

        return (
          <MessageItem
            key={message._id}
            fromCurrentUser={isCurrentUser}
            senderImage={senderImage}
            senderName={senderName}
            lastByUser={lastByUser}
            content={message.content}
            createdAt={message._creationTime}
            type={message.type}
          />
        );
      })}
    </div>
  );
}
