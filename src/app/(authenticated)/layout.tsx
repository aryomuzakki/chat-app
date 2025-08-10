import LoadingLogo from '@/components/loading-logo';
import SidebarWrapper from '@/components/navigations/sidebar-wrapper';
import AuthenticatedProvider from '@/providers/AuthenticatedProviders';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = PropsWithChildren<{}>;

export default function AuthenticatedLayout({ children }: Props) {
  return (
    <>
      <ClerkLoading>
        <LoadingLogo />
      </ClerkLoading>
      <ClerkLoaded>
        <AuthenticatedProvider>
          <SidebarWrapper>{children}</SidebarWrapper>
        </AuthenticatedProvider>
      </ClerkLoaded>
    </>
  );
}
