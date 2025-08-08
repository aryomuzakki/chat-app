import ChatFallback from '@/components/chats/chat-fallback';
import ItemList from '@/components/ui/item-list';

export default function FriendsPage() {
  return (
    <>
      <ItemList title='Friends'>Friends Page</ItemList>
      <ChatFallback />
    </>
  );
}
