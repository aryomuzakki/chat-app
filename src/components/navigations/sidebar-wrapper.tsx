import DesktopNav from '@/components/navigations/desktop-nav';
import MobileNav from '@/components/navigations/mobile-nav';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = PropsWithChildren<{}>;

export default function SidebarWrapper({ children }: Props) {
  return (
    <div className='flex size-full flex-col gap-4 p-4 lg:flex-row'>
      <MobileNav />
      <DesktopNav />
      <main className='flex h-[calc(100%-80px)] w-full gap-4 lg:h-full'>{children}</main>
    </div>
  );
}
