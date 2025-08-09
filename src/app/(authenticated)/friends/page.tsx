'use client';

import AddFriendDialog from '@/app/(authenticated)/friends/_components/add-friend-dialog';
import Request from '@/app/(authenticated)/friends/_components/request';
import ChatFallback from '@/components/chats/chat-fallback';
import ItemList from '@/components/ui/item-list';
import { api } from '@rootdir/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';

export default function FriendsPage() {
  const requests = useQuery(api.requests.get);

  return (
    <>
      <ItemList
        title='Friends'
        action={<AddFriendDialog />}
      >
        {requests ? (
          requests.length === 0 ? (
            <p className='flex size-full items-center justify-center'>No friend requests found</p>
          ) : (
            requests.map(request => (
              <Request
                key={request.request._id}
                id={request.request._id}
                imageUrl={request.sender.imageUrl}
                username={request.sender.username}
                email={request.sender.email}
              />
            ))
          )
        ) : (
          <Loader2Icon className='size-8 animate-spin' />
        )}
      </ItemList>
      <ChatFallback />
    </>
  );
}
