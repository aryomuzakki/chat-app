import { Button } from '@/components/ui/shadcn/button';
import { MessagesSquareIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-6'>
      <h1 className='text-3xl font-bold'>Welcome to Chat App</h1>
      <p className='text-muted-foreground font-medium'>
        Let&apos;s connect with friends and family.
      </p>
      <Button asChild>
        <Link href={'/chats'}>
          Start Chatting
          <MessagesSquareIcon />
        </Link>
      </Button>
    </div>
  );
}
