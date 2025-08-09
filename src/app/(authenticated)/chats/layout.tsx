'use client';

import CreateGroupDialog from '@/app/(authenticated)/chats/_components/create-group-dialog';
import GroupChat from '@/app/(authenticated)/chats/_components/group-chat';
import PersonalChat from '@/app/(authenticated)/chats/_components/personal-chat';
import ItemList from '@/components/ui/item-list';
import { api } from '@rootdir/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = PropsWithChildren<{}>;

export default function ChatsLayout({ children }: Props) {
  const chats = useQuery(api.chats.get);

  return (
    <>
      <ItemList
        title='Chats'
        action={<CreateGroupDialog />}
      >
        {chats ? (
          chats.length === 0 ? (
            <p className='flex size-full items-center justify-center'>No chats found</p>
          ) : (
            chats.map(chat => {
              return chat.chat.isGroup ? (
                <GroupChat
                  key={chat.chat._id}
                  id={chat.chat._id}
                  name={chat.chat.name || ''}
                  lastMessageContent={chat.lastMessage?.content}
                  lastMessageSender={chat.lastMessage?.sender}
                />
              ) : (
                <PersonalChat
                  key={chat.chat._id}
                  id={chat.chat._id}
                  username={chat.otherMember?.username || ''}
                  imageUrl={chat.otherMember?.imageUrl || ''}
                  lastMessageContent={chat.lastMessage?.content}
                  lastMessageSender={chat.lastMessage?.sender}
                />
              );
            })
          )
        ) : (
          <Loader2Icon className='size-8 animate-spin' />
        )}
      </ItemList>
      {children}
    </>
  );
}
