'use client';

import { Badge } from '@/components/ui/shadcn/badge';
import { Button } from '@/components/ui/shadcn/button';
import { Card } from '@/components/ui/shadcn/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/shadcn/tooltip';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import useNavigation from '@/hooks/useNavigation';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function DesktopNav() {
  const paths = useNavigation();

  return (
    <Card className='hidden lg:flex lg:h-full lg:w-16 lg:flex-col lg:items-center lg:justify-between lg:px-2 lg:py-4'>
      <nav>
        <ul className='flex flex-col items-center gap-4'>
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
                      {path.count ? (
                        <Badge className='border-card absolute bottom-6 left-6 rounded-full px-2'>
                          {path.count}
                        </Badge>
                      ) : null}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='right'>
                    <p>{path.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='flex flex-col items-center gap-4'>
        <ThemeToggle />
        <UserButton />
      </div>
    </Card>
  );
}
