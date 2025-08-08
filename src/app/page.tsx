import { Button } from '@/components/ui/shadcn/button';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className=''>
      <Button>Hello</Button>
      <UserButton />
    </div>
  );
}
