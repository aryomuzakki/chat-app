'use client';

import { MessagesSquareIcon, UsersIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function useNavigation() {
  const pathname = usePathname();

  const paths = useMemo(
    () => [
      {
        name: 'Chats',
        href: '/chats',
        icon: <MessagesSquareIcon />,
        active: pathname.startsWith('/chats'),
      },
      {
        name: 'Friends',
        href: '/friends',
        icon: <UsersIcon />,
        active: pathname === '/friends',
      },
    ],
    [pathname],
  );

  return paths;
}
