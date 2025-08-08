import { Card } from '@/components/ui/shadcn/card';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = PropsWithChildren<{}>;

export default function ChatContainer({ children }: Props) {
  return (
    <Card className='flex h-[calc(100svh-32px)] w-full flex-col gap-2 p-2 lg:h-full'>
      {children}
    </Card>
  );
}
