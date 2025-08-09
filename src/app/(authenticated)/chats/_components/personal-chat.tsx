import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/shadcn/avatar';
import { Card } from '@/components/ui/shadcn/card';
import type { Id } from '@rootdir/convex/_generated/dataModel';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  id: Id<'chats'>;
  imageUrl: string;
  username: string;
};

export default function PersonalChat({ id, imageUrl, username }: Props) {
  return (
    <Link
      href={`/chats/${id}`}
      className='w-full'
    >
      <Card className='flex flex-row items-center gap-4 truncate p-2'>
        <div className='flex flex-row items-center gap-4 truncate'>
          <Avatar className='size-11'>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col truncate'>
            <h4 className='truncate'>{username}</h4>
            <p className='text-muted-foreground truncate text-sm'>Start to chat!</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
