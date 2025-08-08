import { Button } from '@/components/ui/shadcn/button';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex h-full flex-col gap-6'>
      <div className='flex items-center justify-between gap-6 px-6 py-4'>
        <h1 className=''>Chat App Home Page</h1>
        <ThemeToggle />
      </div>
      <div className='flex h-full items-center justify-center'>
        <Button asChild>
          <Link href={'/chats'}>Start Chats</Link>
        </Button>
      </div>
    </div>
  );
}
