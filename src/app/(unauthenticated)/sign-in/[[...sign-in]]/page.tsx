'use client';

import LoadingLogo from '@/components/loading-logo';
import { Button } from '@/components/ui/shadcn/button';
import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs';
import { Unauthenticated } from 'convex/react';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-4 pt-20'>
      <div className='flex h-full flex-col justify-center gap-2'>
        <ClerkLoading>
          <LoadingLogo />
        </ClerkLoading>
        <ClerkLoaded>
          <Unauthenticated>
            <Button
              variant={'link2'}
              size={'sm'}
              className='w-max text-xs'
              asChild
            >
              <Link href={'/'}>
                <ArrowLeftIcon className='size-3' />
                Back to home
              </Link>
            </Button>
            <div className='min-h-[450px] min-w-[400px]'>
              <SignIn />
            </div>
          </Unauthenticated>
        </ClerkLoaded>
      </div>
    </div>
  );
}
