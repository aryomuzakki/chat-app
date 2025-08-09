import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/shadcn/avatar';
import { Card } from '@/components/ui/shadcn/card';
import { CircleArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  imageUrl?: string;
  name: string;
};

export default function ChatHeader({ imageUrl, name }: Props) {
  return (
    <Card className='flex w-full items-center justify-between rounded-lg p-2'>
      <div className='flex items-center gap-2'>
        <Link
          href={'/chats'}
          className='block lg:hidden'
        >
          <CircleArrowLeftIcon />
        </Link>
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <h2 className='font-semibold'>{name}</h2>
      </div>
    </Card>
  );
}
