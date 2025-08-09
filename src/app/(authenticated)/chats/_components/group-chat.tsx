import { Avatar, AvatarFallback } from '@/components/ui/shadcn/avatar';
import { Card } from '@/components/ui/shadcn/card';
import type { Id } from '@rootdir/convex/_generated/dataModel';
import Link from 'next/link';

type Props = {
  id: Id<'chats'>;
  name: string;
  lastMessageSender?: string;
  lastMessageContent?: string;
};

export default function GroupChat({ id, name, lastMessageSender, lastMessageContent }: Props) {
  return (
    <Link
      href={`/chats/${id}`}
      className='w-full'
    >
      <Card className='flex flex-row items-center gap-4 truncate p-2'>
        <div className='flex flex-row items-center gap-4 truncate'>
          <Avatar className='size-11'>
            <AvatarFallback>{name.charAt(0).toLocaleUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col truncate'>
            <h4 className='truncate'>{name}</h4>
            {lastMessageSender && lastMessageContent ? (
              <span className='text-muted-foreground flex truncate text-sm overflow-ellipsis'>
                <p className='font-semibold'>
                  {lastMessageSender}
                  {':'}&nbsp;
                </p>
                <p className='truncate overflow-ellipsis'>{lastMessageContent}</p>
              </span>
            ) : (
              <p className='text-muted-foreground truncate text-sm'>Start to chat!</p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
