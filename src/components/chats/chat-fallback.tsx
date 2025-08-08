import { Card } from '@/components/ui/shadcn/card';

export default function ChatFallback() {
  return (
    <Card className='bg-secondary text-secondary-foreground hidden size-full items-center justify-center p-2 lg:flex'>
      Start chats with your friends^^
    </Card>
  );
}
