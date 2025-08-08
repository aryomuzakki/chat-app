import SidebarWrapper from '@/components/navigations/sidebar-wrapper';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = PropsWithChildren<{}>;
export default function AuthenticatedLayout({ children }: Props) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
