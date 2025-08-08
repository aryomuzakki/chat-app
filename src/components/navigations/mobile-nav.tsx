'use client';

import { Button } from '@/components/ui/shadcn/button';
import { Card } from '@/components/ui/shadcn/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/shadcn/tooltip';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import useChats from '@/hooks/useChats';
import useNavigation from '@/hooks/useNavigation';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function MobileNav() {
  const paths = useNavigation();

  const { isActive } = useChats();
  if (isActive) return null;

  return (
    <Card className='fixed bottom-4 flex w-[calc(100vw-32px)] items-center p-2 lg:hidden'>
      <nav className='w-full'>
        <ul className='flex items-center justify-evenly'>
          {paths.map(path => (
            <li
              key={path.href}
              className='relative'
            >
              <Link href={path.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size={'icon'}
                      variant={path.active ? 'default' : 'outline'}
                    >
                      {path.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{path.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          ))}
          <li className=''>
            <ThemeToggle />
          </li>
          <li className=''>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
}
