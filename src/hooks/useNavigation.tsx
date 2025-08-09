'use client';

import { api } from '@rootdir/convex/_generated/api';
import { useQuery } from 'convex/react';
import { MessagesSquareIcon, UsersIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function useNavigation() {
  const pathname = usePathname();

  const requestsCount = useQuery(api.requests.count);

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
        count: requestsCount,
      },
    ],
    [pathname, requestsCount],
  );

  return paths;
}
