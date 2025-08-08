import ItemList from '@/components/ui/item-list';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = PropsWithChildren<{}>;
export default function ChatsLayout({ children }: Props) {
  return (
    <>
      <ItemList title='Chats'>Chats Page</ItemList>
      {children}
    </>
  );
}
