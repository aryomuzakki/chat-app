import { Button } from '@/components/ui/shadcn/button';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className=''>
      <Button asChild>
        <Link href={'/chats'}>Open Chats</Link>
      </Button>
      <UserButton />
    </div>
  );
}
