import { Button } from '@/components/ui/shadcn/button';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import { SiGithub } from '@icons-pack/react-simple-icons';
import Image from 'next/image';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = PropsWithChildren<{}>;

export default function UnauthenticatedLayout({ children }: Props) {
  return (
    <div className='flex h-full flex-col gap-6'>
      <div className='pointer-events-none fixed flex w-full items-center justify-between gap-6 px-6 py-4 *:pointer-events-auto'>
        <div className='flex items-center gap-4'>
          <Image
            src='/images/logo.svg'
            alt='Chat App'
            width={36}
            height={36}
          />
          <h2 className='text-xl font-bold'>Chat App</h2>
        </div>
        <ThemeToggle />
      </div>
      <div className='flex-1'>{children}</div>
      <div className='pointer-events-none flex w-full items-center justify-between gap-6 px-6 py-4 *:pointer-events-auto'>
        <div className='flex w-full items-center justify-between gap-4'>
          <p className='text-muted-foreground text-sm'>Copyright &copy; 2025</p>
          <Button
            variant={'ghost'}
            size={'icon'}
            asChild
          >
            <Link
              href={'https://github.com/aryomuzakki/chat-app'}
              target='_blank'
            >
              <SiGithub />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
