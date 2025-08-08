'use client';

import LoadingLogo from '@/components/loading-logo';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { shadcn } from '@clerk/themes';
import { AuthLoading, ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ReactNode } from 'react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        theme: shadcn,
      }}
    >
      <ConvexProviderWithClerk
        client={convex}
        useAuth={useAuth}
      >
        <AuthLoading>
          <LoadingLogo />
        </AuthLoading>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
