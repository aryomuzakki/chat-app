'use client';

import { Card } from '@/components/ui/shadcn/card';
import useChats from '@/hooks/useChats';
import { cn } from '@/lib/utils';
import type { PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
  title: string;
  action?: ReactNode;
}>;

export default function ItemList({ children, title, action: Action }: Props) {
  const { isActive } = useChats();

  return (
    <Card
      className={cn('hidden h-full w-full p-2 lg:w-80 lg:flex-none', {
        'flex': !isActive,
        'lg:flex': isActive,
      })}
    >
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
        {Action || null}
      </div>
      <div className='flex size-full flex-col items-center justify-start gap-2'>{children}</div>
    </Card>
  );
}
