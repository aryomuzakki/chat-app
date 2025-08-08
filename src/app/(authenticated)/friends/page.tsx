import AddFriendDialog from '@/app/(authenticated)/friends/_components/add-friend-dialog';
import ChatFallback from '@/components/chats/chat-fallback';
import ItemList from '@/components/ui/item-list';

export default function FriendsPage() {
  return (
    <>
      <ItemList
        title='Friends'
        action={<AddFriendDialog />}
      >
        Friends Page
      </ItemList>
      <ChatFallback />
    </>
  );
}
