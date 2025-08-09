import SidebarWrapper from '@/components/navigations/sidebar-wrapper';
import AuthenticatedProvider from '@/providers/AuthenticatedProviders';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = PropsWithChildren<{}>;

export default function AuthenticatedLayout({ children }: Props) {
  return (
    <AuthenticatedProvider>
      <SidebarWrapper>{children}</SidebarWrapper>
    </AuthenticatedProvider>
  );
}
