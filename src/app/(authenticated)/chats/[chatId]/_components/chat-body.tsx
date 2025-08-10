'use client';

import MessageItem from '@/app/(authenticated)/chats/[chatId]/_components/body/message-item';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/shadcn/tooltip';
import useChats from '@/hooks/useChats';
import { useMutationState } from '@/hooks/useMutationState';
import { api } from '@rootdir/convex/_generated/api';
import type { Id } from '@rootdir/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { useEffect } from 'react';

type Props = {
  members: {
    lastSeenMessageId?: Id<'messages'>;
    username?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }[];
};

export default function ChatBody({ members }: Props) {
  const { chatId } = useChats();

  const messages = useQuery(api.messages.get, {
    id: chatId as Id<'chats'>,
  });

  const { mutate: markRead } = useMutationState(api.chat.markRead);

  useEffect(() => {
    if (messages && messages.length > 0) {
      markRead({ chatId, messageId: messages[0].message._id });
    }

    return () => {};
  }, [messages, chatId, markRead]);

  const formatSeenBy = (names: string[]) => {
    switch (names.length) {
      case 1:
        return <p className='text-muted-foreground text-right text-sm'>Seen by {names[0]}</p>;
      case 2:
        return (
          <p className='text-muted-foreground text-right text-sm'>
            Seen by {names[0]} and {names[1]}
          </p>
        );
      default:
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <p className='text-muted-foreground text-right text-sm'>
                  Seen by {names[0]}, {names[1]}, and {names.length - 2} more
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <ul>
                  {names.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
    }
  };

  const getSeenMessage = (messageId: Id<'messages'>) => {
    const seenUsers = members
      .filter(member => member.lastSeenMessageId === messageId)
      .map(user => user.username!.split(' ')[0]);

    if (seenUsers.length === 0) return;

    return formatSeenBy(seenUsers);
  };

  return (
    <div className='no-scrollbar flex w-full flex-1 flex-col-reverse gap-2 overflow-y-scroll p-3'>
      {messages?.map(({ message, senderImage, senderName, isCurrentUser }, index) => {
        const lastByUser =
          messages[index - 1]?.message.senderId === messages[index].message.senderId;

        const seenMessage = isCurrentUser ? getSeenMessage(message._id) : undefined;

        return (
          <MessageItem
            key={message._id}
            fromCurrentUser={isCurrentUser}
            senderImage={senderImage}
            senderName={senderName}
            lastByUser={lastByUser}
            content={message.content}
            createdAt={message._creationTime}
            seen={seenMessage}
            type={message.type}
          />
        );
      })}
    </div>
  );
}
